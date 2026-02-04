# Phase 1: Setup & Scaffolding

> **Dauer:** ~5 Minuten
> **Input:** CONFIG.md Variablen
> **Output:** Lauffähiges Next.js 16 Projekt mit Build-Success
> **Abhängigkeiten:** Phase 0 (Design System existiert)

---

## Schritt 1: Projektverzeichnis erstellen

```bash
# Verzeichnis anlegen
mkdir -p "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"
cd "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"
```

---

## Schritt 2: Next.js 16 Projekt initialisieren

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack \
  --yes
```

### Erwartete Projektstruktur nach Scaffolding

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── ...
├── public/
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── next.config.ts
└── ...
```

---

## Schritt 3: Zusätzliche Dependencies installieren

```bash
# Tailwind CSS 3.4.17 (explizite Version)
npm install -D tailwindcss@3.4.17 postcss autoprefixer

# SEO & Structured Data
npm install next-sitemap schema-dts

# Animationen
npm install framer-motion

# Icons
npm install lucide-react

# Analytics (Vercel)
npm install @vercel/analytics @vercel/speed-insights

# Testing (wird in Phase 2B und 8 gebraucht)
npm install -D @playwright/test playwright
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @vitest/coverage-v8

# Playwright Browser installieren
npx playwright install chromium
```

---

## Schritt 4: Projektstruktur für SEO-Website aufbauen

```bash
# App Router Verzeichnisse
mkdir -p src/app/leistungen/ki-beratung
mkdir -p src/app/leistungen/ki-automatisierung
mkdir -p src/app/leistungen/ki-workshop
mkdir -p src/app/leistungen/chatgpt-beratung
mkdir -p src/app/leistungen/ki-implementierung
mkdir -p src/app/leistungen/ki-strategie
mkdir -p src/app/ueber-uns
mkdir -p src/app/blog/\[slug\]
mkdir -p src/app/kontakt
mkdir -p src/app/ki-agentur-\[stadt\]
mkdir -p src/app/impressum
mkdir -p src/app/datenschutz
mkdir -p src/app/api/revalidate

# Komponenten-Verzeichnisse
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui
mkdir -p src/components/seo

# Daten & Konfiguration
mkdir -p src/lib
mkdir -p src/data
mkdir -p src/types

# Öffentliche Assets
mkdir -p public/images
mkdir -p public/icons
mkdir -p public/fonts

# Tests
mkdir -p tests/e2e
mkdir -p tests/unit
mkdir -p tests/seo
```

---

## Schritt 5: Basis-Konfigurationsdateien erstellen

### next.config.ts

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance
  compress: true,
  poweredByHeader: false,
  
  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 Jahr
  },
  
  // Redirects für SEO
  async redirects() {
    return [
      // Trailing Slash Enforcement
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ]
  },
  
  // Security & Performance Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  
  // Experimental Features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
```

### tsconfig.json Ergänzungen

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/data/*": ["./src/data/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

### .env.local

```bash
# Basis-URL (für Sitemap, OG Images etc.)
NEXT_PUBLIC_BASE_URL=https://{{DOMAIN}}

# Revalidation Secret (für On-Demand ISR)
REVALIDATION_SECRET={{RANDOM_SECRET}}

# Analytics
NEXT_PUBLIC_GA_ID=

# Kontaktformular
CONTACT_EMAIL={{EMAIL}}
```

---

## Schritt 6: Design Tokens in globals.css übernehmen

> Tokens aus Phase 0 / templates/BRANDING_EVERLAST.md

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ═══════════════════════════════════════════════════════════ */
/* Design Tokens aus Everlast Design System                    */
/* ═══════════════════════════════════════════════════════════ */

:root {
  /* Colors */
  --background: #0A0A0A;
  --surface: #141414;
  --surface-light: #1A1A1A;
  --gold-primary: #C9A962;
  --gold-light: #D4B978;
  --gold-dark: #A88B4A;
  --text-primary: #FAF8F5;
  --text-secondary: #888888;
  --text-tertiary: #666666;
  --success: #22C55E;
  --error: #EF4444;
  --warning: #F59E0B;

  /* Typography */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --spacing-base: 8px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-gold: 0 0 20px rgba(201, 169, 98, 0.3);

  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(201, 169, 98, 0.2);
  --glass-blur: 16px;

  /* Animation */
  --timing-fast: 150ms;
  --timing-normal: 300ms;
  --timing-slow: 500ms;
  --easing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reset & Base */
* { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--background);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.6;
}

/* Selection */
::selection {
  background: rgba(201, 169, 98, 0.3);
  color: var(--text-primary);
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--background); }
::-webkit-scrollbar-thumb { background: var(--surface-light); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--gold-dark); }
```

---

## Schritt 7: Tailwind CSS 3.4.17 Konfiguration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: { DEFAULT: '#141414', light: '#1A1A1A' },
        gold: { DEFAULT: '#C9A962', light: '#D4B978', dark: '#A88B4A' },
        'text-primary': '#FAF8F5',
        'text-secondary': '#888888',
        'text-tertiary': '#666666',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
        md: '0 4px 16px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.4)',
        gold: '0 0 20px rgba(201, 169, 98, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
      maxWidth: {
        '7xl': '1280px',
      },
    },
  },
  plugins: [],
}

export default config
```

### postcss.config.mjs

```javascript
// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

---

## Schritt 8: Build validieren

```bash
cd "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"

# Build MUSS erfolgreich sein!
npm run build
```

### Erfolgskriterien

- [ ] `npm run build` beendet ohne Errors
- [ ] Alle Routes werden im Build-Output gelistet
- [ ] Keine TypeScript Errors
- [ ] Keine Tailwind Warnungen

### Bei Fehler

```bash
# TypeScript Errors prüfen
npx tsc --noEmit

# Lint prüfen
npm run lint

# Einzelne Datei testen
npx tsc src/app/page.tsx --noEmit
```

---

## Ergebnis dieser Phase

```yaml
PHASE_1_OUTPUT:
  project_path: "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"
  framework: "Next.js 16"
  styling: "Tailwind CSS 3.4.17"
  language: "TypeScript"
  build_status: "SUCCESS"
  dependencies_installed:
    - next-sitemap
    - schema-dts
    - framer-motion
    - lucide-react
    - "@vercel/analytics"
    - "@vercel/speed-insights"
    - "@playwright/test"
    - vitest
    - "@vitest/coverage-v8"
  directory_structure: "Vollständig angelegt (app, components, lib, data, tests)"
  design_tokens: "In globals.css und tailwind.config.ts integriert"
```
