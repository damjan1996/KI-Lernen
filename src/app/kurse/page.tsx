import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/data/courses";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";

export const metadata = {
  title: "Alle Kurse",
  description:
    "Entdecke unsere zertifizierten KI-Kurse. Von KI-Automatisierung bis Prompt Engineering - finde den perfekten Kurs für dich.",
};

export default function KursePage() {
  const availableCourses = courses.filter((c) => c.status === "available");
  const comingSoonCourses = courses.filter((c) => c.status === "coming-soon");

  return (
    <div className="flex flex-col pt-24">
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[var(--accent-gold)]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-[var(--accent-blue)]/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <FadeIn delay={0}>
              <Badge variant="secondary" className="mb-6">
                Zertifizierte Online-Kurse
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Wähle deinen{" "}
                <span className="text-[var(--accent-gold)]">KI-Skill</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-[var(--text-secondary)]">
                Unsere praxisnahen Kurse vermitteln dir gefragte KI-Fähigkeiten,
                mit denen du sofort durchstarten kannst. Alle Kurse beinhalten ein
                offizielles Zertifikat.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Available Courses */}
      {availableCourses.length > 0 && (
        <section className="py-12 bg-[var(--background-secondary)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8">Jetzt verfügbar</h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {availableCourses.map((course) => (
                <StaggerItem key={course.id}>
                  <ScaleOnHover>
                    <Card
                      className="overflow-hidden hover:border-[var(--accent-gold)] transition-colors group"
                    >
                      {/* Course Image */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-card)] via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge variant="new">{course.badge}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[var(--background-primary)]/80 backdrop-blur-sm">
                          <span className="text-xl font-bold text-[var(--accent-gold)]">
                            €{course.price}
                          </span>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl mb-2">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {course.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <Clock className="h-4 w-4" />
                            {course.metadata.duration}
                          </div>
                          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                            <CheckCircle className="h-4 w-4 text-[var(--success)]" />
                            {course.metadata.lessons} Lektionen
                          </div>
                        </div>
                        <ul className="space-y-2 mb-6">
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
                        <Button className="w-full" size="lg" asChild>
                          <Link href={`/kurse/${course.slug}`}>
                            Zum Kurs
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Coming Soon Courses */}
      {comingSoonCourses.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-8">Bald verfügbar</h2>
            </FadeIn>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonCourses.map((course) => (
                <StaggerItem key={course.id}>
                  <Card className="opacity-90 overflow-hidden group hover:border-[var(--accent-gold)]/30 transition-colors">
                    {/* Course Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale-[30%]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-card)] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="comingSoon">{course.badge}</Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {course.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                          >
                            <CheckCircle className="h-4 w-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant="secondary" disabled>
                        <Clock className="mr-2 h-4 w-4" />
                        Bald verfügbar
                      </Button>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="border-gradient p-8 md:p-12 text-center">
              <CardContent className="pt-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Kein Kurs verpassen
                </h2>
                <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
                  Trage dich in unseren Newsletter ein und erfahre als Erster,
                  wenn neue Kurse verfügbar sind.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Deine E-Mail-Adresse"
                    className="flex-1 px-4 py-3 rounded-lg bg-[var(--background-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)]"
                  />
                  <Button size="lg">Anmelden</Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
