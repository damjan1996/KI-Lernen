# Phase 2: Core Development

> **Dauer:** ~60-90 Minuten (größte Phase)
> **Input:** Phase 1 Output + Design Tokens + templates/*.md + seo/*.md
> **Output:** Vollständige Website mit allen Seiten
> **Abhängigkeiten:** Phase 1 (Build Success)

---

## Vor dem Start: Module laden

Claude Code liest diese Referenz-Module BEVOR mit der Entwicklung begonnen wird:

```yaml
PFLICHT_LESEN:
  - templates/SITE_STRUCTURE.md      # URL-Hierarchie & Routing
  - templates/HOMEPAGE_SECTIONS.md   # 20+ Sektionen Definition
  - templates/BRANDING_EVERLAST.md   # Design Tokens Vollreferenz
  - seo/TECHNICAL_SEO.md             # Meta-Tags, Sitemap, robots.txt
  - seo/SCHEMA_TEMPLATES.md          # JSON-LD Structured Data
```

---

## Architektur-Übersicht

### Seiten die gebaut werden

```
src/app/
├── layout.tsx                      ← Root Layout (Fonts, Header, Footer, Schema)
├── page.tsx                        ← Homepage (20+ Sektionen)
├── not-found.tsx                   ← Custom 404
│
├── leistungen/
│   ├── page.tsx                    ← Leistungs-Übersicht
│   ├── ki-beratung/page.tsx        ← Service: KI-Beratung
│   ├── ki-automatisierung/page.tsx ← Service: KI-Automatisierung
│   ├── ki-workshop/page.tsx        ← Service: KI-Workshop
│   ├── chatgpt-beratung/page.tsx   ← Service: ChatGPT Beratung
│   ├── ki-implementierung/page.tsx ← Service: KI-Implementierung
│   └── ki-strategie/page.tsx       ← Service: KI-Strategie
│
├── ueber-uns/page.tsx              ← Über Uns (Team, Story, Werte)
│
├── blog/
│   ├── page.tsx                    ← Blog-Übersicht
│   └── [slug]/page.tsx             ← Einzelne Blog-Artikel (ISR)
│
├── kontakt/page.tsx                ← Kontaktformular
│
├── ki-agentur-[stadt]/page.tsx     ← 20 Stadt-Seiten (SSG)
│
├── impressum/page.tsx              ← Impressum (DSGVO)
├── datenschutz/page.tsx            ← Datenschutz (DSGVO)
│
├── sitemap.ts                      ← Auto-generierte Sitemap
├── robots.ts                       ← robots.txt
├── manifest.ts                     ← Web App Manifest
│
└── api/
    └── revalidate/route.ts         ← On-Demand ISR Endpoint
```

### Komponenten-Architektur

```
src/components/
├── layout/
│   ├── Header.tsx                  ← Sticky, Glass-Effekt, Mobile Menu
│   ├── Footer.tsx                  ← Links, Social, Copyright, Schema
│   ├── Navigation.tsx              ← Desktop + Mobile Nav
│   ├── MobileMenu.tsx              ← Hamburger Menu Overlay
│   └── Breadcrumb.tsx              ← SEO Breadcrumbs mit Schema
│
├── sections/                       ← Homepage Sektionen (20+)
│   ├── HeroSection.tsx
│   ├── ClientLogos.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── ServicesGrid.tsx
│   ├── ProcessSteps.tsx
│   ├── CaseStudyHighlight.tsx
│   ├── VideoTestimonial.tsx
│   ├── StatsSection.tsx
│   ├── PartnersSection.tsx
│   ├── TeamPreview.tsx
│   ├── PressSection.tsx
│   ├── FAQSection.tsx
│   ├── BlogTeaser.tsx
│   ├── NewsletterSection.tsx
│   ├── CTASection.tsx
│   ├── TrustSignals.tsx
│   ├── TechnologyStack.tsx
│   ├── IndustrySection.tsx
│   └── ComparisonTable.tsx
│
├── ui/                             ← Basis UI Komponenten
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── AnimatedCounter.tsx
│   ├── GlassCard.tsx
│   └── SectionWrapper.tsx
│
└── seo/                            ← SEO Komponenten
    ├── JsonLd.tsx                  ← Generischer JSON-LD Renderer
    ├── OrganizationSchema.tsx
    ├── LocalBusinessSchema.tsx
    ├── ServiceSchema.tsx
    ├── FAQSchema.tsx
    ├── BreadcrumbSchema.tsx
    └── ArticleSchema.tsx
```

---

## Root Layout Implementation

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://{{DOMAIN}}'),
  title: {
    template: '%s | {{PRIMARY_KEYWORD}} – {{PROJECT_NAME}}',
    default: '{{PRIMARY_KEYWORD}} Deutschland – KI-Beratung & Entwicklung | {{PROJECT_NAME}}',
  },
  description: 'Ihre {{PRIMARY_KEYWORD}} für künstliche Intelligenz. ✓ KI-Beratung ✓ ChatGPT Integration ✓ Prozessautomatisierung ✓ KI-Workshops. Jetzt kostenlose Beratung anfragen.',
  keywords: ['{{PRIMARY_KEYWORD}}', 'KI Beratung', 'Künstliche Intelligenz', 'AI Agentur', 'KI Consulting', 'ChatGPT Beratung'],
  authors: [{ name: '{{COMPANY_NAME}}' }],
  creator: '{{COMPANY_NAME}}',
  publisher: '{{COMPANY_NAME}}',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: '{{PROJECT_NAME}}',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '{{PROJECT_NAME}} – {{PRIMARY_KEYWORD}}' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  verification: {
    // google: 'VERIFICATION_CODE',  // Später hinzufügen
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-background text-text-primary font-body antialiased">
        <OrganizationSchema />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```

---

## Kritische Layout-Regeln

> Diese Regeln sind NICHT VERHANDELBAR. Sie verhindern die häufigsten visuellen Bugs.

```typescript
// Header — IMMER sticky mit fester Höhe
<header className="sticky top-0 z-50 h-20 bg-background/95 backdrop-blur-lg border-b border-glass-border">

// Main — IMMER pt-20 (gleich wie Header-Höhe)
<main className="flex-1 pt-20">

// Container — IMMER max-w-7xl zentriert
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Sections — IMMER mit vertikalem Padding
<section className="py-24 lg:py-32">

// Images — IMMER mit expliziter Größe
<Image src="..." alt="..." width={1200} height={600} />
// NIEMALS: <img> ohne width/height (CLS!)
```

---

## Homepage Implementation (20+ Sektionen)

> Detaillierte Sektion-Definitionen: siehe `templates/HOMEPAGE_SECTIONS.md`

```typescript
// src/app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { ClientLogos } from '@/components/sections/ClientLogos'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { SolutionSection } from '@/components/sections/SolutionSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { CaseStudyHighlight } from '@/components/sections/CaseStudyHighlight'
import { StatsSection } from '@/components/sections/StatsSection'
import { TechnologyStack } from '@/components/sections/TechnologyStack'
import { IndustrySection } from '@/components/sections/IndustrySection'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { VideoTestimonial } from '@/components/sections/VideoTestimonial'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { TeamPreview } from '@/components/sections/TeamPreview'
import { PressSection } from '@/components/sections/PressSection'
import { TrustSignals } from '@/components/sections/TrustSignals'
import { FAQSection } from '@/components/sections/FAQSection'
import { BlogTeaser } from '@/components/sections/BlogTeaser'
import { NewsletterSection } from '@/components/sections/NewsletterSection'
import { CTASection } from '@/components/sections/CTASection'
import { FAQSchema } from '@/components/seo/FAQSchema'

export default function HomePage() {
  return (
    <>
      <FAQSchema />

      {/* ═══ ABOVE THE FOLD ═══ */}
      <HeroSection />           {/* 1. H1 + Subline + CTA */}
      <ClientLogos />           {/* 2. Kunden-Logos */}

      {/* ═══ PROBLEM → LÖSUNG ═══ */}
      <ProblemSection />        {/* 3. Schmerzpunkte */}
      <SolutionSection />       {/* 4. Wie wir helfen */}

      {/* ═══ SERVICES ═══ */}
      <ServicesGrid />          {/* 5. 6 Service-Kacheln */}
      <ProcessSteps />          {/* 6. 4-Schritte Prozess */}

      {/* ═══ SOCIAL PROOF ═══ */}
      <CaseStudyHighlight />    {/* 7. Case Study mit Zahlen */}
      <StatsSection />          {/* 8. Zahlen-Sektion */}
      <VideoTestimonial />      {/* 9. Video-Testimonial */}

      {/* ═══ EXPERTISE ═══ */}
      <TechnologyStack />       {/* 10. Tech-Stack */}
      <IndustrySection />       {/* 11. Branchen */}
      <ComparisonTable />       {/* 12. Vergleich: Mit KI vs. Ohne KI */}

      {/* ═══ TRUST ═══ */}
      <PartnersSection />       {/* 13. Partner & Zertifikate */}
      <TeamPreview />           {/* 14. Team */}
      <PressSection />          {/* 15. Presse-Erwähnungen */}
      <TrustSignals />          {/* 16. DSGVO, ISO, etc. */}

      {/* ═══ ENGAGEMENT ═══ */}
      <FAQSection />            {/* 17. FAQ (Featured Snippets) */}
      <BlogTeaser />            {/* 18. 3 aktuelle Artikel */}
      <NewsletterSection />     {/* 19. Newsletter + Lead-Magnet */}

      {/* ═══ CONVERSION ═══ */}
      <CTASection />            {/* 20. Finaler CTA */}
    </>
  )
}
```

---

## Stadt-Seiten Implementation (SSG)

```typescript
// src/app/ki-agentur-[stadt]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityData, getAllCities } from '@/data/cities'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

