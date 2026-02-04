# Phase 8: Automatisierte Test-Suite (85% Coverage)

> **Dauer:** ~30 Minuten
> **Input:** Vollständig SEO-optimierte Website
> **Output:** Test-Suite mit ≥85% Coverage, Lighthouse CI
> **Abhängigkeiten:** Phase 7 (SEO abgeschlossen)

---

## Vor dem Start: Test-Module laden

```yaml
PFLICHT_LESEN:
  - tests/SEO_TESTS.md          # Playwright SEO Validierung
  - tests/UI_TESTS.md           # Playwright UI/UX Tests
  - tests/COVERAGE_CONFIG.md    # Coverage-Konfiguration
```

---

## Architektur der Test-Suite

```
tests/
├── e2e/                         ← Playwright E2E Tests
│   ├── homepage.spec.ts         ← Homepage Sektionen & Navigation
│   ├── services.spec.ts         ← Service-Seiten
│   ├── cities.spec.ts           ← Stadt-Seiten
│   ├── blog.spec.ts             ← Blog Übersicht & Artikel
│   ├── contact.spec.ts          ← Kontaktformular
│   ├── navigation.spec.ts       ← Header, Footer, Mobile Menu
│   └── responsive.spec.ts       ← Responsive Breakpoints
│
├── seo/                         ← Playwright SEO Tests
│   ├── meta-tags.spec.ts        ← Title, Description, OG, Twitter
│   ├── structured-data.spec.ts  ← JSON-LD Validierung
│   ├── sitemap.spec.ts          ← Sitemap Validierung
│   ├── robots.spec.ts           ← robots.txt Validierung
│   ├── headings.spec.ts         ← H1-H6 Hierarchie
│   ├── images.spec.ts           ← Alt-Tags, Lazy Loading
│   ├── links.spec.ts            ← Internal/External Links
│   └── canonical.spec.ts        ← Canonical URLs
│
├── unit/                        ← Vitest Unit Tests
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Card.test.tsx
│   │   ├── Badge.test.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── cities.test.ts
│   │   ├── blog.test.ts
│   │   └── schema.test.ts
│   └── utils/
│       └── formatters.test.ts
│
├── playwright.config.ts         ← Playwright Konfiguration
└── vitest.config.ts             ← Vitest Konfiguration
```

---

## 8.1 Playwright Konfiguration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

---

## 8.2 Vitest Konfiguration (Unit Tests + Coverage)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
        'src/data/**/*.{ts,tsx}',
      ],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/app/**/*.tsx',    // Pages werden per E2E getestet
      ],
      thresholds: {
        global: {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Test Setup

```typescript
// tests/setup.ts
import '@testing-library/jest-dom'
```

---

## 8.3 E2E Tests implementieren

### Homepage E2E

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

  test('has at least 15 sections visible', async ({ page }) => {
    const sections = page.locator('section')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(15)
  })

  test('FAQ accordion works', async ({ page }) => {
    const faqSection = page.locator('[data-testid="faq-section"]')
    await faqSection.scrollIntoViewIfNeeded()
    
    const firstItem = faqSection.locator('[data-testid="faq-item-0"] button')
    await firstItem.click()
    
    const answer = faqSection.locator('[data-testid="faq-answer-0"]')
    await expect(answer).toBeVisible()
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
    await page.waitForTimeout(1000) // Animation abwarten
    
    const counter = stats.locator('[data-testid="stat-0"] .counter-value')
    const text = await counter.textContent()
    expect(text).not.toBe('0')
  })

  test('no horizontal scrollbar', async ({ page }) => {
    const hasHScroll = await page.evaluate(() => 
      document.body.scrollWidth > window.innerWidth
    )
    expect(hasHScroll).toBe(false)
  })
})
```

### Navigation E2E

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('header is sticky on scroll', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(300)
    
    const header = page.locator('header')
    const isVisible = await header.isVisible()
    expect(isVisible).toBe(true)
    
    const position = await header.evaluate(el => 
      getComputedStyle(el).position
    )
    expect(position).toBe('sticky')
  })

  test('all nav links work', async ({ page }) => {
    await page.goto('/')
    
    const links = [
      { text: 'Leistungen', url: '/leistungen' },
      { text: 'Über Uns', url: '/ueber-uns' },
      { text: 'Blog', url: '/blog' },
      { text: 'Kontakt', url: '/kontakt' },
    ]
    
    for (const link of links) {
      await page.goto('/')
      const navLink = page.locator(`nav a:has-text("${link.text}")`)
      await navLink.click()
      await page.waitForURL(`**${link.url}*`)
      expect(page.url()).toContain(link.url)
    }
  })

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')
    
    const menuButton = page.locator('[data-testid="mobile-menu-button"]')
    await expect(menuButton).toBeVisible()
    
    await menuButton.click()
    const menu = page.locator('[data-testid="mobile-menu"]')
    await expect(menu).toBeVisible()
    
    // Close
    const closeButton = page.locator('[data-testid="mobile-menu-close"]')
    await closeButton.click()
    await expect(menu).not.toBeVisible()
  })
})
```

