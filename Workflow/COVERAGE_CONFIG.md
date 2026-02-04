# Test-Modul: Coverage Konfiguration

> **Referenziert von:** Phase 8 (Test Suite)
> **Ziel:** V8 Coverage ≥ 85% mit klar definierten Schwellenwerten

---

## Coverage-Strategie

```yaml
STRATEGY:
  tool: "Vitest + @vitest/coverage-v8"
  target: "85% global (Statements, Functions, Lines)"
  branches_target: "80% (realistisch für React-Komponenten)"
  
  approach: |
    Unit Tests (Vitest) → Coverage für Komponenten, Lib, Utils
    E2E Tests (Playwright) → Kein Coverage, nur Funktionalität
    SEO Tests (Playwright) → Kein Coverage, nur Validierung
    
  rationale: |
    Pages (src/app/**) werden NICHT per Unit Test getestet —
    sie werden per E2E (Playwright) abgedeckt.
    Coverage fokussiert auf wiederverwendbare Komponenten und Logik.
```

---

## Vitest Coverage Konfiguration

```typescript
// vitest.config.ts — Coverage-Sektion
{
  test: {
    coverage: {
      provider: 'v8',
      
      // Reporter
      reporter: [
        'text',              // Terminal-Output
        'text-summary',      // Zusammenfassung
        'html',              // HTML-Report (./coverage/)
        'lcov',              // Für CI-Integration
        'json-summary',      // Maschinenlesbar für CI-Checks
      ],
      
      reportsDirectory: './coverage',
      
      // Was wird gemessen
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/lib/**/*.{ts,tsx}',
        'src/data/**/*.{ts,tsx}',
      ],
      
      // Was wird NICHT gemessen
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.spec.ts',
        'src/**/*.test.ts',
        'src/**/*.stories.ts',
        'src/app/**/*.tsx',       // Pages → E2E Tests
        'src/app/**/*.ts',        // API Routes → Integration Tests
        'src/types/**/*',         // Nur Type-Definitionen
      ],
      
      // Schwellenwerte (CI schlägt fehl wenn unterschritten)
      thresholds: {
        global: {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85,
        },
        // Per-File Thresholds (strenger für kritische Dateien)
        'src/components/seo/**': {
          statements: 90,
          branches: 85,
          functions: 90,
          lines: 90,
        },
        'src/data/**': {
          statements: 95,
          branches: 90,
          functions: 95,
          lines: 95,
        },
      },
    },
  },
}
```

---

## Was muss getestet werden (Coverage Targets)

### Komponenten (src/components/)

```yaml
COMPONENTS_COVERAGE:
  # UI Komponenten — Target: 85%+
  ui/Button.tsx:
    tests:
      - "Renders correctly"
      - "Primary/Secondary/Ghost variants"
      - "Handles onClick"
      - "Disabled state"
      - "Loading state (wenn vorhanden)"
      
  ui/Card.tsx:
    tests:
      - "Renders children"
      - "Applies className"
      - "GlassCard variant"
      
  ui/Badge.tsx:
    tests:
      - "Renders text"
      - "Shows icon when provided"
      
  ui/Input.tsx:
    tests:
      - "Renders with label"
      - "Handles onChange"
      - "Shows error state"
      - "Disabled state"
      
  ui/AnimatedCounter.tsx:
    tests:
      - "Renders final value"
      - "Accepts suffix"
      
  ui/SectionWrapper.tsx:
    tests:
      - "Renders children with correct padding"
      - "Applies data-testid"
      
  # SEO Komponenten — Target: 90%+
  seo/JsonLd.tsx:
    tests:
      - "Renders script tag with type application/ld+json"
      - "Outputs valid JSON"
      - "Handles array of schemas"
      
  seo/OrganizationSchema.tsx:
    tests:
      - "Renders Organization schema"
      - "Contains required fields (name, url)"
      
  seo/LocalBusinessSchema.tsx:
    tests:
      - "Renders with city data"
      - "Contains geo coordinates"
      - "Contains address"
      
  seo/ServiceSchema.tsx:
    tests:
      - "Renders Service type"
      - "Contains provider info"
      
  seo/FAQSchema.tsx:
    tests:
      - "Renders FAQPage type"
      - "Contains questions and answers"
      
  seo/BreadcrumbSchema.tsx:
    tests:
      - "Renders BreadcrumbList"
      - "Items have correct position"
      
  seo/ArticleSchema.tsx:
    tests:
      - "Renders Article type"
      - "Contains required fields"

  # Layout Komponenten — Target: 85%+
  layout/Breadcrumb.tsx:
    tests:
      - "Renders breadcrumb items"
      - "Last item is not a link"
      - "Home link present"
```

### Daten (src/data/)

