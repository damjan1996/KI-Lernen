# Phase 5: Playwright Live Testing

> **Dauer:** ~10 Minuten
> **Input:** Live Vercel URL aus Phase 4
> **Output:** Validierte Live-Website
> **Tool:** Playwright MCP
> **Abhängigkeiten:** Phase 4 (Deployment erfolgreich)

---

## Variable

```yaml
VERCEL_URL: "{{VERCEL_URL}}"  # z.B. https://ki-agentur-everlast.vercel.app
```

---

## Test 1: Homepage laden & grundlegende Checks

```javascript
// 1. Navigieren
mcp__plugin_playwright_playwright__browser_navigate({
  url: "{{VERCEL_URL}}"
});

// 2. Warten bis alles geladen
mcp__plugin_playwright_playwright__browser_wait_for({ time: 3 });

// 3. Console Errors prüfen
mcp__plugin_playwright_playwright__browser_console_messages({ level: "error" });

// 4. Network 404s prüfen
mcp__plugin_playwright_playwright__browser_network_requests({ includeStatic: true });

// 5. Full-Page Screenshot Desktop
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  fullPage: true,
  filename: "live-homepage-desktop.png"
});
```

---

## Test 2: Mobile View

```javascript
// Mobile Viewport (iPhone 14)
mcp__plugin_playwright_playwright__browser_resize({ width: 393, height: 852 });

mcp__plugin_playwright_playwright__browser_navigate({
  url: "{{VERCEL_URL}}"
});

mcp__plugin_playwright_playwright__browser_wait_for({ time: 3 });

mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  fullPage: true,
  filename: "live-homepage-mobile.png"
});
```

---

## Test 3: Alle kritischen Seiten prüfen

```javascript
const criticalPages = [
  { path: '/', name: 'homepage' },
  { path: '/leistungen', name: 'leistungen' },
  { path: '/leistungen/ki-beratung', name: 'ki-beratung' },
  { path: '/ueber-uns', name: 'ueber-uns' },
  { path: '/blog', name: 'blog' },
  { path: '/kontakt', name: 'kontakt' },
  { path: '/ki-agentur-berlin', name: 'stadt-berlin' },
  { path: '/ki-agentur-muenchen', name: 'stadt-muenchen' },
  { path: '/impressum', name: 'impressum' },
  { path: '/datenschutz', name: 'datenschutz' },
];

// Desktop Viewport
mcp__plugin_playwright_playwright__browser_resize({ width: 1440, height: 900 });

for (const page of criticalPages) {
  mcp__plugin_playwright_playwright__browser_navigate({
    url: `{{VERCEL_URL}}${page.path}`
  });
  mcp__plugin_playwright_playwright__browser_wait_for({ time: 2 });
  
  // Console Errors
  mcp__plugin_playwright_playwright__browser_console_messages({ level: "error" });
  
  // Screenshot
  mcp__plugin_playwright_playwright__browser_take_screenshot({
    type: "png",
    filename: `live-${page.name}.png`
  });
}
```

---

## Test 4: SEO Quick-Check (Live)

```javascript
// H1 prüfen
mcp__plugin_playwright_playwright__browser_navigate({ url: "{{VERCEL_URL}}" });
mcp__plugin_playwright_playwright__browser_wait_for({ time: 2 });

mcp__plugin_playwright_playwright__browser_evaluate({
  expression: `
    JSON.stringify({
      title: document.title,
      h1: document.querySelector('h1')?.textContent,
      h1Count: document.querySelectorAll('h1').length,
      metaDesc: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)),
      imagesMissingAlt: document.querySelectorAll('img:not([alt])').length,
      lang: document.documentElement.lang,
    })
  `
});
```

**Prüfpunkte SEO:**
- [ ] Title enthält "{{PRIMARY_KEYWORD}}" und ist 30-65 Zeichen
- [ ] Genau 1x H1 pro Seite
- [ ] Meta Description 50-155 Zeichen
- [ ] Canonical URL gesetzt
- [ ] OG:Title vorhanden
- [ ] JSON-LD Schema(s) vorhanden und valide
- [ ] 0 Images ohne alt-Attribut
- [ ] `lang="de"` im html-Tag

---

## Test 5: Weißer Rand Check

```javascript
// Bekanntes Problem: Weißer Rand am rechten Seitenrand
mcp__plugin_playwright_playwright__browser_evaluate({
  expression: `
    const body = document.body;
    const hasHorizontalScroll = body.scrollWidth > window.innerWidth;
    ({ 
      hasHorizontalScroll, 
      bodyWidth: body.scrollWidth, 
      viewportWidth: window.innerWidth,
      diff: body.scrollWidth - window.innerWidth
    })
  `
});
```

**Wenn weißer Rand gefunden:**
```css
/* Fix: In globals.css */
html, body { overflow-x: hidden; }
/* ODER: Betroffenes Element mit overflow:hidden finden */
```

---

## Erfolgskriterien Phase 5

- [ ] 0 Console Errors auf allen getesteten Seiten
- [ ] 0 Network 404 Errors
- [ ] Kein weißer Rand (horizontal scroll)
- [ ] Alle Seiten laden korrekt (kein 404, kein 500)
- [ ] Mobile View korrekt
- [ ] SEO Quick-Check bestanden
- [ ] Screenshots dokumentiert

### Bei Fehler: Fix & Re-Deploy

```bash
# Fix implementieren
# ...

# Commit & Push
git add .
git commit -m "fix: [Beschreibung des Fixes]"
git push

# Re-Deploy
npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT

# Tests wiederholen
```

> **WEITER:** Phase 6 (PageSpeed)
