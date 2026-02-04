# 🚀 MASTER WORKFLOW V6.0 — Fully Automated SEO Website Builder

> **Version:** 6.0.0
> **Modus:** 100% Automatisiert - Zero Manual Intervention
> **Erstellt:** Feb-03-2026
> **Basis:** Workflow V5.1 + SEO Deep Optimization + Modularisierung
> **Stack:** Next.js 16 · Tailwind CSS 3.4.17 · Vercel · Playwright · Everlast Branding

---

## 🎯 Mission Statement

Dieses Starter-Kit ermöglicht es, Claude Code eine einzige Anweisung zu geben:

```
"Erstelle eine SEO-optimierte Website unter der Domain [DOMAIN] 
 für [PROJEKTNAME] im Everlast-Branding."
```

Claude Code liest diese Datei, lädt die Konfiguration aus `CONFIG.md`, und arbeitet
alle Phasen vollautomatisch ab — vom Design System bis zur finalen Test-Suite mit 85% Coverage.

---

## 📋 Quick-Start für Claude Code

```markdown
ANWEISUNG AN CLAUDE CODE:

1. Lies zuerst CONFIG.md und ersetze alle {{VARIABLEN}}
2. Frage den User nach: Projektname, Domain, Hauptkeyword
3. Arbeite dann JEDE Phase in Reihenfolge ab
4. Lies zu jeder Phase die referenzierte .md-Datei VOLLSTÄNDIG
5. Überspringe keine Phase — jede ist required
6. Dokumentiere den Fortschritt in der Checklist unten
```

---

## 🗂️ Ordnerstruktur dieses Starter-Kits

```
starter-kit/
│
├── MASTER_WORKFLOW.md              ← DU BIST HIER (Orchestrierung)
├── CONFIG.md                       ← Credentials, Tokens, Variablen
│
├── phases/                         ← Workflow-Phasen (sequentiell)
│   ├── PHASE_0_DESIGN_SYSTEM.md    ← Pencil Design System generieren
│   ├── PHASE_1_SETUP.md            ← npm install, Scaffolding, Build
│   ├── PHASE_2_CORE_DEV.md         ← Next.js 16 + Tailwind 3.4.17 Development
│   ├── PHASE_2B_UI_TESTING.md      ← UI/UX Playwright Tests (Post-Dev)
│   ├── PHASE_3_GITHUB.md           ← Repository erstellen & pushen
│   ├── PHASE_4_VERCEL.md           ← Production Deployment
│   ├── PHASE_5_PLAYWRIGHT_LIVE.md  ← Live-Site Testing
│   ├── PHASE_6_PAGESPEED.md        ← PageSpeed Insights Validation
│   ├── PHASE_7_SEO.md              ← SEO Deep Optimization
│   └── PHASE_8_TEST_SUITE.md       ← Automatisierte Test-Suite (85%)
│
├── seo/                            ← SEO-Strategie Module
│   ├── KEYWORD_STRATEGY.md         ← Keyword-Cluster & Targeting
│   ├── SCHEMA_TEMPLATES.md         ← Schema.org JSON-LD Templates
│   ├── CITY_PAGES.md               ← Lokale SEO für 20 deutsche Städte
│   ├── CONTENT_ARCHITECTURE.md     ← Content-Silos, Pillar Pages, Blog
│   └── TECHNICAL_SEO.md            ← robots.txt, Sitemap, Canonical, etc.
│
├── templates/                      ← Wiederverwendbare Templates
│   ├── SITE_STRUCTURE.md           ← URL-Hierarchie & Seitenstruktur
│   ├── BRANDING_EVERLAST.md        ← Everlast Design Tokens & Branding
│   └── HOMEPAGE_SECTIONS.md        ← 20+ Homepage-Sektionen Definition
│
└── tests/                          ← Test-Spezifikationen
    ├── SEO_TESTS.md                ← Playwright SEO Validierung
    ├── UI_TESTS.md                 ← Playwright UI/UX Tests
    └── COVERAGE_CONFIG.md          ← Istanbul/V8 Coverage Konfiguration
```

---

