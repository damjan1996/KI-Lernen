import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  MessageSquare,
  Users,
  Zap,
  Building2,
  Rocket,
  Crown,
  Star,
  Clock,
  Video,
  FileText,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";

export const metadata = {
  title: "KI-Beratung - Everlast Consulting",
  description:
    "Individuelle KI-Beratung für dein Unternehmen. Von Voice Agents bis zur kompletten KI-Transformation - wir begleiten dich auf dem Weg.",
};

const voiceAgentProducts = [
  {
    name: "Voice Agent Starter",
    description: "Perfekt für den Einstieg in KI-Telefonassistenten",
    duration: "6 Monate",
    features: [
      "Technisches Onboarding (1zu1, 15min)",
      "On-Demand Content- & Resource Hub",
      "Vorlagen und Best Practices",
      "Chat-Support via Slack",
      "Bis zu 3 Gruppen-Calls pro Woche",
      "Prompt Engineering Unterstützung",
      "Integration in bestehende Systeme",
      "DSGVO-konformes Setup",
    ],
    highlight: false,
  },
  {
    name: "Voice Agent Pro",
    description: "Für Unternehmen, die mehr Support benötigen",
    duration: "6 Monate",
    features: [
      "Strategisches Onboarding (1zu1, 60min)",
      "On-Demand Content- & Resource Hub",
      "Premium Support (Private Chatgruppe)",
      "Monatlicher Jour Fixe Call (60min)",
      "Bis zu 3 Gruppen-Calls pro Woche",
      "Individuelle Roadmap",
      "Custom Functions & Workflows",
      "API-Schnittstellen Einrichtung",
    ],
    highlight: true,
  },
  {
    name: "Voice Agent Master",
    description: "Die komplette Voice Agent Lösung für Teams",
    duration: "6 Monate",
    features: [
      "Alles aus Voice Agent Pro",
      "Zugang für bis zu 4 weitere Mitarbeiter",
      "Premium Support mit Beratern",
      "Monatlicher Jour Fixe Call",
      "Dialogstruktur-Optimierung",
      "Troubleshooting Support",
      "Best Practices Framework",
      "Langfristige Pflege & Wartung",
    ],
    highlight: false,
  },
];

const agencyProducts = [
  {
    name: "KI-Agentur Starter",
    description: "Agenturaufbau, Marketing & KI-Implementierung",
    duration: "6 Monate",
    features: [
      "Strategisches 1zu1 Onboarding",
      "Chat-Support via Slack",
      "On-Demand Content Hub",
      "Bonus: AI Automations Hub",
      "Bis zu 10 Live-Calls pro Woche",
      "Positionierung & Angebotsgestaltung",
      "Marketing & Leadgenerierung",
      "Verkaufsstrategien",
    ],
  },
  {
    name: "KI-Agentur Kickstart Pro",
    description: "Mit persönlichem Account Manager",
    duration: "6 Monate",
    features: [
      "Strategisches 1zu1 Onboarding",
      "Jour Fixe alle 2 Wochen (30min)",
      "Premium Support (Private Gruppe)",
      "Bis zu 10 Live-Calls pro Woche",
      "KI-Prozesse & Voice Agents",
      "Make.com & n8n Workflows",
      "API-Schnittstellen Setup",
      "DSGVO-konformes Setup",
    ],
  },
  {
    name: "KI-Agentur Master",
    description: "Maximale Unterstützung für dein Wachstum",
    duration: "6 Monate",
    features: [
      "Alles aus Kickstart Pro",
      "Bis zu 15 Live-Calls pro Woche",
      "Erweiterte KI-Prozessberatung",
      "Voice Agent Integration",
      "CRM & System-Integration",
      "Skalierungsstrategien",
      "Content-Gestaltung Feedback",
      "Marktanalyse Support",
    ],
  },
  {
    name: "ScaleUp Mastery",
    description: "1zu1 Beratung mit Co-Foundern",
    duration: "6 Monate",
    features: [
      "Kickoff mit leitendem Berater (90min)",
      "6x 1zu1 Beratung mit Co-Founder",
      "Jour Fixe alle 2 Wochen",
      "Premium Support",
      "Bis zu 15 Live-Calls pro Woche",
      "Engpasskonzentriertes Arbeiten",
      "Individuelle Strategieentwicklung",
      "Direkter Zugang zu Entscheidern",
    ],
  },
];

