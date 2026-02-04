# Test-Modul: UI/UX Tests (Playwright)

> **Referenziert von:** Phase 8 (Test Suite)
> **Ziel:** Automatisierte UI/UX-Validierung: Responsive, Animationen, Interaktionen

---

## Übersicht der UI Test-Dateien

```
tests/e2e/
├── homepage.spec.ts         ← Homepage Sektionen & Navigation
├── services.spec.ts         ← Service-Seiten
├── cities.spec.ts           ← Stadt-Seiten
├── blog.spec.ts             ← Blog Übersicht & Artikel
├── contact.spec.ts          ← Kontaktformular
├── navigation.spec.ts       ← Header, Footer, Mobile Menu
└── responsive.spec.ts       ← Responsive Breakpoints
```

---

## homepage.spec.ts

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('renders hero section with H1 and CTA', async ({ page }) => {
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    await expect(h1).toContainText(/KI/)
    
    const cta = page.locator('[data-testid="hero-cta-primary"]')
    await expect(cta).toBeVisible()
  })

  test('has at least 15 visible sections', async ({ page }) => {
    const sections = page.locator('section')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(15)
  })

  test('FAQ accordion opens and closes', async ({ page }) => {
    const faqSection = page.locator('[data-testid="faq-section"]')
    await faqSection.scrollIntoViewIfNeeded()
    
    // Öffnen
    const firstItem = faqSection.locator('[data-testid="faq-item-0"] button')
    await firstItem.click()
    const answer = faqSection.locator('[data-testid="faq-answer-0"]')
    await expect(answer).toBeVisible()
    
    // Anderes Item öffnen (erstes sollte schließen)
    const secondItem = faqSection.locator('[data-testid="faq-item-1"] button')
    await secondItem.click()
    await expect(answer).not.toBeVisible()
  })

  test('services grid has 6 items', async ({ page }) => {
    const grid = page.locator('[data-testid="services-grid"]')
    await grid.scrollIntoViewIfNeeded()
    const cards = grid.locator('[data-testid^="service-card-"]')
    await expect(cards).toHaveCount(6)
  })

  test('stats section shows animated counters', async ({ page }) => {
    const stats = page.locator('[data-testid="stats-section"]')
    await stats.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)  // Animation abwarten
    
    const counter = stats.locator('[data-testid="stat-0"]')
    const text = await counter.textContent()
    expect(text).not.toContain('0')
  })

  test('service cards link to correct pages', async ({ page }) => {
    const firstCard = page.locator('[data-testid="service-card-0"] a, [data-testid="service-card-0"]')
    const href = await firstCard.getAttribute('href')
    expect(href).toContain('/leistungen/')
  })

  test('no horizontal scrollbar', async ({ page }) => {
    const hasHScroll = await page.evaluate(() =>
      document.body.scrollWidth > window.innerWidth
    )
    expect(hasHScroll).toBe(false)
  })

  test('no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(errors).toHaveLength(0)
  })
})
```

---

## navigation.spec.ts

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Desktop Navigation', () => {
  test('header is sticky on scroll', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(300)
    
    const header = page.locator('header')
    await expect(header).toBeVisible()
    
    const position = await header.evaluate(el =>
      getComputedStyle(el).position
    )
    expect(position).toBe('sticky')
  })

  test('all nav links navigate correctly', async ({ page }) => {
    const navLinks = [
      { text: 'Leistungen', url: '/leistungen' },
      { text: 'Über Uns', url: '/ueber-uns' },
      { text: 'Blog', url: '/blog' },
      { text: 'Kontakt', url: '/kontakt' },
    ]
    
    for (const link of navLinks) {
      await page.goto('/')
      const navLink = page.locator(`nav a:has-text("${link.text}")`)
      await navLink.click()
      await page.waitForURL(`**${link.url}*`)
      expect(page.url()).toContain(link.url)
    }
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/kontakt')
    const logo = page.locator('header a[href="/"]').first()
    await logo.click()
    await page.waitForURL('**/')
    expect(page.url()).toMatch(/\/$/)
  })
})

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator('[data-testid="mobile-menu-button"]')
    await expect(menuButton).toBeVisible()
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.goto('/')
    
    // Öffnen
    await page.locator('[data-testid="mobile-menu-button"]').click()
    const menu = page.locator('[data-testid="mobile-menu"]')
    await expect(menu).toBeVisible()
    
    // Schließen
    const closeButton = page.locator('[data-testid="mobile-menu-close"]')
    await closeButton.click()
    await expect(menu).not.toBeVisible()
  })

  test('mobile menu links work', async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-testid="mobile-menu-button"]').click()
    
    const leistungenLink = page.locator('[data-testid="mobile-menu"] a:has-text("Leistungen")')
    await leistungenLink.click()
    
    await page.waitForURL('**/leistungen*')
    expect(page.url()).toContain('/leistungen')
  })
})

test.describe('Footer', () => {
  test('footer has all required sections', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    
    await expect(footer.locator('text=Leistungen').first()).toBeVisible()
    await expect(footer.locator('text=Impressum').first()).toBeVisible()
    await expect(footer.locator('text=Datenschutz').first()).toBeVisible()
  })

  test('footer links are functional', async ({ page }) => {
    await page.goto('/')
    const impressumLink = page.locator('footer a:has-text("Impressum")')
    await impressumLink.click()
    await page.waitForURL('**/impressum*')
    expect(page.url()).toContain('/impressum')
  })
})
```

