# SEO-Modul: Technical SEO

> **Referenziert von:** Phase 2 (Core Dev), Phase 7 (SEO Deep Optimization)
> **Ziel:** Technische SEO-Grundlagen: Sitemap, robots.txt, Canonical, Meta-Tags, Hreflang

---

## robots.ts (Next.js App Router)

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://{{DOMAIN}}'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],  // Optional: KI-Crawler blockieren
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

### Validierung nach Deploy

```
{{VERCEL_URL}}/robots.txt

Erwartetes Ergebnis:
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

User-Agent: GPTBot
Disallow: /

Sitemap: https://{{DOMAIN}}/sitemap.xml
Host: https://{{DOMAIN}}
```

---

## sitemap.ts (Dynamisch generiert)

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getAllCities } from '@/data/cities'
import { getAllBlogSlugs } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://{{DOMAIN}}'
  const now = new Date().toISOString()

  // ═══ Statische Seiten ═══
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ueber-uns`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  // ═══ Service-Unterseiten ═══
  const services = [
    'ki-beratung',
    'ki-automatisierung',
    'ki-workshop',
    'chatgpt-beratung',
    'ki-implementierung',
    'ki-strategie',
  ]

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/leistungen/${service}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // ═══ Stadt-Seiten ═══
  const cities = getAllCities()
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/ki-agentur-${city.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: city.priority === 'high' ? 0.8 : city.priority === 'medium' ? 0.7 : 0.6,
  }))

  // ═══ Blog-Artikel ═══
  const blogSlugs = getAllBlogSlugs()
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...cityPages, ...blogPages]
}
```

### Sitemap Erwartungen

```yaml
SITEMAP_CONTENTS:
  total_urls: "~35+ (1 Homepage + 1 Leistungen + 6 Services + 1 Über Uns + 1 Blog + 1 Kontakt + 20 Städte + Blog-Artikel + 2 Legal)"
  
  priority_mapping:
    homepage: 1.0
    leistungen_uebersicht: 0.9
    service_unterseiten: 0.85
    blog_uebersicht: 0.8
    stadt_seiten_high: 0.8
    stadt_seiten_medium: 0.7
    stadt_seiten_low: 0.6
    ueber_uns: 0.7
    blog_artikel: 0.7
    kontakt: 0.6
    impressum_datenschutz: 0.2
```

---

## Canonical URLs

### Regeln

```yaml
CANONICAL_RULES:
  - Jede Seite hat GENAU EINE Canonical URL
  - Canonical ist IMMER die absolute URL mit https://
  - Canonical enthält KEINE Query-Parameter
  - Canonical enthält KEINEN Trailing Slash
  - Stadt-Seiten: Canonical zeigt auf sich selbst (KEIN Cross-Canonical!)
  - Blog-Pagination: Canonical zeigt auf Seite 1
  - www vs non-www: Konsistent (empfohlen: non-www)
```

### Implementation via Metadata API

```typescript
// Statische Seite
export const metadata: Metadata = {
  alternates: {
    canonical: '/leistungen/ki-beratung',
  },
}

// Dynamische Seite (Stadt, Blog)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/ki-agentur-${params.stadt}`,
    },
  }
}
```

### Canonical Checkliste

- [ ] Homepage: `https://{{DOMAIN}}`
- [ ] Leistungen: `https://{{DOMAIN}}/leistungen`
- [ ] Jede Service-Seite: `https://{{DOMAIN}}/leistungen/{{service-slug}}`
- [ ] Über Uns: `https://{{DOMAIN}}/ueber-uns`
- [ ] Blog Übersicht: `https://{{DOMAIN}}/blog`
- [ ] Jeder Blog-Artikel: `https://{{DOMAIN}}/blog/{{article-slug}}`
- [ ] Kontakt: `https://{{DOMAIN}}/kontakt`
- [ ] Jede Stadt-Seite: `https://{{DOMAIN}}/ki-agentur-{{stadt-slug}}`
- [ ] Impressum: `https://{{DOMAIN}}/impressum`
- [ ] Datenschutz: `https://{{DOMAIN}}/datenschutz`

---

## Meta-Tags Template (generateMetadata)

### Basis-Pattern für alle Seiten

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    // ═══ PFLICHT ═══
    title: 'Seitentitel (30-65 Zeichen)',
    description: 'Meta Description mit Keyword und CTA (50-155 Zeichen)',
    
    // ═══ CANONICAL ═══
    alternates: {
      canonical: '/pfad-zur-seite',
    },
    
    // ═══ OPEN GRAPH ═══
    openGraph: {
      type: 'website',  // 'article' für Blog-Artikel
      locale: 'de_DE',
      title: 'OG Title (kann länger sein als <title>)',
      description: 'OG Description',
      siteName: '{{PROJECT_NAME}}',
      images: [{
        url: '/og-image.png',  // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Beschreibender Alt-Text',
      }],
    },
    
    // ═══ TWITTER ═══
    twitter: {
      card: 'summary_large_image',
      title: 'Twitter Title',
      description: 'Twitter Description',
    },
    
    // ═══ ROBOTS ═══
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
```

### Meta-Tag Validierung

```yaml
TITLE_TAG:
  min_length: 30
  max_length: 65
  must_contain: "Primäres Keyword der Seite"
  format: "{{Keyword}} – {{Kontext}} | {{Brand}}"
  beispiel: "KI-Beratung – Strategisch & Praxisnah | Everlast Consulting"