const enterpriseProducts = [
  {
    name: "KI-Audit",
    icon: FileText,
    description: "90-minütiges KI-Audit zur Analyse deiner Potenziale",
    features: [
      "Use Case Bewertung & Umsetzbarkeit",
      "Quick-Win Identifikation",
      "IT-Infrastruktur Evaluation",
      "Everlast AI Readiness Score",
      "Impact-Effort-Matrix",
      "Präsentations-Call mit Ergebnissen",
      "Dokumentation als Entscheidungsgrundlage",
    ],
    highlight: true,
  },
  {
    name: "KI-Pionier Beratung",
    icon: Rocket,
    description: "6-monatige Beratung für KI-Automatisierungen",
    features: [
      "KI-Audit zum Start (90min)",
      "1zu1 Beratung alle 2 Wochen (60min)",
      "Bis zu 3 Gruppen-Calls pro Woche",
      "Zugang für 3 weitere Mitarbeiter",
      "E-Learning Plattform Bonus",
      "Premium Slack Support",
      "Workflow-Automatisierung",
      "CRM & Tool Integration",
    ],
    highlight: false,
  },
  {
    name: "KI-Champion Beratung & Service",
    icon: Crown,
    description: "Beratung + Implementierung durch unsere Entwickler",
    features: [
      "KI-Audit zum Start (90min)",
      "1-2 Fokusprojekte umgesetzt",
      "1zu1 Beratung alle 2 Wochen",
      "Zugang für 3 weitere Mitarbeiter",
      "E-Learning Plattform Bonus",
      "Premium Slack Support",
      "Dauerhafter Zugang zu Lösungen",
      "Weiterführende Module nach Bedarf",
    ],
    highlight: true,
  },
  {
    name: "KI-Exzellenz Beratung & Service",
    icon: Star,
    description: "12-monatige Premium-Begleitung",
    features: [
      "KI-Audit zum Start (90min)",
      "3-4 Fokusprojekte umgesetzt",
      "1zu1 Beratung alle 2 Wochen (60min)",
      "Zugang für 6 weitere Mitarbeiter",
      "E-Learning Plattform Bonus",
      "Premium Slack Support",
      "Strategischer IT-Partner",
      "Komplette KI-Transformation",
    ],
    highlight: false,
  },
];

const modules = [
  "Setup digitales Datenmanagement & Teamverwaltung",
  "Setup Paperless-Unternehmen",
  "Setup Private GPT (DSGVO-konform)",
  "Setup interne Chatbots und KI-Agenten",
  "Setup KI-Telefonassistenten",
  "Setup digitale Schulungsplattform",
  "Setup KI-Assistenten (CustomGPTs)",
  "Setup automatisiertes Reporting",
  "Setup digitale Terminverwaltung",
  "Setup KI im Kundensupport",
  "Setup automatisierter Onboarding-Prozess",
  "Setup digitales Bewerbermanagement",
];

