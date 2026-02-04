# Phase 6: PageSpeed Insights Validation

> **Dauer:** ~5-15 Minuten (inkl. mögliche Fix-Zyklen)
> **Input:** Live Vercel URL
> **Output:** PageSpeed Scores ≥ Minimum
> **Abhängigkeiten:** Phase 5 (Live Tests bestanden)

---

## Ziel-Scores

| Kategorie | Minimum | Ideal |
|-----------|---------|-------|
| Performance | 90 | 95+ |
| Accessibility | 95 | 100 |
| Best Practices | 100 | 100 |
| SEO | 95 | 100 |

---

## PageSpeed abrufen

```javascript
// WebFetch auf PageSpeed Insights
WebFetch({
  url: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent("{{VERCEL_URL}}")}`,
  prompt: "Extrahiere die Lighthouse Scores: Performance, Accessibility, Best Practices, SEO. Liste auch die Top-3 Verbesserungsvorschläge pro Kategorie auf."
});
```

### Alternative: API-Abfrage

```bash
# PageSpeed Insights API (kein Key für öffentliche URLs nötig)
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={{VERCEL_URL}}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo"
```

---

## Häufige Fixes nach Kategorie

### Performance < 90

```yaml
LCP_FIXES:
  - Hero Image mit priority und sizes Attribut
  - Fonts preloaden (next/font tut das automatisch)
  - Keine Third-Party Scripts above-the-fold
  - Server-Side Rendering statt Client-Side

CLS_FIXES:
  - Explizite width/height auf ALLEN <Image> Elementen
  - font-display: swap (next/font Default)
  - Keine dynamisch eingefügten Elemente above-the-fold
  - Placeholder/Skeleton für lazy-loaded Content

INP_FIXES:
  - Event Handler debounced
  - Keine schweren Berechnungen im Main Thread
  - React.memo für teure Komponenten
  - Dynamic Import für schwere Bibliotheken

GENERAL_PERF:
  - Images in WebP/AVIF (next/image Default)
  - Unused JavaScript entfernen
  - CSS minimieren (Tailwind purge ist aktiv)
  - Fonts subsetting (next/font tut das automatisch)
```

### Accessibility < 95

```yaml
A11Y_FIXES:
  - Alle Images haben alt-Attribute
  - Alle Form-Inputs haben Labels
  - Farbkontrast mindestens 4.5:1
  - Focus-Visible Styles auf allen interaktiven Elementen
  - Skip-to-Content Link
  - ARIA Labels auf Icon-Buttons
  - Heading-Hierarchie korrekt (h1 > h2 > h3)
  - lang="de" auf html-Element
```

### Best Practices < 100

```yaml
BP_FIXES:
  - Keine Console Errors/Warnings
  - HTTPS überall (Vercel Default)
  - Keine deprecated APIs
  - CSP Headers konfiguriert
  - Keine Mixed Content
```

### SEO < 95

```yaml
SEO_FIXES:
  - Title Tag vorhanden (30-65 Zeichen)
  - Meta Description vorhanden (50-155 Zeichen)
  - Canonical URL gesetzt
  - robots.txt erreichbar
  - Sitemap.xml erreichbar
  - Alle Links haben Text (keine leeren <a> Tags)
  - Viewport Meta Tag vorhanden
  - Font-Größe mindestens 12px
  - Tap-Targets mindestens 48x48px
```

---

## Fix & Retry Loop

```
WIEDERHOLE (max 10x):
  1. PageSpeed Scores abrufen
  2. WENN alle Scores ≥ Minimum → STOP ✓
  3. SONST: Schwächste Kategorie identifizieren
  4. Top-Empfehlung implementieren
  5. git add . && git commit -m "perf: improve [kategorie]"
  6. git push
  7. npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT
  8. 60 Sekunden warten
  9. Zurück zu Schritt 1
```

---

## Erfolgskriterien

- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices = 100
- [ ] SEO ≥ 95
- [ ] Maximal 10 Retry-Zyklen

> **WEITER:** Phase 7 (SEO Deep Optimization)