---

## services.spec.ts

```typescript
// tests/e2e/services.spec.ts
import { test, expect } from '@playwright/test'

const services = [
  { slug: 'ki-beratung', name: 'KI-Beratung' },
  { slug: 'ki-automatisierung', name: 'KI-Automatisierung' },
  { slug: 'ki-workshop', name: 'KI-Workshop' },
  { slug: 'chatgpt-beratung', name: 'ChatGPT Beratung' },
  { slug: 'ki-implementierung', name: 'KI-Implementierung' },
  { slug: 'ki-strategie', name: 'KI-Strategie' },
]

for (const service of services) {
  test.describe(`Service: ${service.name}`, () => {
    test('page loads without errors', async ({ page }) => {
      const errors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text())
      })
      
      await page.goto(`/leistungen/${service.slug}`)
      await page.waitForLoadState('networkidle')
      expect(errors).toHaveLength(0)
    })

    test('has breadcrumb navigation', async ({ page }) => {
      await page.goto(`/leistungen/${service.slug}`)
      const breadcrumb = page.locator('[data-testid="breadcrumb"], nav[aria-label="Breadcrumb"]')
      await expect(breadcrumb).toBeVisible()
    })

    test('has CTA button linking to contact', async ({ page }) => {
      await page.goto(`/leistungen/${service.slug}`)
      const cta = page.locator('a[href="/kontakt"]').first()
      await expect(cta).toBeVisible()
    })

    test('returns 200 status', async ({ request }) => {
      const response = await request.get(`/leistungen/${service.slug}`)
      expect(response.status()).toBe(200)
    })
  })
}

test.describe('Service Overview', () => {
  test('lists all 6 services', async ({ page }) => {
    await page.goto('/leistungen')
    for (const service of services) {
      const link = page.locator(`a[href*="${service.slug}"]`).first()
      await expect(link).toBeVisible()
    }
  })
})
```

---

## cities.spec.ts

```typescript
// tests/e2e/cities.spec.ts
import { test, expect } from '@playwright/test'

const topCities = [
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'muenchen', name: 'München' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'frankfurt', name: 'Frankfurt' },
  { slug: 'koeln', name: 'Köln' },
]

for (const city of topCities) {
  test.describe(`City: ${city.name}`, () => {
    test('page loads successfully', async ({ request }) => {
      const response = await request.get(`/ki-agentur-${city.slug}`)
      expect(response.status()).toBe(200)
    })

    test('H1 contains city name', async ({ page }) => {
      await page.goto(`/ki-agentur-${city.slug}`)
      const h1 = await page.locator('h1').textContent()
      expect(h1).toContain(city.name)
    })

    test('has CTA for local consultation', async ({ page }) => {
      await page.goto(`/ki-agentur-${city.slug}`)
      const cta = page.locator('a[href="/kontakt"]').first()
      await expect(cta).toBeVisible()
    })

    test('has service links', async ({ page }) => {
      await page.goto(`/ki-agentur-${city.slug}`)
      const serviceLink = page.locator('a[href*="/leistungen/"]').first()
      await expect(serviceLink).toBeVisible()
    })
  })
}

test.describe('City pages existence', () => {
  const allCitySlugs = [
    'berlin', 'muenchen', 'hamburg', 'frankfurt', 'koeln',
    'stuttgart', 'duesseldorf', 'karlsruhe', 'leipzig', 'darmstadt',
    'dresden', 'nuernberg', 'hannover', 'heidelberg', 'dortmund',
    'essen', 'bremen', 'aachen', 'bonn', 'potsdam'
  ]

  test('all 20 city pages return 200', async ({ request }) => {
    for (const slug of allCitySlugs) {
      const response = await request.get(`/ki-agentur-${slug}`)
      expect(response.status(), `ki-agentur-${slug}`).toBe(200)
    }
  })
})
```

