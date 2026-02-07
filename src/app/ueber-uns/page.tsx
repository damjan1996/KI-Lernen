import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Shield,
  Leaf,
  Award,
  Building2,
  Calendar,
  MapPin,
  Youtube,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/ui/motion";

export const metadata = {
  title: "Über uns - Everlast Consulting",
  description:
    "Lerne das Team hinter KI Lernen kennen. Everlast Consulting - Dein Partner für KI-Transformation im deutschen Mittelstand.",
};

const values = [
  {
    icon: Lightbulb,
    title: "Transparenz",
    description: "Wir sagen ehrlich, was KI kann und was nicht. Keine leeren Versprechen, sondern realistische Einschätzungen.",
  },
  {
    icon: Target,
    title: "Praxisorientierung",
    description: "Für uns steht der konkrete Nutzen im Vordergrund. Keine theoretischen Konzepte, sondern echte Ergebnisse.",
  },
  {
    icon: Sparkles,
    title: "Leadership",
    description: "Das KI-Feld verändert sich rasant. Wir sind immer am Puls der Zeit und gehen als Pioniere voran.",
  },
  {
    icon: Award,
    title: "Qualität vor Quantität",
    description: "Statt viele Projekte auf Masse abzufertigen, legen wir größten Wert auf hervorragende Ergebnisse.",
  },
  {
    icon: Shield,
    title: "Datenschutz & Sicherheit",
    description: "Wir legen allergrößten Wert auf Datenschutz, Compliance und die strikte Einhaltung aller DSGVO-Standards.",
  },
  {
    icon: Leaf,
    title: "Nachhaltigkeit",
    description: "Wir gestalten KI-Lösungen so, dass sie langlebig und ressourcenschonend sind.",
  },
];

const stats = [
  { value: "2020", label: "Gegründet" },
  { value: "30+", label: "Mitarbeiter" },
  { value: "500+", label: "Kursteilnehmer" },
  { value: "#1", label: "KI-YouTube DACH" },
];

const founders = [
  {
    name: "Leonard Schmedding",
    role: "Co-Founder & KI-Experte",
    description: "Einer der führenden deutschen KI-Köpfe und bekanntesten Experten im deutschsprachigen Raum. Bekannt durch den YouTube-Kanal 'Everlast AI', Keynote Speaker und renommierter Fachautor.",
    image: "/images/leonard_keynote_speaker.jpg",
  },
  {
    name: "Marvin Schienbein",
    role: "Co-Founder",
    description: "Mitgründer von Everlast Consulting und treibende Kraft hinter der strategischen Ausrichtung des Unternehmens.",
    image: "/images/leonard_business_portrait.jpg",
  },
];

export default function UeberUnsPage() {
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-72 h-72 rounded-full bg-[var(--accent-gold)]/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full bg-[var(--accent-blue)]/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0}>
              <Badge variant="secondary" className="mb-6">
                Everlast Consulting GmbH
              </Badge>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Die Speerspitze der{" "}
                <span className="text-gradient">deutschen KI-Bewegung</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10">
                Wir machen KI für den deutschen und europäischen Mittelstand zugänglich.
                Unser Ziel: Die Komplexität der Technologie so minimieren, dass sie für jeden einsetzbar wird.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/beratung">
                    Beratung anfragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/kurse">Kurse entdecken</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--accent-gold)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Large Office Image */}
            <FadeIn direction="right">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/office_interior.jpg"
                  alt="Everlast Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-semibold text-lg">Unser Büro in Ulm</p>
                  <p className="text-white/80 text-sm">Wo Innovation entsteht</p>
                </div>
              </div>
            </FadeIn>

            {/* Two smaller images */}
            <div className="grid grid-rows-2 gap-8">
              <FadeIn delay={0.1} direction="left">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/team_meeting.jpg"
                    alt="Team Meeting"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Teamwork</p>
                    <p className="text-white/80 text-sm">Gemeinsam stark</p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2} direction="left">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/workshop_training.jpg"
                    alt="Workshop und Training"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">Schulungen</p>
                    <p className="text-white/80 text-sm">Wissen weitergeben</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <FadeIn delay={0}>
              <Card className="p-8 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] h-full">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-[var(--accent-gold)]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Unsere Mission</h2>
                  <p className="text-[var(--text-secondary)] text-lg">
                    Everlast will durch KI den deutschen und europäischen Mittelstand wieder wettbewerbsfähig machen.
                    Dabei wollen wir die Komplexität der Technologie so weit minimieren, dass sie für jeden einsetzbar
                    wird - und nicht nur von großen Konzernen genutzt werden kann.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-8 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] h-full">
                <CardContent className="pt-0">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue)]/20 flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-[var(--accent-blue)]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Unsere Vision</h2>
                  <p className="text-[var(--text-secondary)] text-lg">
                    Wir wollen die größte europäische KI-First Unternehmensberatung werden.
                    Everlast ist mehr als nur ein KI-Unternehmen - wir sind eine Bewegung von Gleichgesinnten,
                    die Bock darauf haben, die neue Welt mitzugestalten.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Rechtsform</h3>
                  <p className="text-[var(--text-secondary)]">Gesellschaft mit beschränkter Haftung (GmbH)</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Gründungsjahr</h3>
                  <p className="text-[var(--text-secondary)]">2020</p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[var(--accent-gold)]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Standort</h3>
                  <p className="text-[var(--text-secondary)]">Ulm, Deutschland</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Die Gründer</h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Lerne die Köpfe hinter Everlast Consulting kennen.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <StaggerItem key={founder.name}>
                <ScaleOnHover>
                  <Card className="overflow-hidden group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                      <p className="text-[var(--accent-gold)] text-sm font-medium mb-3">{founder.role}</p>
                      <p className="text-[var(--text-secondary)] text-sm">{founder.description}</p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Unsere Werte</h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Diese Prinzipien leiten uns bei allem, was wir tun.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <ScaleOnHover>
                  <Card className="p-6 h-full">
                    <CardContent className="pt-0">
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-[var(--accent-gold)]" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-[var(--text-secondary)] text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Warum Everlast?</h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Das macht uns einzigartig.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Größter und schnellstwachsender YouTube-Kanal zum Thema KI im DACH-Raum",
              "Marktführer für KI-Prozessautomatisierung",
              "Größtes deutsches KI-Netzwerk mit renommierten Experten",
              "Staatlich akkreditierter Bildungsträger",
              "Kontakte zu den drei KI-Hotspots: Silicon Valley, Shanghai und Zürich",
              "Haben einen Großteil des deutschen KI-Marktes ausgebildet",
            ].map((point, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                  <p className="text-[var(--text-secondary)]">{point}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="border-gradient p-8 md:p-12">
              <CardContent className="pt-0 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Youtube className="w-10 h-10 text-red-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Everlast AI auf YouTube</h2>
                  <p className="text-[var(--text-secondary)] mb-4">
                    Der größte deutschsprachige KI-Kanal. Hier findest du regelmäßig neue Videos zu KI-Trends,
                    Tutorials und Praxis-Tipps.
                  </p>
                  <Button asChild>
                    <a href="https://youtube.com/@EverlastAI" target="_blank" rel="noopener noreferrer">
                      Kanal abonnieren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bereit für die KI-Transformation?
              </h2>
              <p className="text-[var(--text-secondary)] text-lg mb-8">
                Lass uns gemeinsam herausfinden, wie KI dein Unternehmen auf die nächste Stufe bringen kann.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/beratung">
                    Beratung anfragen
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
