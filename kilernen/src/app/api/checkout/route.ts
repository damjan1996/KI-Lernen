import { NextRequest, NextResponse } from "next/server";
import { getStripe, createCheckoutLineItem } from "@/lib/stripe";
import { getCourseBySlug } from "@/data/courses";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug } = body;

    if (!courseSlug) {
      return NextResponse.json(
        { error: "Course slug is required" },
        { status: 400 }
      );
    }

    const course = getCourseBySlug(courseSlug);

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    if (course.status !== "available" || !course.price) {
      return NextResponse.json(
        { error: "Course is not available for purchase" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        createCheckoutLineItem({
          courseId: course.id,
          name: course.title,
          description: course.description,
          price: course.price,
          currency: "eur",
        }),
      ],
      success_url: `${appUrl}/checkout/erfolg?session_id={CHECKOUT_SESSION_ID}&course=${courseSlug}`,
      cancel_url: `${appUrl}/checkout/${courseSlug}`,
      metadata: {
        courseId: course.id,
        courseSlug: course.slug,
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