export default function BeratungPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-[var(--accent-gold)]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/3 -right-32 w-72 h-72 rounded-full bg-[var(--accent-blue)]/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <FadeIn delay={0}>
                <Badge variant="secondary" className="mb-6">
                  Individuelle KI-Beratung
                </Badge>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Transformiere dein Unternehmen{" "}
                  <span className="text-gradient">mit KI</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mb-10">
                  Von Voice Agents über Prozessautomatisierung bis zur kompletten KI-Transformation -
                  wir begleiten dich auf dem gesamten Weg.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" asChild>
                    <a href="#audit">
                      Kostenloses Erstgespräch
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#enterprise">Alle Angebote</a>
                  </Button>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.3} direction="left">
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/consultation.jpg"
                    alt="KI-Beratung"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-[var(--background-primary)] shadow-xl hidden lg:block">
                  <Image
                    src="/images/analytics_dashboard.jpg"
                    alt="Analytics Dashboard"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Service Images */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <ScaleOnHover>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden group">
                  <Image
                    src="/images/course_voice_agents.jpg"
                    alt="Voice Agents"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Voice Agents</p>
                    <p className="text-white/80 text-sm">KI-Telefonassistenten</p>
                  </div>
                </div>
              </ScaleOnHover>
            </StaggerItem>
            <StaggerItem>
              <ScaleOnHover>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden group">
                  <Image
                    src="/images/course_ki_automatisierung.jpg"
                    alt="Automatisierung"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Automatisierung</p>
                    <p className="text-white/80 text-sm">Prozesse optimieren</p>
                  </div>
                </div>
              </ScaleOnHover>
            </StaggerItem>
            <StaggerItem>
              <ScaleOnHover>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden group">
                  <Image
                    src="/images/server_room.jpg"
                    alt="Enterprise KI"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Enterprise KI</p>
                    <p className="text-white/80 text-sm">Skalierbare Lösungen</p>
                  </div>
                </div>
              </ScaleOnHover>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Voice Agent Section */}
      <section className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-gold)]/20 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[var(--accent-gold)]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                KI-Beratung Voice Agent
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Implementiere intelligente KI-Telefonassistenten für deinen Kundenservice und Vertrieb.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {voiceAgentProducts.map((product) => (
              <StaggerItem key={product.name}>
                <ScaleOnHover>
                  <Card
                    className={`relative overflow-hidden h-full ${
                      product.highlight ? "border-[var(--accent-gold)] ring-1 ring-[var(--accent-gold)]" : ""
                    }`}
                  >
                    {product.highlight && (
                      <div className="absolute top-0 left-0 right-0 bg-[var(--accent-gold)] text-[var(--background-primary)] text-center text-sm font-medium py-1">
                        Beliebteste Wahl
                      </div>
                    )}
                    <CardHeader className={product.highlight ? "pt-10" : ""}>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {product.duration}
                      </Badge>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle className="h-4 w-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={product.highlight ? "default" : "secondary"}>
                        Anfrage stellen
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Agency Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-blue)]/20 flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-[var(--accent-blue)]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                KI-Agentur Programme
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Baue deine eigene KI-Agentur auf oder skaliere dein bestehendes Geschäft mit unserer Unterstützung.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agencyProducts.map((product) => (
              <StaggerItem key={product.name}>
                <ScaleOnHover>
                  <Card className="overflow-hidden h-full">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {product.duration}
                      </Badge>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 6).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                            <CheckCircle className="h-3 w-3 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant="secondary" size="sm">
                        Mehr erfahren
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--accent-gold)]/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-[var(--accent-gold)]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                KI-Beratung für Unternehmen
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Von der Potenzialanalyse bis zur kompletten KI-Implementierung - wir begleiten dich.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enterpriseProducts.map((product) => (
              <StaggerItem key={product.name}>
                <ScaleOnHover>
                  <Card
                    className={`overflow-hidden h-full ${
                      product.highlight ? "border-[var(--accent-gold)]" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center">
                          <product.icon className="w-6 h-6 text-[var(--accent-gold)]" />
                        </div>
                        {product.highlight && (
                          <Badge variant="new">Empfohlen</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mt-4">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <CheckCircle className="h-4 w-4 text-[var(--success)] flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={product.highlight ? "default" : "secondary"}>
                        Beratung anfragen
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mögliche Implementierungsmodule
              </h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Je nach Bedarf können wir diese und weitere Module für dich umsetzen.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {modules.map((module) => (
              <StaggerItem key={module}>
                <div
                  className="flex items-center gap-3 p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-default)] transition-colors hover:bg-[var(--background-tertiary)] hover:border-[var(--accent-gold)]/20"
                >
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)]">{module}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Audit CTA */}
      <section id="audit" className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="border-gradient p-8 md:p-12">
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge variant="new" className="mb-4">Kostenlos</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Starte mit einem KI-Audit
                    </h2>
                    <p className="text-[var(--text-secondary)] text-lg mb-6">
                      In einem 90-minütigen Gespräch analysieren wir deine aktuellen Prozesse,
                      identifizieren KI-Potenziale und erstellen eine individuelle Roadmap für dein Unternehmen.
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Analyse deiner bestehenden Prozesse",
                        "Identifikation von Quick-Wins",
                        "Bewertung der technischen Umsetzbarkeit",
                        "Konkrete Handlungsempfehlungen",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-[var(--text-secondary)]">
                          <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button size="lg">
                      Termin vereinbaren
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center hover-lift">
                      <Video className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-3" />
                      <p className="font-medium">Video-Call</p>
                      <p className="text-sm text-[var(--text-muted)]">90 Minuten</p>
                    </div>
                    <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center hover-lift">
                      <Users className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-3" />
                      <p className="font-medium">Senior Berater</p>
                      <p className="text-sm text-[var(--text-muted)]">Top-Experten</p>
                    </div>
                    <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center hover-lift">
                      <FileText className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-3" />
                      <p className="font-medium">Dokumentation</p>
                      <p className="text-sm text-[var(--text-muted)]">Alle Ergebnisse</p>
                    </div>
                    <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center hover-lift">
                      <Headphones className="w-8 h-8 text-[var(--accent-gold)] mx-auto mb-3" />
                      <p className="font-medium">Follow-up</p>
                      <p className="text-sm text-[var(--text-muted)]">Präsentation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                Lass uns gemeinsam herausfinden, welches Angebot am besten zu deinen Zielen passt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/ueber-uns">
                    Über uns erfahren
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/kurse">Kurse ansehen</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