// Statisch alle 20 Städte pre-rendern
export async function generateStaticParams() {
  const cities = getAllCities()
  return cities.map((city) => ({ stadt: city.slug }))
}

// Dynamische Metadata pro Stadt
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCityData(params.stadt)
  if (!city) return {}

  return {
    title: `{{PRIMARY_KEYWORD}} ${city.name} – KI-Beratung & Entwicklung`,
    description: `Ihre {{PRIMARY_KEYWORD}} in ${city.name}. Wir entwickeln maßgeschneiderte KI-Lösungen für Unternehmen in ${city.name} und ${city.region}. ✓ Kostenlose Beratung`,
    alternates: { canonical: `/ki-agentur-${city.slug}` },
    openGraph: {
      title: `{{PRIMARY_KEYWORD}} ${city.name}`,
      description: `KI-Beratung und Entwicklung in ${city.name}`,
      locale: 'de_DE',
    },
  }
}

export default function CityPage({ params }: Props) {
  const city = getCityData(params.stadt)
  if (!city) notFound()

  return (
    <>
      <LocalBusinessSchema city={city} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: `{{PRIMARY_KEYWORD}} ${city.name}`, url: `/ki-agentur-${city.slug}` },
      ]} />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: `${city.name}`, href: `/ki-agentur-${city.slug}` },
      ]} />

      {/* Stadt-spezifischer Content — min. 40% unique pro Seite */}
      {/* Siehe seo/CITY_PAGES.md für Content-Anforderungen */}
    </>
  )
}
```

---

## Blog Implementation (ISR)

```typescript
// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getBlogPost, getAllBlogSlugs } from '@/data/blog'
import { ArticleSchema } from '@/components/seo/ArticleSchema'

