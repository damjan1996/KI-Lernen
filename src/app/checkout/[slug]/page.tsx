"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { FadeIn } from "@/components/ui/motion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CheckoutPage({ params }: PageProps) {
  const { slug } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h1 className="text-2xl font-bold mb-4">Kurs nicht gefunden</h1>
        <Button asChild>
          <Link href="/kurse">Zurück zu den Kursen</Link>
        </Button>
      </div>
    );
  }

  if (course.status !== "available" || !course.price) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h1 className="text-2xl font-bold mb-4">Kurs nicht verfügbar</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Dieser Kurs ist noch nicht zum Kauf verfügbar.
        </p>
        <Button asChild>
          <Link href="/kurse">Zurück zu den Kursen</Link>
        </Button>
      </div>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseSlug: course.slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout fehlgeschlagen");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background-primary)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/kurse/${course.slug}`}
          className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück zum Kurs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <FadeIn delay={0}>
          <div>
            <h1 className="text-3xl font-bold mb-6">Bestellung abschließen</h1>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4">Deine Bestellung</h2>
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-[var(--border-default)]">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {course.metadata.lessons} Lektionen · {course.metadata.duration}
                    </p>
                  </div>
                  <span className="text-xl font-bold">€{course.price}</span>
                </div>

                <ul className="space-y-2 mb-4">
                  {course.features.slice(0, 5).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle className="h-4 w-4 text-[var(--success)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center pt-4 border-t border-[var(--border-default)]">
                  <span className="font-semibold">Gesamtbetrag</span>
                  <span className="text-2xl font-bold text-[var(--accent-gold)]">
                    €{course.price}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--background-tertiary)]">
                <Lock className="h-5 w-5 text-[var(--accent-gold)]" />
                <span className="text-sm">SSL-verschlüsselt</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--background-tertiary)]">
                <ShieldCheck className="h-5 w-5 text-[var(--accent-gold)]" />
                <span className="text-sm">14-Tage Garantie</span>
              </div>
            </div>
          </div>
          </FadeIn>

          {/* Payment Section */}
          <FadeIn delay={0.2} direction="left">
          <div>
            <Card className="border-gradient">
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-6">Sichere Zahlung mit Stripe</h2>

                <div className="mb-6 p-4 rounded-lg bg-[var(--background-tertiary)] text-center">
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Du wirst zu Stripe weitergeleitet, um die Zahlung sicher abzuschließen.
                  </p>
                  <div className="flex justify-center gap-3 mt-4 text-xs text-[var(--text-muted)]">
                    <span className="px-3 py-1 bg-[var(--background-secondary)] rounded">Visa</span>
                    <span className="px-3 py-1 bg-[var(--background-secondary)] rounded">Mastercard</span>
                    <span className="px-3 py-1 bg-[var(--background-secondary)] rounded">SEPA</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Wird geladen...
                    </span>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Jetzt für €{course.price} kaufen
                    </>
                  )}
                </Button>

                <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                  Mit dem Kauf akzeptierst du unsere{" "}
                  <Link href="/agb" className="underline hover:text-[var(--text-secondary)]">
                    AGB
                  </Link>{" "}
                  und{" "}
                  <Link href="/datenschutz" className="underline hover:text-[var(--text-secondary)]">
                    Datenschutzbestimmungen
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
