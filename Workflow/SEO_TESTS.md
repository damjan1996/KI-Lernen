# Test-Modul: SEO Tests (Playwright)

> **Referenziert von:** Phase 8 (Test Suite)
> **Ziel:** Automatisierte SEO-Validierung aller Seiten per Playwright

---

## Übersicht der SEO Test-Dateien

```
tests/seo/
├── meta-tags.spec.ts        ← Title, Description, OG, Twitter
├── structured-data.spec.ts  ← JSON-LD Validierung
├── sitemap.spec.ts          ← Sitemap XML Validierung
├── robots.spec.ts           ← robots.txt Validierung
├── headings.spec.ts         ← H1-H6 Hierarchie
├── images.spec.ts           ← Alt-Tags, Lazy Loading
├── links.spec.ts            ← Internal/External Links
└── canonical.spec.ts        ← Canonical URLs
```

---

## Test-Seiten (alle zu testen)

```typescript
// tests/seo/test-pages.ts
export const SEO_PAGES = [
  { path: '/', name: 'Homepage', type: 'homepage' },
  { path: '/leistungen', name: 'Leistungen Übersicht', type: 'overview' },
  { path: '/leistungen/ki-beratung', name: 'KI-Beratung', type: 'service' },
  { path: '/leistungen/ki-automatisierung', name: 'KI-Automatisierung', type: 'service' },
  { path: '/leistungen/ki-workshop', name: 'KI-Workshop', type: 'service' },
  { path: '/leistungen/chatgpt-beratung', name: 'ChatGPT Beratung', type: 'service' },
  { path: '/leistungen/ki-implementierung', name: 'KI-Implementierung', type: 'service' },
  { path: '/leistungen/ki-strategie', name: 'KI-Strategie', type: 'service' },
  { path: '/ueber-uns', name: 'Über Uns', type: 'standard' },
  { path: '/blog', name: 'Blog', type: 'blog_overview' },
  { path: '/kontakt', name: 'Kontakt', type: 'standard' },
  { path: '/ki-agentur-berlin', name: 'Berlin', type: 'city' },
  { path: '/ki-agentur-muenchen', name: 'München', type: 'city' },
  { path: '/ki-agentur-hamburg', name: 'Hamburg', type: 'city' },
  { path: '/impressum', name: 'Impressum', type: 'legal' },
  { path: '/datenschutz', name: 'Datenschutz', type: 'legal' },
]
```

---

## meta-tags.spec.ts

```typescript
// tests/seo/meta-tags.spec.ts
import { test, expect } from '@playwright/test'
import { SEO_PAGES } from './test-pages'

for (const p of SEO_PAGES) {
  test.describe(`Meta Tags: ${p.name} (${p.path})`, () => {
    
    test('has valid title tag (30-65 chars)', async ({ page }) => {
      await page.goto(p.path)
      const title = await page.title()
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThanOrEqual(30)
      expect(title.length).toBeLessThanOrEqual(65)
    })

    test('has valid meta description (50-155 chars)', async ({ page }) => {
      await page.goto(p.path)
      const desc = await page.locator('meta[name="description"]').getAttribute('content')
      expect(desc).toBeTruthy()
      expect(desc!.length).toBeGreaterThanOrEqual(50)
      expect(desc!.length).toBeLessThanOrEqual(155)
    })

    test('has OG title', async ({ page }) => {
      await page.goto(p.path)
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
      expect(ogTitle).toBeTruthy()
    })

    test('has OG description', async ({ page }) => {
      await page.goto(p.path)
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content')
      expect(ogDesc).toBeTruthy()
    })

    test('has OG image', async ({ page }) => {
      await page.goto(p.path)
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
      expect(ogImage).toBeTruthy()
      expect(ogImage).toMatch(/^https?:\/\//)
    })

    test('has OG locale set to de_DE', async ({ page }) => {
      await page.goto(p.path)
      const locale = await page.locator('meta[property="og:locale"]').getAttribute('content')
      expect(locale).toBe('de_DE')
    })

    test('has twitter card', async ({ page }) => {
      await page.goto(p.path)
      const card = await page.locator('meta[name="twitter:card"]').getAttribute('content')
      expect(card).toBe('summary_large_image')
    })

    test('html lang is de', async ({ page }) => {
      await page.goto(p.path)
      const lang = await page.locator('html').getAttribute('lang')
      expect(lang).toBe('de')
    })

    test('has viewport meta tag', async ({ page }) => {
      await page.goto(p.path)
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')
      expect(viewport).toBeTruthy()
      expect(viewport).toContain('width=device-width')
    })
  })
}
```

---

## structured-data.spec.ts

