# Phase 3: GitHub Repository

> **Dauer:** ~2 Minuten
> **Input:** Getesteter Code aus Phase 2B
> **Output:** Privates GitHub Repository
> **Abhängigkeiten:** Phase 2B (UI Tests bestanden)

---

## .gitignore erstellen

```gitignore
# Dependencies
node_modules/
.pnp/
.pnp.js

# Testing
coverage/
test-results/
playwright-report/

# Next.js
.next/
out/

# Production
build/

# Misc
.DS_Store
*.pem
.env*.local

# Debug
npm-debug.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

---

## Git initialisieren & Repository erstellen

```bash
cd "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"

# Git initialisieren
git init

# Alle Dateien stagen
git add .

# Initial Commit
git commit -m "feat: {{PROJECT_NAME}} – SEO-optimierte Website

- Next.js 16 mit App Router
- Tailwind CSS 3.4.17 mit Everlast Design System
- 20+ Homepage-Sektionen
- 6 Service-Unterseiten
- 20 Stadt-Seiten (SSG)
- Blog mit ISR
- Structured Data (Organization, LocalBusiness, FAQ, Service, Article)
- SEO: Sitemap, robots.txt, Canonical, Meta-Tags
- DSGVO-konform: Impressum, Datenschutz
- Responsive: Mobile, Tablet, Desktop
- Playwright Tests bestanden (Phase 2B)

Co-Authored-By: Claude Code <noreply@anthropic.com>"

# Repository erstellen und pushen
gh repo create {{PROJECT_SLUG}} --private --source=. --push
```

---

## Erfolgskriterien

- [ ] Repository erstellt unter `github.com/damjan1996/{{PROJECT_SLUG}}`
- [ ] Alle Dateien gepusht
- [ ] .gitignore verhindert node_modules Upload
- [ ] Commit Message beschreibt den Projektstand

> **WEITER:** Phase 4 (Vercel Deployment)
