"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, BookOpen, Zap, CheckCircle, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleOnHover,
} from "@/components/ui/motion";

// Stats data
const stats = [
  { value: "500+", label: "Kursteilnehmer", sublabel: "und wachsend" },
  { value: "95%", label: "Abschlussrate", sublabel: "unserer Kurse" },
  { value: "24/7", label: "Zugang", sublabel: "zu allen Inhalten" },
];

// Features
const features = [
  {
    icon: BookOpen,
    title: "Umfassende Kursinhalte",
    description:
      "Unsere Kurse decken alles ab, was du brauchst - von den Grundlagen bis zu fortgeschrittenen Techniken. Kein Vorwissen nötig.",
  },
  {
    icon: Zap,
    title: "Praxisnahes Wissen",
    description:
      "Alle Inhalte kommen direkt aus der Praxis. Du lernst Techniken, die wir täglich bei echten Projekten einsetzen.",
  },
  {
    icon: Award,
    title: "Zertifizierte Abschlüsse",
    description:
      "Nach erfolgreichem Abschluss erhältst du ein offizielles Zertifikat, das deine neu erworbenen Fähigkeiten bestätigt.",
  },
];

// Courses
const courses = [
  {
    id: "ki-automatisierung",
    title: "KI-Automatisierung Masterclass",
    description:
      "Lerne, wie du mit n8n, Make und Claude AI repetitive Aufgaben automatisierst und Unternehmen transformierst.",
    price: 997,
    status: "available",
    badge: "JETZT VERFÜGBAR",
    image: "/images/course_ki_automatisierung.jpg",
    features: [
      "30+ Video-Lektionen",
      "Praxis-Projekte",
      "Vorlagen & Templates",
      "Community-Zugang",
      "Offizielles Zertifikat",
    ],
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Pro",
    description:
      "Meistere die Kunst des Prompt Engineerings und hole das Maximum aus KI-Modellen wie ChatGPT und Claude heraus.",
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_prompt_engineering.jpg",
    features: [
      "Fortgeschrittene Techniken",
      "System Prompts",
      "Chain-of-Thought",
      "Praxis-Beispiele",
    ],
  },
  {
    id: "voice-agents",
    title: "Voice Agent Development",
    description:
      "Entwickle intelligente Sprach-Agenten mit modernsten KI-Technologien für Kundenservice und Automatisierung.",
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_voice_agents.jpg",
    features: [
      "Realtime Voice AI",
      "Integration Guide",
      "Best Practices",
      "Live-Demos",
    ],
  },
  {
    id: "rag-llm",
    title: "RAG & LLM Implementierung",
    description:
      "Baue leistungsstarke RAG-Systeme und lerne, wie du LLMs in Unternehmensanwendungen integrierst.",
    status: "coming-soon",
    badge: "BALD VERFÜGBAR",
    image: "/images/course_rag_llm.jpg",
    features: [
      "Vector Databases",
      "LangChain",
      "Enterprise RAG",
      "Deployment",
    ],
  },
];