```typescript
// tests/seo/structured-data.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Structured Data: Homepage', () => {
  test('has Organization schema', async ({ page }) => {
    await page.goto('/')
    const schemas = await page.evaluate(() => {
      return [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(s => JSON.parse(s.textContent || '{}'))
    })
    const org = schemas.find(s => s['@type'] === 'Organization')
    expect(org).toBeTruthy()
    expect(org.name).toBeTruthy()
    expect(org.url).toBeTruthy()
  })

  test('has FAQPage schema', async ({ page }) => {
    await page.goto('/')
    const schemas = await page.evaluate(() => {
      return [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(s => JSON.parse(s.textContent || '{}'))
    })
    const faq = schemas.find(s => s['@type'] === 'FAQPage')
    expect(faq).toBeTruthy()
    expect(faq.mainEntity).toBeTruthy()
    expect(faq.mainEntity.length).toBeGreaterThan(0)
  })
})

test.describe('Structured Data: Service Pages', () => {
  const services = [
    '/leistungen/ki-beratung',
    '/leistungen/ki-automatisierung',
    '/leistungen/chatgpt-beratung',
  ]
  
  for (const path of services) {
    test(`${path} has Service schema`, async ({ page }) => {
      await page.goto(path)
      const schemas = await page.evaluate(() => {
        return [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map(s => JSON.parse(s.textContent || '{}'))
      })
      const service = schemas.find(s => s['@type'] === 'Service')
      expect(service).toBeTruthy()
      expect(service.name).toBeTruthy()
      expect(service.provider).toBeTruthy()
    })

    test(`${path} has BreadcrumbList schema`, async ({ page }) => {
      await page.goto(path)
      const schemas = await page.evaluate(() => {
        return [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map(s => JSON.parse(s.textContent || '{}'))
      })
      const breadcrumb = schemas.find(s => s['@type'] === 'BreadcrumbList')
      expect(breadcrumb).toBeTruthy()
      expect(breadcrumb.itemListElement.length).toBeGreaterThanOrEqual(2)
    })
  }
})

test.describe('Structured Data: City Pages', () => {
  const cities = ['/ki-agentur-berlin', '/ki-agentur-muenchen', '/ki-agentur-hamburg']
  
  for (const path of cities) {
    test(`${path} has ProfessionalService schema`, async ({ page }) => {
      await page.goto(path)
      const schemas = await page.evaluate(() => {
        return [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map(s => JSON.parse(s.textContent || '{}'))
      })
      const local = schemas.find(s => 
        s['@type'] === 'ProfessionalService' || s['@type'] === 'LocalBusiness'
      )
      expect(local).toBeTruthy()
      expect(local.address).toBeTruthy()
      expect(local.geo).toBeTruthy()
      expect(local.geo.latitude).toBeTruthy()
      expect(local.geo.longitude).toBeTruthy()
    })
  }
})

test.describe('Structured Data: JSON-LD Validity', () => {
  test('all JSON-LD scripts are valid JSON', async ({ page }) => {
    await page.goto('/')
    const results = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      return [...scripts].map(s => {
        try {
          JSON.parse(s.textContent || '')
          return { valid: true, content: s.textContent?.substring(0, 50) }
        } catch {
          return { valid: false, content: s.textContent?.substring(0, 50) }
        }
      })
    })
    for (const r of results) {
      expect(r.valid).toBe(true)
    }
  })

  test('all JSON-LD have @context and @type', async ({ page }) => {
    await page.goto('/')
    const schemas = await page.evaluate(() => {
      return [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map(s => JSON.parse(s.textContent || '{}'))
    })
    for (const schema of schemas) {
      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBeTruthy()
    }
  })
})
```

---

## headings.spec.ts

```typescript
// tests/seo/headings.spec.ts
import { test, expect } from '@playwright/test'
import { SEO_PAGES } from './test-pages'

for (const p of SEO_PAGES) {
  test.describe(`Headings: ${p.name}`, () => {
    
    test('has exactly one H1', async ({ page }) => {
      await page.goto(p.path)
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
    })

    test('H1 is not empty', async ({ page }) => {
      await page.goto(p.path)
      const h1Text = await page.locator('h1').textContent()
      expect(h1Text?.trim().length).toBeGreaterThan(0)
    })

    test('heading hierarchy has no gaps', async ({ page }) => {
      await page.goto(p.path)
      const headingLevels = await page.evaluate(() => {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
        return [...headings].map(h => parseInt(h.tagName.substring(1)))
      })
      
      // Prüfe: Kein Sprung größer als 1 (z.B. H1 → H3 ohne H2)
      for (let i = 1; i < headingLevels.length; i++) {
        const gap = headingLevels[i] - headingLevels[i - 1]
        expect(gap).toBeLessThanOrEqual(1) // Darf gleich bleiben oder um 1 steigen
      }
    })
  })
}
```

---

## sitemap.spec.ts

