import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Zahlung erfolgreich",
  description: "Dein Kauf war erfolgreich. Du kannst jetzt mit dem Lernen beginnen.",
};

interface PageProps {
  searchParams: Promise<{ session_id?: string; course?: string }>;
}

export default async function ErfolgPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const courseSlug = params.course;

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background-primary)]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--success)]/20 text-[var(--success)] mb-8">
          <CheckCircle className="h-10 w-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Zahlung erfolgreich!
        </h1>

        <p className="text-lg text-[var(--text-secondary)] mb-8">
          Vielen Dank für deinen Kauf. Du hast jetzt Zugang zu deinem Kurs.
        </p>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-6">Nächste Schritte</h2>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex-shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Bestätigungsmail</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Du erhältst in Kürze eine E-Mail mit deiner Kaufbestätigung und
                    Zugangsdaten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] flex-shrink-0">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Kurs starten</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Melde dich an und beginne sofort mit dem Lernen. Dein Kurs
                    wartet auf dich!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/login">
              Zum Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {courseSlug && (
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/kurse/${courseSlug}`}>Kursdetails ansehen</Link>
            </Button>
          )}
        </div>

        <p className="text-sm text-[var(--text-muted)] mt-8">
          Bei Fragen erreichst du uns jederzeit über{" "}
          <a
            href="https://wa.me/491234567890"
            className="text-[var(--accent-gold)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>{" "}
          oder per E-Mail an{" "}
          <a
            href="mailto:support@kilernen.de"
            className="text-[var(--accent-gold)] hover:underline"
          >
            support@kilernen.de
          </a>
          .
        </p>
      </div>
    </div>
  );
}