---

## contact.spec.ts

```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/kontakt')
    await page.waitForLoadState('networkidle')
  })

  test('has contact form', async ({ page }) => {
    const form = page.locator('form')
    await expect(form).toBeVisible()
  })

  test('form has required fields', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('form fields have labels', async ({ page }) => {
    const nameLabel = page.locator('label[for="name"]')
    const emailLabel = page.locator('label[for="email"]')
    await expect(nameLabel).toBeVisible()
    await expect(emailLabel).toBeVisible()
  })

  test('form fields have focus states', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]')
    await nameInput.focus()
    // Prüfe ob Focus-Styling angewendet wird
    const borderColor = await nameInput.evaluate(el =>
      getComputedStyle(el).borderColor
    )
    expect(borderColor).toBeTruthy()
  })

  test('form can be filled', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Test User')
    await page.locator('input[name="email"]').fill('test@example.com')
    await page.locator('textarea[name="message"]').fill('Testanfrage')
    
    // Prüfe ob Felder Werte haben
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User')
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com')
  })
})
```

---

## responsive.spec.ts

```typescript
// tests/e2e/responsive.spec.ts
import { test, expect } from '@playwright/test'

const breakpoints = [
  { name: 'Mobile SM', width: 320, height: 568 },
  { name: 'Mobile', width: 375, height: 812 },
  { name: 'Mobile LG', width: 428, height: 926 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Laptop', width: 1024, height: 768 },
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Widescreen', width: 1920, height: 1080 },
]

for (const bp of breakpoints) {
  test.describe(`Responsive: ${bp.name} (${bp.width}px)`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } })

    test('homepage loads without horizontal scroll', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      const hasHScroll = await page.evaluate(() =>
        document.body.scrollWidth > window.innerWidth
      )
      expect(hasHScroll).toBe(false)
    })

    test('no content overflow', async ({ page }) => {
      await page.goto('/')
      const overflow = await page.evaluate(() => {
        const body = document.body
        return {
          bodyWidth: body.scrollWidth,
          viewportWidth: window.innerWidth,
          diff: body.scrollWidth - window.innerWidth,
        }
      })
      expect(overflow.diff).toBeLessThanOrEqual(0)
    })

    test('text is readable (min 12px)', async ({ page }) => {
      await page.goto('/')
      const tooSmall = await page.evaluate(() => {
        const textElements = document.querySelectorAll('p, span, li, a, td, th')
        return [...textElements].filter(el => {
          const size = parseFloat(getComputedStyle(el).fontSize)
          return size < 12 && el.textContent?.trim().length! > 0
        }).length
      })
      expect(tooSmall).toBe(0)
    })
  })
}
```

---

## blog.spec.ts

```typescript
// tests/e2e/blog.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Blog Overview', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')
    expect(page.url()).toContain('/blog')
  })

  test('has article cards', async ({ page }) => {
    await page.goto('/blog')
    const articles = page.locator('article, [data-testid^="blog-card"]')
    const count = await articles.count()
    expect(count).toBeGreaterThan(0)
  })

  test('articles link to detail pages', async ({ page }) => {
    await page.goto('/blog')
    const firstArticleLink = page.locator('a[href^="/blog/"]').first()
    const href = await firstArticleLink.getAttribute('href')
    expect(href).toMatch(/^\/blog\/.+/)
  })
})
```

---

## Zusammenfassung: Erwartete Test-Anzahl

```yaml
UI_TEST_COUNT:
  homepage: "~10 Tests"
  navigation: "~8 Tests"
  services: "~28 Tests (6 Services × 4 + Overview)"
  cities: "~25 Tests (5 Top × 4 + All 20 existence)"
  contact: "~5 Tests"
  responsive: "~21 Tests (7 Breakpoints × 3)"
  blog: "~3 Tests"
  
  total: "~100 UI/UX Tests"
```