## 🔄 Workflow Flowchart V6.0

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    WORKFLOW V6.0 - FULLY AUTOMATED SEO WEBSITE BUILDER           │
│                         Everlast Consulting Starter-Kit                           │
└─────────────────────────────────────────────────────────────────────────────────┘

    START ─── Claude Code liest CONFIG.md ──► Variablen ersetzen
                                                      │
      ┌───────────────────────────────────────────────┘
      │
      ▼
┌──────────────────────┐
│ PHASE 0              │ ← Pencil MCP: Design System vertikal aufbauen
│ Design System        │   Referenz: Node ID O65sj (Liquid Glass)
│ GENERIERUNG          │   Rechts: Website-Struktur abbilden
│                      │   Output: {{PROJECT_SLUG}}-design-system.pen
│ 📄 PHASE_0_DESIGN   │
│    _SYSTEM.md        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 1              │ ← npx create-next-app@latest + npm install
│ Setup &              │   Next.js 16 + Tailwind CSS 3.4.17
│ Scaffolding          │   npm run build validieren
│                      │   Working Dir: {{WORKING_DIR}}
│ 📄 PHASE_1_SETUP.md │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐     ┌────────────────────────────┐
│ PHASE 2              │ ──► │ REFERENZ-MODULE:            │
│ Core Development     │     │ · templates/SITE_STRUCTURE  │
│                      │     │ · templates/HOMEPAGE_SECTIONS│
│ Next.js 16 +         │     │ · templates/BRANDING_EVERLAST│
│ Tailwind CSS 3.4.17  │     │ · seo/TECHNICAL_SEO         │
│ Design Tokens        │     │ · seo/SCHEMA_TEMPLATES      │
│ Alle Seiten bauen    │     └────────────────────────────┘
│                      │
│ 📄 PHASE_2_CORE     │
│    _DEV.md           │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 2B             │ ← Playwright MCP: Alle UI/UX Elemente testen
│ UI/UX Component      │   Animationen, Hover, Interaktionen
│ Testing              │   Bugs fixen BEVOR Deployment
│                      │
│ 📄 PHASE_2B_UI      │
│    _TESTING.md       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 3              │ ← gh repo create {{PROJECT_SLUG}} --private --source=. --push
│ GitHub Repository    │   User: damjan1996
│                      │
│ 📄 PHASE_3_GITHUB.md│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 4              │ ← npx vercel --prod --yes --token={{VERCEL_TOKEN}}
│ Vercel Deployment    │   KEIN LOGIN — Token direkt verwenden!
│                      │   Custom Domain konfigurieren
│ 📄 PHASE_4_VERCEL.md│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 5              │ ← Playwright MCP Tests auf Live-URL
│ Playwright           │   Focus: Header, 404s, Mobile, Console Errors
│ Live Testing         │   Screenshots: Desktop + Mobile
│                      │
│ 📄 PHASE_5_PLAY     │
│    WRIGHT_LIVE.md    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PHASE 6              │ ← WebFetch auf pagespeed.web.dev
│ PageSpeed Insights   │   Ziel: Perf ≥90, A11y ≥95, BP 100, SEO ≥95
│ Validation           │
│ 📄 PHASE_6_PAGE     │
│    SPEED.md          │
└──────────┬───────────┘
           │
           ▼
      ┌────────────┐
      │ Score OK?  │──── YES ────┐
      └────────────┘             │
           │ NO                  │
           ▼                     │
┌──────────────────────┐         │
│ FIX & RETRY          │         │
│ (max 10x)            │         │
│ Automatisch fixen,   │         │
│ commit, push,        │         │
│ re-deploy            │         │
│ Zurück zu Phase 4    │         │
└──────────────────────┘         │
                                 │
      ┌──────────────────────────┘
      │
      ▼