```yaml
DATA_COVERAGE:
  # Target: 95%+
  data/cities.ts:
    tests:
      - "getAllCities returns 20 cities"
      - "getCityData returns correct city"
      - "getCityData returns null for unknown"
      - "Each city has required fields"
      - "Slugs are valid (lowercase, no umlauts)"
      - "Coordinates are valid numbers"
      - "Priority values are valid"
      
  data/blog.ts:
    tests:
      - "getAllBlogSlugs returns array"
      - "getBlogPost returns post by slug"
      - "getBlogPost returns null for unknown"
      - "Posts have required fields (title, slug, excerpt)"
      
  data/services.ts:
    tests:
      - "getAllServices returns 6 services"
      - "Each service has slug, title, description"
```

### Lib/Utils (src/lib/)

```yaml
LIB_COVERAGE:
  # Target: 90%+
  lib/utils.ts:
    tests:
      - "cn() merges classNames correctly"
      - "formatDate() returns German date format"
      - "slugify() creates valid slugs"
      - "truncate() respects max length"
      
  lib/schema.ts:
    tests:
      - "generateOrganizationSchema returns valid object"
      - "generateLocalBusinessSchema includes city data"
      - "generateFAQSchema formats questions correctly"
      - "generateBreadcrumbSchema creates ordered items"
```

---

## Test Setup

```typescript
// tests/setup.ts
import '@testing-library/jest-dom'

// Mock für next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock für next/link
vi.mock('next/link', () => ({
  default: ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>
  },
}))

// Mock für framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
}))
```

---

## CI Coverage Check

```yaml
# In GitHub Actions (.github/workflows/test.yml)
- name: Run Unit Tests with Coverage
  run: npx vitest run --coverage

- name: Check Coverage Threshold
  run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
    echo "Line Coverage: $COVERAGE%"
    
    STATEMENTS=$(cat coverage/coverage-summary.json | jq '.total.statements.pct')
    FUNCTIONS=$(cat coverage/coverage-summary.json | jq '.total.functions.pct')
    BRANCHES=$(cat coverage/coverage-summary.json | jq '.total.branches.pct')
    
    echo "Statements: $STATEMENTS%"
    echo "Functions: $FUNCTIONS%"
    echo "Branches: $BRANCHES%"
    
    # Threshold Check
    if (( $(echo "$COVERAGE < 85" | bc -l) )); then
      echo "❌ Line coverage $COVERAGE% is below 85% threshold!"
      exit 1
    fi
    
    if (( $(echo "$STATEMENTS < 85" | bc -l) )); then
      echo "❌ Statement coverage $STATEMENTS% is below 85% threshold!"
      exit 1
    fi
    
    echo "✅ All coverage thresholds met!"
```

---

## package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:coverage:open": "vitest run --coverage && open coverage/index.html",
    "test:e2e": "playwright test",
    "test:seo": "playwright test tests/seo/",
    "test:ui": "playwright test tests/e2e/",
    "test:all": "vitest run --coverage && playwright test",
    "coverage:check": "node -e \"const c=require('./coverage/coverage-summary.json').total; const ok=c.lines.pct>=85&&c.statements.pct>=85&&c.functions.pct>=85; console.log(ok?'✅ Coverage OK':'❌ Coverage below threshold'); process.exit(ok?0:1)\""
  }
}
```

---

## Coverage Bericht Beispiel

```
───────────────────────┬──────────┬──────────┬──────────┬──────────
File                   │ % Stmts  │ % Branch │ % Funcs  │ % Lines
───────────────────────┼──────────┼──────────┼──────────┼──────────
All files              │   87.32  │   82.15  │   86.90  │   87.45
 components/ui/        │   88.00  │   83.50  │   88.00  │   88.50
  Button.tsx           │   95.00  │   90.00  │   100.00 │   95.00
  Card.tsx             │   85.00  │   80.00  │   85.00  │   85.00
  Badge.tsx            │   90.00  │   85.00  │   90.00  │   90.00
  ...                  │          │          │          │
 components/seo/       │   92.00  │   88.00  │   92.00  │   92.00
  JsonLd.tsx           │   100.00 │   100.00 │   100.00 │   100.00
  OrganizationSchema   │   90.00  │   85.00  │   90.00  │   90.00
  ...                  │          │          │          │
 data/                 │   96.00  │   92.00  │   96.00  │   96.00
  cities.ts            │   98.00  │   95.00  │   98.00  │   98.00
  blog.ts              │   94.00  │   90.00  │   94.00  │   94.00
 lib/                  │   90.00  │   85.00  │   90.00  │   90.00
  utils.ts             │   92.00  │   88.00  │   92.00  │   92.00
  schema.ts            │   88.00  │   82.00  │   88.00  │   88.00
───────────────────────┴──────────┴──────────┴──────────┴──────────

✅ All coverage thresholds met!
  Statements: 87.32% (≥85%)
  Branches:   82.15% (≥80%)
  Functions:  86.90% (≥85%)
  Lines:      87.45% (≥85%)
```
