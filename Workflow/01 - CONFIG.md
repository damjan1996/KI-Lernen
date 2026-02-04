# ⚙️ Projekt-Konfiguration

> **DIESE DATEI ZUERST ANPASSEN!**
> Alle anderen Module referenzieren die Variablen aus dieser Datei.
> Claude Code liest diese Datei zu Beginn und ersetzt alle `{{VARIABLE}}` Platzhalter.

---

## 🔑 Credentials & Tokens (Klartext)

> **WARNUNG:** Diese Tokens sind Test-Tokens und werden nach der Session revoked.

```yaml
VERCEL:
  token: "TexLoDHoBrhOrJX2nmVWwRMT"
  team: null  # Personal Account
  command: "npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT"

GITHUB:
  user: "damjan1996"
  auth: "bereits via gh auth login authentifiziert"
  visibility: "private"

PAGESPEED_INSIGHTS:
  api_key: null  # Kein API-Key noetig fuer oeffentliche Abfragen
  fallback_url: "https://pagespeed.web.dev/analysis?url="
```

---

## 🌐 Projekt-Variablen

> **ANLEITUNG:** Vor dem Start eines neuen Projekts diese Werte anpassen.
> Claude Code wird beim Start gefragt:
> 1. Wie heißt die Website / das Unternehmen?
> 2. Unter welcher Domain wird gehostet?
> 3. Was ist das Hauptkeyword?

```yaml
# ═══════════════════════════════════════════════════════════════
# PROJEKT-IDENTITÄT — Vor jedem Projekt anpassen!
# ═══════════════════════════════════════════════════════════════

PROJECT:
  name: "{{PROJECT_NAME}}"              # z.B. "Everlast KI Agentur"
  slug: "{{PROJECT_SLUG}}"              # z.B. "everlast-ki-agentur"
  description: "{{PROJECT_DESC}}"       # Kurzbeschreibung für Meta-Tags

DOMAIN:
  primary: "{{DOMAIN}}"                 # z.B. "ki-agentur-everlast.de"
  url: "https://{{DOMAIN}}"             # Vollständige URL mit Protokoll
  tld: "{{TLD}}"                        # z.B. "de", "com", "ai"

COMPANY:
  name: "Everlast Consulting GmbH"
  legal_name: "Everlast Consulting GmbH"
  address_street: "{{STREET}}"
  address_city: "{{CITY}}"
  address_zip: "{{ZIP}}"
  address_country: "DE"
  phone: "{{PHONE}}"
  email: "{{EMAIL}}"
  founding_year: "{{YEAR}}"
  ceo: "{{CEO_NAME}}"

SEO:
  primary_keyword: "{{PRIMARY_KEYWORD}}"       # z.B. "KI Agentur"
  secondary_keywords:                          # Wird in PHASE 7 erweitert
    - "{{SECONDARY_KW_1}}"
    - "{{SECONDARY_KW_2}}"
    - "{{SECONDARY_KW_3}}"
  target_market: "de"                          # Sprachmarkt
  target_locale: "de_DE"                       # OpenGraph Locale
```

---

## 📁 Pfade & Verzeichnisse

```yaml
PATHS:
  working_dir: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\website"
  design_system: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen"
  reference_design: "C:\\Users\\damja\\Desktop\\NexArQ\\portfolio.pen"
  reference_node_id: "O65sj"

  # Everlast-Referenzprojekte (für Branding/Struktur)
  ref_karriereseite: "C:\\Users\\damja\\WebstormProjects\\Everlast\\Karriereseite"
  ref_ki_beratung: "C:\\Users\\damja\\WebstormProjects\\Everlast\\KIBeratung"
  ref_carpantier: "C:\\Users\\damja\\WebstormProjects\\Nico Luca Carpantier"
```

---

## 🎨 Everlast Branding Defaults

> Diese Werte werden verwendet, wenn das Projekt im Everlast-Branding erstellt wird.
> Siehe `templates/BRANDING_EVERLAST.md` für das vollständige Design System.

```yaml
BRANDING:
  preset: "everlast"    # "everlast" | "custom"
  
  # Wird aus templates/BRANDING_EVERLAST.md geladen wenn preset=everlast
  # Bei preset=custom hier eigene Werte eintragen:
  custom_colors:
    background: "#0A0A0A"
    surface: "#141414"
    primary: "#C9A962"
    text_primary: "#FAF8F5"
    text_secondary: "#888888"
  
  custom_fonts:
    display: "Playfair Display"
    body: "Inter"
    mono: "JetBrains Mono"
```

---

## 🎯 Quality Gates (Mindestanforderungen)

```yaml
QUALITY_GATES:
  pagespeed:
    performance: 90
    accessibility: 95
    best_practices: 100
    seo: 95
  
  testing:
    coverage_minimum: 85          # Prozent
    e2e_pass_rate: 100            # Alle E2E Tests müssen bestehen
    seo_audit_pass: true          # SEO Audit muss bestehen
  
  deployment:
    max_retry_cycles: 10          # Max Vercel Re-Deploy Versuche
    build_must_succeed: true
    zero_console_errors: true
    zero_404_errors: true
```

---

## 📋 Modul-Referenz

> Claude Code liest diese Reihenfolge und arbeitet die Phasen sequentiell ab.

```yaml
WORKFLOW_MODULES:
  - path: "phases/PHASE_0_DESIGN_SYSTEM.md"
    name: "Design System Generierung"
    required: true
    
  - path: "phases/PHASE_1_SETUP.md"
    name: "Setup & Scaffolding"
    required: true
    
  - path: "phases/PHASE_2_CORE_DEV.md"
    name: "Core Development"
    required: true
    depends_on: ["templates/SITE_STRUCTURE.md", "templates/HOMEPAGE_SECTIONS.md", "seo/TECHNICAL_SEO.md"]
    
  - path: "phases/PHASE_2B_UI_TESTING.md"
    name: "UI/UX Component Testing"
    required: true
    
  - path: "phases/PHASE_3_GITHUB.md"
    name: "GitHub Repository"
    required: true
    
  - path: "phases/PHASE_4_VERCEL.md"
    name: "Vercel Deployment"
    required: true
    
  - path: "phases/PHASE_5_PLAYWRIGHT_LIVE.md"
    name: "Playwright Live Testing"
    required: true
    
  - path: "phases/PHASE_6_PAGESPEED.md"
    name: "PageSpeed Validation"
    required: true
    
  - path: "phases/PHASE_7_SEO.md"
    name: "SEO Deep Optimization"
    required: true
    depends_on: ["seo/KEYWORD_STRATEGY.md", "seo/SCHEMA_TEMPLATES.md", "seo/CITY_PAGES.md", "seo/CONTENT_ARCHITECTURE.md", "seo/TECHNICAL_SEO.md"]
    
  - path: "phases/PHASE_8_TEST_SUITE.md"
    name: "Automated Test Suite (85% Coverage)"
    required: true
    depends_on: ["tests/SEO_TESTS.md", "tests/UI_TESTS.md", "tests/COVERAGE_CONFIG.md"]
```