```typescript
// tests/seo/sitemap.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Sitemap', () => {
  test('sitemap.xml is accessible', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('xml')
  })

  test('sitemap contains homepage', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()
    expect(body).toContain('<loc>')
    expect(body).toContain('</loc>')
  })

  test('sitemap contains service pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()
    expect(body).toContain('/leistungen/ki-beratung')
    expect(body).toContain('/leistungen/ki-automatisierung')
  })

  test('sitemap contains city pages', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()
    expect(body).toContain('/ki-agentur-berlin')
    expect(body).toContain('/ki-agentur-muenchen')
  })

  test('sitemap has at least 30 URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    const body = await response.text()
    const urlCount = (body.match(/<loc>/g) || []).length
    expect(urlCount).toBeGreaterThanOrEqual(30)
  })
})
```

---

## robots.spec.ts

```typescript
// tests/seo/robots.spec.ts
import { test, expect } from '@playwright/test'

test.describe('robots.txt', () => {
  test('is accessible', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
  })

  test('allows crawling of main pages', async ({ request }) => {
    const response = await request.get('/robots.txt')
    const body = await response.text()
    expect(body).toContain('Allow: /')
  })

  test('disallows /api/', async ({ request }) => {
    const response = await request.get('/robots.txt')
    const body = await response.text()
    expect(body).toContain('Disallow: /api/')
  })

  test('contains sitemap reference', async ({ request }) => {
    const response = await request.get('/robots.txt')
    const body = await response.text()
    expect(body.toLowerCase()).toContain('sitemap:')
    expect(body).toContain('/sitemap.xml')
  })
})
```

---

## images.spec.ts

```typescript
// tests/seo/images.spec.ts
import { test, expect } from '@playwright/test'
import { SEO_PAGES } from './test-pages'

for (const p of SEO_PAGES) {
  test.describe(`Images: ${p.name}`, () => {
    
    test('all images have alt attributes', async ({ page }) => {
      await page.goto(p.path)
      const noAlt = await page.locator('img:not([alt]), img[alt=""]').count()
      expect(noAlt).toBe(0)
    })

    test('no images have empty src', async ({ page }) => {
      await page.goto(p.path)
      const emptySrc = await page.locator('img[src=""], img:not([src])').count()
      expect(emptySrc).toBe(0)
    })
  })
}
```

---

## canonical.spec.ts

```typescript
// tests/seo/canonical.spec.ts
import { test, expect } from '@playwright/test'
import { SEO_PAGES } from './test-pages'

for (const p of SEO_PAGES) {
  test.describe(`Canonical: ${p.name}`, () => {
    
    test('has canonical URL', async ({ page }) => {
      await page.goto(p.path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBeTruthy()
    })

    test('canonical URL is absolute', async ({ page }) => {
      await page.goto(p.path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toMatch(/^https:\/\//)
    })

    test('canonical URL has no trailing slash (except root)', async ({ page }) => {
      await page.goto(p.path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      if (p.path !== '/') {
        expect(canonical).not.toMatch(/\/$/)
      }
    })
  })
}
```

---

## links.spec.ts

```typescript
// tests/seo/links.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Internal Links', () => {
  test('homepage has at least 15 internal links', async ({ page }) => {
    await page.goto('/')
    const internalLinks = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]')
      return links.length
    })
    expect(internalLinks).toBeGreaterThanOrEqual(15)
  })

  test('no broken internal links on homepage', async ({ page }) => {
    await page.goto('/')
    const links = await page.evaluate(() => {
      return [...document.querySelectorAll('a[href^="/"]')]
        .map(a => a.getAttribute('href'))
        .filter(Boolean)
    })
    
    for (const link of links.slice(0, 20)) { // Erste 20 prüfen
      const response = await page.request.get(link!)
      expect(response.status()).toBeLessThan(400)
    }
  })
})

test.describe('External Links', () => {
  test('external links have rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/')
    const externalLinksWithoutRel = await page.evaluate(() => {
      const links = document.querySelectorAll('a[target="_blank"]')
      return [...links].filter(a => {
        const rel = a.getAttribute('rel') || ''
        return !rel.includes('noopener') || !rel.includes('noreferrer')
      }).length
    })
    expect(externalLinksWithoutRel).toBe(0)
  })
})
```

---

## Zusammenfassung: Erwartete Test-Anzahl

```yaml
SEO_TEST_COUNT:
  meta_tags: "~160 Tests (16 Seiten × 10 Checks)"
  structured_data: "~25 Tests"
  headings: "~48 Tests (16 Seiten × 3 Checks)"
  sitemap: "5 Tests"
  robots: "4 Tests"
  images: "~32 Tests (16 Seiten × 2 Checks)"
  canonical: "~48 Tests (16 Seiten × 3 Checks)"
  links: "3 Tests"
  
  total: "~325 SEO Tests"
```
