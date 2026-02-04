# KI-Lernen Plattform (kilernen.de) - Claude Code Instruktionen

## Projekt-Übersicht

Aufbau einer KI-Schulungsplattform nach Vorbild von [business.de](https://www.business.de/) mit dem Everlast-Design-System.

### Domain
- **Produktiv:** kilernen.de
- **Fokus:** Ausschließlich KI-Schulungen und Kurse

---

## 1. Tech-Stack Setup

### Versionen (EXAKT einhalten!)
```json
{
  "next": "16.1.0",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "typescript": "5.9.3",
  "tailwindcss": "3.4.19"
}
```

### Projekt initialisieren
```bash
npx create-next-app@16.1.0 kilernen --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd kilernen
```

### Zusätzliche Dependencies
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
npm install framer-motion lucide-react clsx tailwind-merge
npm install @radix-ui/react-accordion @radix-ui/react-tabs @radix-ui/react-dialog
npm install next-themes class-variance-authority
npm install zod react-hook-form @hookform/resolvers
npm install resend @react-email/components
```

---

## 2. Design-System (Everlast-Style)

### Farbpalette
```css
:root {
  /* Hintergrund */
  --background-primary: #0a0a0a;
  --background-secondary: #111111;
  --background-tertiary: #1a1a1a;
  --background-card: #151515;

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a1a1a1;
  --text-muted: #6b6b6b;

  /* Akzent (Gold) */
  --accent-gold: #c9a861;
  --accent-gold-hover: #dbb872;

  /* Akzent (Blau - für CTAs) */
  --accent-blue: #3b82f6;
  --accent-blue-hover: #60a5fa;

  /* Status */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;

  /* Border */
  --border-subtle: #262626;
  --border-default: #333333;
}
```

### Typografie
```css
/* Font Stack */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */

/* Headlines */
h1: font-weight: 700; letter-spacing: -0.02em;
h2: font-weight: 600; letter-spacing: -0.01em;
h3: font-weight: 600;
```

### Design-Prinzipien (aus PDF)
1. **Ruhe statt Reizüberflutung** - Keine überladenen Effekte
2. **Klarheit statt Komplexität** - Logische Struktur
3. **Substanz statt Show** - Fokus auf Inhalt
4. **Minimalistisch wie Apple** - Weißraum nutzen
5. **Gold nur als Akzent** - Für Hover, Icons, wichtige Elemente

---

## 3. Seitenstruktur (nach business.de)

### Seiten

```
/                       → Homepage (Hero, Stats, Features, Kurse, FAQ)
/kurse                  → Kursübersicht
/kurse/[slug]           → Einzelner Kurs
/login                  → Login (LearningSuite Integration)
/checkout/[kurs]        → Stripe Checkout
/datenschutz           → Datenschutz
/impressum             → Impressum
/agb                   → AGB
```

### Komponenten-Hierarchie

```
components/
├── layout/
│   ├── Header.tsx          # Navigation mit Login
│   ├── Footer.tsx          # Footer mit Links
│   └── MobileMenu.tsx      # Mobile Navigation
├── sections/
│   ├── Hero.tsx            # Hauptbereich mit CTA
│   ├── Stats.tsx           # Statistiken (X+ Kunden, etc.)
│   ├── Features.tsx        # Was zeichnet uns aus
│   ├── HowItWorks.tsx      # Dein Weg zur KI-Kompetenz
│   ├── CoursePreview.tsx   # Tab-basierte Kursvorschau
│   ├── CourseGrid.tsx      # Kursauswahl-Grid
│   ├── Testimonials.tsx    # Fallstudien/Testimonials
│   ├── Masterclasses.tsx   # Masterclass-Übersicht
│   ├── FAQ.tsx             # Accordion FAQ
│   └── CTASection.tsx      # Call-to-Action Bereich
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Accordion.tsx
│   ├── Tabs.tsx
│   ├── Input.tsx
│   └── VideoPlayer.tsx
└── forms/
    ├── NewsletterForm.tsx
    └── ContactForm.tsx
```

---

## 4. Kursinhalte (KI-fokussiert)

### Verfügbare Kurse

| Kurs | Status | Preis | Beschreibung |
|------|--------|-------|--------------|
| KI-Automatisierung Masterclass | **VERFÜGBAR** | €997 | Lerne KI-Automatisierung mit n8n, Make, Claude AI |
| Prompt Engineering Pro | Coming Soon | - | Professionelles Prompt Engineering |
| Voice Agent Development | Coming Soon | - | KI-Voice-Agenten entwickeln |
| RAG & LLM Implementierung | Coming Soon | - | Retrieval Augmented Generation |
| KI im Mittelstand | Coming Soon | - | KI-Beratung für Unternehmen |

### Kurs-Features (wie business.de)
- Video-Lektionen
- Vorlagen & Checklisten
- Praxis-Beispiele
- Zertifikat nach Abschluss
- Community-Zugang

---

## 5. Stripe Integration

### Setup
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Produkte in Stripe anlegen:
// - KI-Automatisierung Masterclass: price_xxx (€997 einmalig)
```

### Checkout Flow
1. User klickt "Jetzt kaufen"
2. Redirect zu Stripe Checkout
3. Nach Zahlung: Webhook empfangen
4. Zugang zu LearningSuite freischalten
5. Bestätigungs-E-Mail senden

### Webhook Endpoint
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === 'checkout.session.completed') {
    // Zugang freischalten
  }
}
```

---

## 6. Deployment

### Vercel
```bash
npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT
```

### GitHub
```bash
gh repo create damjan1996/kilernen --private
git init
git add .
git commit -m "Initial commit: kilernen.de KI-Lernplattform"
git branch -M main
git remote add origin https://github.com/damjan1996/kilernen.git
git push -u origin main
```

### Environment Variables (Vercel)
```
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_SITE_URL=https://kilernen.de
```

---

## 7. SEO & Performance

### Meta Tags
```typescript
export const metadata: Metadata = {
  title: 'KI Lernen - Deine #1 Lernplattform für KI-Skills',
  description: 'Erlerne durch unsere Online-Kurse gefragte KI-Skills. Zertifizierte Kurse für KI-Automatisierung, Prompt Engineering und mehr.',
  keywords: ['KI Kurs', 'KI lernen', 'Künstliche Intelligenz', 'AI Training', 'Prompt Engineering'],
  openGraph: {
    title: 'KI Lernen - Die #1 KI-Lernplattform',
    description: 'Zertifizierte KI-Kurse für die Zukunft',
    images: ['/og-image.jpg'],
  },
};
```

### Performance
- Bilder: Next.js Image mit WebP
- Fonts: next/font mit Inter
- Videos: Lazy Loading
- Animationen: Framer Motion mit reduced motion support

---

## 8. Zertifikate

### Zertifikat-Features hervorheben
- Badge/Icon für "Zertifiziert" bei jedem Kurs
- Zertifikat-Vorschau auf Kursseite
- Trust-Elemente: "Offizielles Zertifikat nach Abschluss"

### Zertifikat-Generierung
```typescript
// Nach Kursabschluss PDF generieren
// Mit Name, Kursnamen, Datum
// Signiert von KI Lernen
```

---

## 9. Implementierungs-Reihenfolge

### Phase 1: Foundation
1. [x] Next.js Projekt setup
2. [ ] Tailwind Config mit Design-System
3. [ ] Basis-Komponenten (Button, Card, etc.)
4. [ ] Layout (Header, Footer)

### Phase 2: Homepage
5. [ ] Hero Section
6. [ ] Stats Section
7. [ ] Features Section
8. [ ] Course Grid
9. [ ] FAQ Section

### Phase 3: Kurse
10. [ ] Kursübersicht-Seite
11. [ ] Einzelne Kursseite
12. [ ] Coming Soon Badges

### Phase 4: Payment
13. [ ] Stripe Integration
14. [ ] Checkout Flow
15. [ ] Webhook Handler

### Phase 5: Polish
16. [ ] Animationen
17. [ ] Mobile Optimierung
18. [ ] SEO
19. [ ] Performance Optimierung

---

## 10. Design System mit Pencil.dev

### Workflow
1. Komponenten in Pencil.dev designen
2. everlast.pen als Basis verwenden
3. Tokens exportieren
4. In Tailwind Config übernehmen

### Pencil Commands
```
// Editor öffnen
get_editor_state()

// Design-System laden
open_document("C:/Users/damja/Desktop/KI-Lernen/Workflow/everlast.pen")

// Komponenten lesen
batch_get({ patterns: [{ reusable: true }] })
```

---

## Referenzen

- **Vorbild:** https://www.business.de/
- **Design-System:** https://everlastcareer.site/
- **Domain:** kilernen.de

---

## Kontakt & Support

Bei Fragen zur Implementierung:
- WhatsApp-Button wie bei business.de integrieren
- E-Mail Kontaktformular

---

*Erstellt: 03.02.2026 22:45 CET*
*Version: 1.0*