### Stadt-Seiten E2E

```typescript
// tests/e2e/cities.spec.ts
import { test, expect } from '@playwright/test'

const cities = ['berlin', 'muenchen', 'hamburg', 'frankfurt', 'koeln']

for (const city of cities) {
  test.describe(`Stadt-Seite: ${city}`, () => {
    test(`loads /ki-agentur-${city} successfully`, async ({ page }) => {
      const response = await page.goto(`/ki-agentur-${city}`)
      expect(response?.status()).toBe(200)
    })

    test(`has city-specific H1`, async ({ page }) => {
      await page.goto(`/ki-agentur-${city}`)
      const h1 = await page.locator('h1').textContent()
      expect(h1?.toLowerCase()).toContain(city.replace('ue', 'ü').replace('ae', 'ä'))
    })

    test(`has LocalBusiness schema`, async ({ page }) => {
      await page.goto(`/ki-agentur-${city}`)
      const schemas = await page.locator('script[type="application/ld+json"]').all()
      const contents = await Promise.all(schemas.map(s => s.textContent()))
      const hasLocalBusiness = contents.some(c => c?.includes('LocalBusiness') || c?.includes('ProfessionalService'))
      expect(hasLocalBusiness).toBe(true)
    })
  })
}
```

---

## 8.4 SEO Tests implementieren

> Vollständige Referenz: `tests/SEO_TESTS.md`

```typescript
// tests/seo/meta-tags.spec.ts
import { test, expect } from '@playwright/test'

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/leistungen', name: 'Leistungen' },
  { path: '/leistungen/ki-beratung', name: 'KI-Beratung' },
  { path: '/ueber-uns', name: 'Über Uns' },
  { path: '/blog', name: 'Blog' },
  { path: '/kontakt', name: 'Kontakt' },
  { path: '/ki-agentur-berlin', name: 'Berlin' },
]

for (const p of pages) {
  test.describe(`SEO: ${p.name}`, () => {
    test('has valid title (30-65 chars)', async ({ page }) => {
      await page.goto(p.path)
      const title = await page.title()
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

    test('has exactly one H1', async ({ page }) => {
      await page.goto(p.path)
      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)
    })

    test('has canonical URL', async ({ page }) => {
      await page.goto(p.path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBeTruthy()
      expect(canonical).toMatch(/^https:\/\//)
    })

    test('has OG tags', async ({ page }) => {
      await page.goto(p.path)
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content')
      expect(ogTitle).toBeTruthy()
      expect(ogDesc).toBeTruthy()
    })

    test('all images have alt attributes', async ({ page }) => {
      await page.goto(p.path)
      const noAlt = await page.locator('img:not([alt]), img[alt=""]').count()
      expect(noAlt).toBe(0)
    })

    test('has structured data', async ({ page }) => {
      await page.goto(p.path)
      const schemas = await page.locator('script[type="application/ld+json"]').count()
      expect(schemas).toBeGreaterThan(0)
    })
  })
}
```

---

## 8.5 Unit Tests implementieren

