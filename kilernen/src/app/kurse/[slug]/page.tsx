import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  PlayCircle,
  Users,
  RefreshCw,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses, getCourseBySlug } from "@/data/courses";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Kurs nicht gefunden",
    };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const isAvailable = course.status === "available";

  return (
    <div className="flex flex-col pt-16">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background-primary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <Badge
                variant={isAvailable ? "new" : "comingSoon"}
                className="mb-6"
              >
                {course.badge}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-6">
                {course.subtitle}
              </p>
              <p className="text-[var(--text-secondary)] mb-8">
                {course.description}
              </p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-5 w-5 text-[var(--accent-gold)]" />
                  <span>{course.metadata.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <PlayCircle className="h-5 w-5 text-[var(--accent-gold)]" />
                  <span>{course.metadata.lessons} Lektionen</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-5 w-5 text-[var(--accent-gold)]" />
                  <span>Zertifikat</span>
                </div>
              </div>

              {/* CTA */}
              {isAvailable ? (
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <Button size="lg" asChild>
                    <Link href={`/checkout/${course.slug}`}>
                      Jetzt für €{course.price} kaufen
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <p className="text-sm text-[var(--text-muted)]">
                    14-Tage Geld-zurück-Garantie
                  </p>
                </div>
              ) : (
                <Button size="lg" variant="secondary" disabled>
                  <Clock className="mr-2 h-5 w-5" />
                  Bald verfügbar
                </Button>
              )}
            </div>

            {/* Price Card */}
            <div className="lg:justify-self-end">
              <Card className="border-gradient p-6 max-w-md">
                <CardContent className="pt-0">
                  {isAvailable && course.price && (
                    <div className="text-center mb-6">
                      <span className="text-5xl font-bold text-[var(--accent-gold)]">
                        €{course.price}
                      </span>
                      <span className="text-[var(--text-muted)] block mt-1">
                        Einmalzahlung
                      </span>
                    </div>
                  )}
                  <ul className="space-y-3">
                    {course.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[var(--success)] flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {isAvailable && (
                    <Button className="w-full mt-6" size="lg" asChild>
                      <Link href={`/checkout/${course.slug}`}>
                        Jetzt starten
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Über diesen Kurs</h2>
            <div className="prose prose-invert prose-lg">
              {course.longDescription.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-[var(--text-secondary)] mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      {course.modules.length > 0 && course.modules[0].title !== "Coming Soon" && (
        <section className="py-16 bg-[var(--background-secondary)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Kursinhalt</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.modules.map((module, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] text-sm font-bold">
                        {index + 1}
                      </span>
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li
                          key={lessonIndex}
                          className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <PlayCircle className="h-4 w-4 text-[var(--text-muted)]" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Das bekommst du
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Lebenslanger Zugang</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Einmal kaufen, für immer lernen
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-4">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Kostenlose Updates</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Immer die neuesten Inhalte
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Community-Zugang</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Austausch mit Gleichgesinnten
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--accent-gold)]/10 text-[var(--accent-gold)] mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Geld-zurück-Garantie</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  14 Tage risikolos testen
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {course.testimonials.length > 0 && (
        <section className="py-16 bg-[var(--background-secondary)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Das sagen unsere Teilnehmer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {course.testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-0">
                    <p className="text-[var(--text-secondary)] mb-4 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)]/20 flex items-center justify-center text-[var(--accent-gold)] font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {course.faqs.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Häufig gestellte Fragen
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {course.faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-secondary)]">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      {isAvailable && (
        <section className="py-16 bg-[var(--background-secondary)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="border-gradient p-8 md:p-12 text-center">
              <CardContent className="pt-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bereit durchzustarten?
                </h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
                  Sichere dir jetzt deinen Zugang zur {course.title} und starte
                  noch heute mit dem Lernen.
                </p>
                <Button size="lg" asChild>
                  <Link href={`/checkout/${course.slug}`}>
                    Jetzt für €{course.price} kaufen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="text-sm text-[var(--text-muted)] mt-4">
                  14-Tage Geld-zurück-Garantie · Lebenslanger Zugang ·
                  Zertifikat inklusive
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