META_DESCRIPTION:
  min_length: 50
  max_length: 155
  must_contain: "Primäres Keyword + CTA oder USP"
  use_checkmarks: true  # ✓ für visuelle Aufzählung in SERPs
  beispiel: "Professionelle KI-Beratung für Ihr Unternehmen. ✓ KI-Strategie ✓ Implementierung ✓ Workshops. Jetzt kostenlose Beratung anfragen."

OG_IMAGE:
  width: 1200
  height: 630
  format: "PNG oder JPG"
  max_size: "300KB"
  must_include: "Logo + Seitentitel + visuelles Element"
```

---

## Web App Manifest

```typescript
// src/app/manifest.ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '{{PROJECT_NAME}}',
    short_name: '{{PRIMARY_KEYWORD}}',
    description: '{{PROJECT_DESC}}',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#C9A962',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

---

## On-Demand ISR (Revalidation API)

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-secret')
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  
  const body = await request.json()
  const { path } = body
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 })
  }
  
  revalidatePath(path)
  
  return NextResponse.json({ revalidated: true, path, timestamp: Date.now() })
}
```

### Revalidation auslösen

```bash
# Einzelne Seite revalidieren
curl -X POST "https://{{DOMAIN}}/api/revalidate" \
  -H "Content-Type: application/json" \
  -H "x-revalidation-secret: {{REVALIDATION_SECRET}}" \
  -d '{"path": "/blog/ki-automatisierung-guide"}'
```

---

## Security & Performance Headers

> Bereits in `next.config.ts` (Phase 1) konfiguriert. Hier die vollständige Referenz:

```yaml
SECURITY_HEADERS:
  X-DNS-Prefetch-Control: "on"
  X-Frame-Options: "SAMEORIGIN"
  X-Content-Type-Options: "nosniff"
  Referrer-Policy: "origin-when-cross-origin"
  Permissions-Policy: "camera=(), microphone=(), geolocation=()"

CACHE_HEADERS:
  images: "public, max-age=31536000, immutable"
  fonts: "public, max-age=31536000, immutable"
  static_assets: "public, max-age=31536000, immutable"
  html: "public, max-age=0, must-revalidate"  # Vercel Default

PERFORMANCE_HEADERS:
  Content-Encoding: "gzip/brotli"  # Vercel automatisch
  Connection: "keep-alive"
```

---

## 404-Seite (SEO-konform)

```typescript
// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-display text-6xl text-gold mb-6">404</h1>
        <p className="text-text-secondary text-xl mb-8">
          Die angeforderte Seite wurde nicht gefunden.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-background px-8 py-4 rounded-xl font-semibold hover:bg-gold-light transition-colors"
        >
          Zurück zur Startseite
        </Link>
        
        {/* Interne Links für SEO-Wert */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Leistungen</h2>
            <ul className="space-y-2 text-text-secondary">
              <li><Link href="/leistungen/ki-beratung" className="hover:text-gold transition-colors">KI-Beratung</Link></li>
              <li><Link href="/leistungen/ki-automatisierung" className="hover:text-gold transition-colors">KI-Automatisierung</Link></li>
              <li><Link href="/leistungen/chatgpt-beratung" className="hover:text-gold transition-colors">ChatGPT Beratung</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Beliebte Seiten</h2>
            <ul className="space-y-2 text-text-secondary">
              <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-gold transition-colors">Über Uns</Link></li>
              <li><Link href="/kontakt" className="hover:text-gold transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-3">Standorte</h2>
            <ul className="space-y-2 text-text-secondary">
              <li><Link href="/ki-agentur-berlin" className="hover:text-gold transition-colors">KI Agentur Berlin</Link></li>
              <li><Link href="/ki-agentur-muenchen" className="hover:text-gold transition-colors">KI Agentur München</Link></li>
              <li><Link href="/ki-agentur-hamburg" className="hover:text-gold transition-colors">KI Agentur Hamburg</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Trailing Slash & URL-Normalisierung

```yaml
URL_RULES:
  trailing_slash: false           # KEIN Trailing Slash (Next.js Default)
  www_redirect: "non-www"         # www.domain.de → domain.de (301)
  http_redirect: "https"          # http → https (Vercel automatisch)
  case: "lowercase"               # Großbuchstaben → 301 zu lowercase
  
  # Redirect-Konfiguration in next.config.ts (bereits in Phase 1)
  redirects:
    - source: "/:path+/"
      destination: "/:path+"
      permanent: true
```

---

## Internationale SEO (Optional)

> Nur relevant wenn mehrsprachig. Für rein deutsche Seite nicht nötig.

```typescript
// Falls Englisch-Version geplant:
export const metadata: Metadata = {
  alternates: {
    canonical: '/leistungen/ki-beratung',
    languages: {
      'de-DE': '/leistungen/ki-beratung',
      'en-US': '/en/services/ai-consulting',
    },
  },
}
```

---

## Checkliste Technical SEO

- [ ] robots.ts generiert und unter /robots.txt erreichbar
- [ ] sitemap.ts generiert und unter /sitemap.xml erreichbar
- [ ] Sitemap enthält ALLE Seiten (35+)
- [ ] Canonical URL auf JEDER Seite korrekt
- [ ] Meta Title auf jeder Seite (30-65 Zeichen)
- [ ] Meta Description auf jeder Seite (50-155 Zeichen)
- [ ] OG Tags auf jeder Seite (Title, Description, Image, Type, Locale)
- [ ] Twitter Card auf jeder Seite
- [ ] lang="de" im html-Element
- [ ] 404-Seite gibt HTTP 404 zurück
- [ ] manifest.ts vorhanden
- [ ] Revalidation API funktional
- [ ] Security Headers konfiguriert
- [ ] Trailing Slashes konsistent (keine)
- [ ] HTTPS enforced