┌──────────────────────┐     ┌────────────────────────────┐
│ PHASE 7              │ ──► │ SEO-MODULE:                 │
│ SEO Deep             │     │ · seo/KEYWORD_STRATEGY      │
│ Optimization         │     │ · seo/SCHEMA_TEMPLATES      │
│                      │     │ · seo/CITY_PAGES            │
│ Keyword-Recherche    │     │ · seo/CONTENT_ARCHITECTURE  │
│ Schema Markup        │     │ · seo/TECHNICAL_SEO         │
│ Stadt-Seiten         │     └────────────────────────────┘
│ Content-Silos        │
│ Internal Linking     │
│                      │
│ 📄 PHASE_7_SEO.md   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐     ┌────────────────────────────┐
│ PHASE 8              │ ──► │ TEST-MODULE:                │
│ Automated            │     │ · tests/SEO_TESTS           │
│ Test Suite           │     │ · tests/UI_TESTS            │
│                      │     │ · tests/COVERAGE_CONFIG      │
│ Ziel: 85% Coverage   │     └────────────────────────────┘
│ E2E + Unit + SEO     │
│ Lighthouse CI        │
│                      │
│ 📄 PHASE_8_TEST     │
│    _SUITE.md         │
└──────────┬───────────┘
           │
           ▼
      ┌────────────┐
      │  Coverage  │──── YES ────► ✅ DONE — Website ist live,
      │   ≥ 85%?   │              getestet und SEO-optimiert
      └────────────┘
           │ NO
           ▼
      Fix Tests, zurück zu Phase 8
```

---

## ✅ Master-Checklist

> Claude Code hakt diese Liste ab während er die Phasen durcharbeitet.

```markdown
## Fortschritt

- [ ] CONFIG.md gelesen und Variablen ersetzt
- [ ] Phase 0: Design System in .pen GENERIERT (vertikal, mit Website-Struktur rechts)
- [ ] Phase 1: npm run build erfolgreich
- [ ] Phase 2: Alle Seiten implementiert (Homepage, Leistungen, Blog, Städte, Kontakt, Über Uns)
- [ ] Phase 2B: UI/UX Playwright Tests bestanden (Animationen, Hover, Mobile)
- [ ] Phase 3: GitHub Repository erstellt und gepusht
- [ ] Phase 4: Vercel Production Deploy erfolgreich
- [ ] Phase 5: Playwright Live Tests bestanden (0 Errors, 0 404s)
- [ ] Phase 6: PageSpeed Scores erreicht (Perf≥90, A11y≥95, BP=100, SEO≥95)
- [ ] Phase 7: SEO vollständig implementiert
  - [ ] Structured Data (Organization, LocalBusiness, Service, FAQ, BreadcrumbList, Article)
  - [ ] Sitemap.xml generiert und validiert
  - [ ] robots.txt konfiguriert
  - [ ] Alle Meta-Tags gesetzt (Title, Description, OG, Twitter)
  - [ ] Keyword-Optimierung auf allen Seiten
  - [ ] 20 Stadt-Seiten mit Unique Content
  - [ ] Internal Linking Struktur aufgebaut
  - [ ] Content-Silos und Pillar Pages erstellt
- [ ] Phase 8: Automatisierte Test-Suite
  - [ ] SEO Tests bestanden
  - [ ] UI/UX Tests bestanden
  - [ ] Coverage ≥ 85%
  - [ ] Lighthouse CI konfiguriert

## Ergebnis

- Vercel URL: ___________________
- GitHub Repo: ___________________
- PageSpeed Score: Perf=___ A11y=___ BP=___ SEO=___
- Test Coverage: ___%
```

---

## 🔧 Fehlerbehebung

### Fix & Retry Zyklus (Phase 4-6 Loop)

```
WENN PageSpeed-Score < Minimum:
  1. Identifiziere die schwächste Kategorie
  2. Lese die Empfehlungen aus dem PageSpeed Report
  3. Implementiere die Fixes im Code
  4. git add . && git commit -m "perf: fix [kategorie]"
  5. git push
  6. npx vercel --prod --yes --token={{VERCEL_TOKEN}}
  7. Warte 60 Sekunden
  8. Prüfe PageSpeed erneut
  9. Wiederhole max 10x
```

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Build Error | `npm run build` Output lesen, TypeScript Errors fixen |
| 404 auf Vercel | `vercel.json` Rewrites prüfen, Trailing Slashes |
| CLS > 0.1 | Explizite width/height auf Images, Font Display Swap |
| LCP > 2.5s | Hero Image mit `priority`, Fonts preloaden |
| Low SEO Score | Meta Description fehlt, H1 fehlt, alt-Tags fehlen |

---

**Version:** 6.0.0
**Datum:** Feb-03-2026
**Status:** Production Ready
**Erstellt für:** Everlast Consulting GmbH