```typescript
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies primary variant styles', () => {
    render(<Button variant="primary">Primary</Button>)
    const btn = screen.getByText('Primary')
    expect(btn.className).toContain('bg-gold')
  })

  it('handles click events', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders as disabled', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })
})

// tests/unit/lib/cities.test.ts
import { getCityData, getAllCities } from '@/data/cities'

describe('Cities Data', () => {
  it('returns 20 cities', () => {
    const cities = getAllCities()
    expect(cities).toHaveLength(20)
  })

  it('returns correct data for Berlin', () => {
    const berlin = getCityData('berlin')
    expect(berlin).toBeTruthy()
    expect(berlin?.name).toBe('Berlin')
    expect(berlin?.region).toBe('Berlin')
  })

  it('returns null for unknown city', () => {
    const unknown = getCityData('unknown-city')
    expect(unknown).toBeNull()
  })

  it('each city has required fields', () => {
    const cities = getAllCities()
    for (const city of cities) {
      expect(city.slug).toBeTruthy()
      expect(city.name).toBeTruthy()
      expect(city.region).toBeTruthy()
      expect(city.lat).toBeTypeOf('number')
      expect(city.lng).toBeTypeOf('number')
    }
  })
})
```

---

## 8.6 Tests ausführen

### Alle Tests

```bash
# E2E Tests (Playwright)
npx playwright test

# Unit Tests mit Coverage (Vitest)
npx vitest run --coverage

# Nur SEO Tests
npx playwright test tests/seo/
```

### Coverage prüfen

```bash
npx vitest run --coverage

# Output:
# ─────────────┬──────────┬──────────┬──────────┬──────────
# File         │ % Stmts  │ % Branch │ % Funcs  │ % Lines
# ─────────────┼──────────┼──────────┼──────────┼──────────
# All files    │   85.xx  │   80.xx  │   85.xx  │   85.xx
# ─────────────┴──────────┴──────────┴──────────┴──────────
```

---

## 8.7 Lighthouse CI Setup

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        '{{VERCEL_URL}}/',
        '{{VERCEL_URL}}/leistungen',
        '{{VERCEL_URL}}/ki-agentur-berlin',
        '{{VERCEL_URL}}/kontakt',
      ],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 1.0 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-results',
    },
  },
}
```

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test & Lighthouse

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      
      # Unit Tests mit Coverage
      - run: npx vitest run --coverage
      - name: Check Coverage
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 85" | bc -l) )); then
            echo "Coverage below 85%!" && exit 1
          fi
      
      # E2E Tests
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
      
      # Lighthouse
      - run: npm install -g @lhci/cli
      - run: npm run build
      - run: lhci autorun
```

---

## 8.8 package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:seo": "playwright test tests/seo/",
    "test:ui": "playwright test tests/e2e/",
    "test:all": "vitest run --coverage && playwright test",
    "lighthouse": "lhci autorun"
  }
}
```

---

## Erfolgskriterien Phase 8

- [ ] Unit Test Coverage ≥ 85% (Statements, Functions, Lines)
- [ ] Alle E2E Tests bestanden (Desktop, Mobile, Tablet)
- [ ] Alle SEO Tests bestanden
- [ ] Lighthouse CI: Perf ≥90, A11y ≥95, BP 100, SEO ≥95
- [ ] GitHub Actions Workflow konfiguriert
- [ ] 0 Test Failures

---

## Final Commit

```bash
git add .
git commit -m "test: automated test suite with 85%+ coverage

- Playwright E2E: Homepage, Navigation, Services, Cities, Blog, Contact
- Playwright SEO: Meta Tags, Structured Data, Sitemap, Headings, Links
- Vitest Unit: Components, Lib, Utils
- Coverage: 85%+ (statements, functions, lines)
- Lighthouse CI: Performance ≥90, A11y ≥95, BP 100, SEO ≥95
- GitHub Actions Workflow

Co-Authored-By: Claude Code <noreply@anthropic.com>"

git push
npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT
```

> **🏁 DONE — Website ist live, getestet und SEO-optimiert!**