// FAQ
const faqs = [
  {
    question: "Für wen sind die Kurse geeignet?",
    answer:
      "Unsere Kurse sind sowohl für Anfänger als auch für Fortgeschrittene geeignet. Du brauchst kein Vorwissen - wir führen dich Schritt für Schritt durch alle Inhalte.",
  },
  {
    question: "Wie lange habe ich Zugang zu den Kursen?",
    answer:
      "Nach dem Kauf hast du unbegrenzten Zugang zu allen Kursinhalten. Du kannst in deinem eigenen Tempo lernen und jederzeit auf die Materialien zugreifen.",
  },
  {
    question: "Erhalte ich ein Zertifikat?",
    answer:
      "Ja! Nach erfolgreichem Abschluss eines Kurses erhältst du ein offizielles Zertifikat von KI Lernen, das du in deinem Lebenslauf oder LinkedIn-Profil verwenden kannst.",
  },
  {
    question: "Gibt es eine Geld-zurück-Garantie?",
    answer:
      "Ja, wir bieten eine 14-tägige Geld-zurück-Garantie. Wenn du nicht zufrieden bist, erstatten wir dir den vollen Kaufpreis - ohne Fragen.",
  },
  {
    question: "Wann erscheinen weitere Kurse?",
    answer:
      "Wir arbeiten kontinuierlich an neuen Kursen. Trage dich in unseren Newsletter ein, um als Erster informiert zu werden, wenn neue Kurse verfügbar sind.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent-gold)]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--accent-blue)]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <FadeIn delay={0}>
                <Badge variant="secondary" className="mb-6">
                  Die #1 KI-Lernplattform
                </Badge>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Deine{" "}
                  <span className="text-gradient">#1 Lernplattform</span>
                  <br />
                  für KI-Skills der Zukunft
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto lg:mx-0 mb-10">
                  Erlerne durch unsere zertifizierten Online-Kurse gefragte KI-Skills,
                  mit denen du dich langfristig erfolgreich selbstständig machen kannst.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <Link href="/kurse">
                      Kurse entdecken
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="#kurse">Mehr erfahren</Link>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right: Hero Image */}
            <FadeIn delay={0.4} direction="left">
              <div className="relative">
                {/* Image Container with Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-gold)]/20 to-[var(--accent-blue)]/20 rounded-2xl blur-xl opacity-50" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-2xl">
                  <Image
                    src="/images/leonard_tech_office.jpg"
                    alt="Leonard im Tech Office - KI Experte"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)]/60 via-transparent to-transparent" />

                  {/* Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm text-[var(--text-secondary)]">Dein Experte</p>
                    <p className="text-lg font-semibold text-[var(--text-primary)]">Leonard - KI & Automatisierung</p>
                  </div>
                </div>

                {/* Floating Stats Badge */}
                <div className="absolute -bottom-6 -right-6 px-4 py-3 rounded-xl bg-[var(--background-card)] border border-[var(--border-default)] shadow-xl hidden sm:flex">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">500+ Teilnehmer</p>
                      <p className="text-xs text-[var(--text-muted)]">haben bereits gestartet</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[var(--accent-gold)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-medium text-[var(--text-primary)]">
                  {stat.label}
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  {stat.sublabel}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Das zeichnet <span className="text-[var(--accent-gold)]">KI Lernen</span> aus
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Wir bieten dir das Wissen und die Werkzeuge, um in der KI-Revolution
              erfolgreich zu sein.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <ScaleOnHover>
                  <Card className="text-center p-8 h-full group hover:border-[var(--accent-gold)]/30 transition-all duration-500">
                    <CardContent className="pt-6">
                      {/* Feature Image Placeholder */}
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background-secondary)]">
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(135deg, var(--accent-gold) 25%, transparent 25%), linear-gradient(225deg, var(--accent-gold) 25%, transparent 25%)`,
                            backgroundSize: '20px 20px',
                            opacity: 0.1
                          }} />
                        </div>
                        {/* Icon Centered */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-2xl bg-[var(--accent-gold)]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--accent-gold)]/20 transition-all duration-500">
                            <feature.icon className="h-10 w-10 text-[var(--accent-gold)]" />
                          </div>
                        </div>
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-card)] via-transparent to-transparent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-[var(--accent-gold)] transition-colors duration-300">{feature.title}</h3>
                      <p className="text-[var(--text-secondary)]">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Expert Section */}
      <section className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Dein Experte
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lerne von einem <span className="text-[var(--accent-gold)]">Praktiker</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Mit jahrelanger Erfahrung in KI-Implementierung und Automatisierung
              bringe ich dir praxiserprobtes Wissen bei.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image Grid */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {/* Main Portrait */}
                <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--border-default)] shadow-xl">
                  <Image
                    src="/images/leonard_keynote_speaker.jpg"
                    alt="Leonard als Keynote Speaker"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm font-medium text-[var(--accent-gold)]">Keynote Speaker</p>
                    <p className="text-white font-semibold">The Future of AI</p>
                  </div>
                </div>

                {/* Secondary Images */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--border-default)] shadow-lg">
                  <Image
                    src="/images/leonard_business_portrait.jpg"
                    alt="Leonard Business Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[var(--border-default)] shadow-lg">
                  <Image
                    src="/images/leonard_casual_professional.jpg"
                    alt="Leonard Casual Professional"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Right: Content */}
            <FadeIn delay={0.4} direction="left">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Hi, ich bin Leonard
                </h3>
                <p className="text-[var(--text-secondary)] text-lg">
                  Als KI-Spezialist und Automatisierungsexperte habe ich in den letzten Jahren
                  zahlreiche Unternehmen dabei unterstützt, ihre Prozesse mit künstlicher
                  Intelligenz zu transformieren.
                </p>
                <p className="text-[var(--text-secondary)]">
                  Meine Kurse basieren auf echten Projekterfahrungen - keine trockene Theorie,
                  sondern praxiserprobte Methoden, die du sofort anwenden kannst.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="text-center p-4 rounded-xl bg-[var(--background-tertiary)]">
                    <Users className="w-6 h-6 text-[var(--accent-gold)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--accent-gold)]">500+</div>
                    <div className="text-xs text-[var(--text-muted)]">Kursteilnehmer</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[var(--background-tertiary)]">
                    <Award className="w-6 h-6 text-[var(--accent-gold)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--accent-gold)]">50+</div>
                    <div className="text-xs text-[var(--text-muted)]">Projekte</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-[var(--background-tertiary)]">
                    <Star className="w-6 h-6 text-[var(--accent-gold)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--accent-gold)]">5.0</div>
                    <div className="text-xs text-[var(--text-muted)]">Bewertung</div>
                  </div>
                </div>

                <Button size="lg" asChild>
                  <Link href="/kurse">
                    Meine Kurse entdecken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="kurse" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Wähle einen Skill, den du meistern möchtest
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Unsere Kurse vermitteln dir praxisnahes Wissen, mit dem du sofort
              durchstarten kannst.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <StaggerItem key={course.id}>
                <ScaleOnHover>
                  <Card
                    className={`relative overflow-hidden h-full group hover:border-[var(--accent-gold)]/30 transition-all duration-500 ${
                      course.status === "coming-soon" ? "opacity-80" : ""
                    }`}
                  >
                    {/* Course Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-card)] via-transparent to-transparent transition-transform duration-500 group-hover:scale-105" />

                      {/* Badge positioned on image */}
                      <div className="absolute top-4 left-4">
                        <Badge variant={course.status === "available" ? "new" : "comingSoon"}>
                          {course.badge}
                        </Badge>
                      </div>

                      {/* Price on image */}
                      {course.price && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[var(--background-primary)]/80 backdrop-blur-sm">
                          <span className="text-xl font-bold text-[var(--accent-gold)]">
                            €{course.price}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pt-4">
                      <CardTitle className="text-xl group-hover:text-[var(--accent-gold)] transition-colors duration-300">{course.title}</CardTitle>
                      <CardDescription className="text-base">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {course.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                          >
                            <CheckCircle className="h-4 w-4 text-[var(--success)]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {course.status === "available" ? (
                        <Button className="w-full group-hover:shadow-lg group-hover:shadow-[var(--accent-gold)]/20 transition-shadow duration-300" asChild>
                          <Link href={`/kurse/${course.id}`}>
                            Jetzt starten
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Button className="w-full" variant="secondary" disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          Bald verfügbar
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="border-gradient p-8 md:p-12 text-center">
              <CardContent className="pt-0">
                <Badge variant="default" className="mb-6">
                  Starte jetzt
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Bereit, KI zu meistern?
                </h2>
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
                  Werde Teil unserer wachsenden Community von KI-Enthusiasten und
                  sichere dir Zugang zu exklusiven Kursinhalten.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/kurse/ki-automatisierung">
                      Zum Kurs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#faq">Häufige Fragen</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Alles, was du über unsere Kurse wissen musst.
            </p>
          </FadeIn>

          <StaggerContainer className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-[var(--text-secondary)]">{faq.answer}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
