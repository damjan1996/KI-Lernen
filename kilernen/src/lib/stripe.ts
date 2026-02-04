import Stripe from "stripe";

// Lazy singleton for Stripe instance
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeInstance) {
    return stripeInstance;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  stripeInstance = new Stripe(secretKey, {
    apiVersion: "2026-01-28.clover",
    typescript: true,
  });

  return stripeInstance;
}

export interface CourseProduct {
  courseId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
}

export function createCheckoutLineItem(course: CourseProduct): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    price_data: {
      currency: course.currency,
      product_data: {
        name: course.name,
        description: course.description,
      },
      unit_amount: course.price * 100, // Convert to cents
    },
    quantity: 1,
  };
}