// ISR: Stündlich revalidieren
export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <>
      <ArticleSchema post={post} />
      {/* Blog Post Content */}
    </>
  )
}
```

---

## SEO-Komponenten die in Phase 2 gebaut werden

### JSON-LD Renderer

```typescript
// src/components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### Sitemap (Auto-generiert)

```typescript
// src/app/sitemap.ts — Siehe seo/TECHNICAL_SEO.md für vollständige Implementierung
```

### robots.txt

```typescript
// src/app/robots.ts — Siehe seo/TECHNICAL_SEO.md
```

---

## Rendering-Strategie Übersicht

| Seite | Strategie | revalidate | Begründung |
|-------|-----------|------------|------------|
| Homepage | SSG | - | Statisch, schnellste Ladezeit |
| Leistungen | SSG | - | Ändert sich selten |
| Service-Unterseiten | SSG | - | Statischer Content |
| Über Uns | SSG | - | Statischer Content |
| Blog-Übersicht | ISR | 3600 | Neue Artikel regelmäßig |
| Blog-Artikel | ISR | 3600 | Aktualität + Performance |
| Kontakt | SSG | - | Statisches Formular |
| Stadt-Seiten | SSG + generateStaticParams | - | 20 Seiten pre-rendern |
| Impressum/Datenschutz | SSG | - | Rechtliche Seiten |

---

## Erfolgskriterien Phase 2

- [ ] Alle Seiten aus der Architektur implementiert
- [ ] Homepage hat 20+ Sektionen
- [ ] 6 Service-Unterseiten existieren
- [ ] Blog mit Übersicht und Einzelansicht funktioniert
- [ ] 20 Stadt-Seiten mit `generateStaticParams` pre-gerendert
- [ ] Kontaktformular funktional
- [ ] Header: sticky, Glass-Effekt, Mobile-tauglich
- [ ] Footer: vollständig mit allen Links
- [ ] Breadcrumbs auf allen Unterseiten
- [ ] Structured Data auf jeder Seite (JsonLd Komponenten)
- [ ] Meta-Tags auf jeder Seite (generateMetadata)
- [ ] `npm run build` erfolgreich
- [ ] Keine TypeScript Errors
- [ ] Responsive: Mobile, Tablet, Desktop getestet

---

## Weiter zu Phase 2B

> Nach Abschluss von Phase 2 SOFORT Phase 2B (UI/UX Testing) starten.
> NICHT direkt zu Phase 3 (GitHub) springen!
