# Phase 2B: UI/UX Component Testing (Post-Development)

> **Dauer:** ~20 Minuten
> **Input:** Fertige Website aus Phase 2
> **Output:** Alle UI-Bugs gefixt, Animationen validiert
> **Tool:** Playwright MCP
> **Abhängigkeiten:** Phase 2 (Core Dev abgeschlossen)

---

## Warum Phase 2B?

Nach der Entwicklung und VOR dem Deployment werden alle UI/UX-Elemente
per Playwright getestet. Bugs werden sofort gefixt — nicht erst nach dem
Live-Deployment. Das spart Re-Deploy-Zyklen.

---

## Vorbereitung: Dev Server starten

```bash
cd "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"
npm run dev
# Server läuft auf http://localhost:3000
```

---

## Test 1: Header & Navigation

```javascript
// Navigation auf localhost testen
mcp__plugin_playwright_playwright__browser_navigate({
  url: "http://localhost:3000"
});

mcp__plugin_playwright_playwright__browser_wait_for({ time: 2 });

// Screenshot: Header im Ausgangszustand
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "header-default.png"
});
```

### Header Sticky Verhalten

```javascript
// Nach unten scrollen
mcp__plugin_playwright_playwright__browser_evaluate({
  expression: "window.scrollTo(0, 500)"
});

mcp__plugin_playwright_playwright__browser_wait_for({ time: 1 });

// Screenshot: Header muss weiterhin sichtbar sein
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "header-sticky.png"
});
```

**Prüfpunkte:**
- [ ] Header bleibt sticky beim Scrollen
- [ ] Backdrop-Blur Effekt sichtbar
- [ ] Kein weißer Rand oben/unten
- [ ] Logo links, Navigation rechts
- [ ] CTA-Button sichtbar

### Mobile Navigation

```javascript
// Mobile Viewport
mcp__plugin_playwright_playwright__browser_resize({ width: 375, height: 812 });
mcp__plugin_playwright_playwright__browser_wait_for({ time: 1 });

// Screenshot: Mobile Header
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "mobile-header.png"
});

// Hamburger Menu klicken
mcp__plugin_playwright_playwright__browser_click({
  selector: "[data-testid='mobile-menu-button']"
});

mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.5 });

// Screenshot: Mobile Menu offen
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "mobile-menu-open.png"
});
```

**Prüfpunkte:**
- [ ] Hamburger-Icon sichtbar auf Mobile
- [ ] Menu öffnet sich mit Animation
- [ ] Alle Links sichtbar im Mobile Menu
- [ ] Menu schließt sich nach Link-Klick

---

## Test 2: Animationen & Scroll-Verhalten

### Framer Motion Animationen

```javascript
// Zurück zu Desktop
mcp__plugin_playwright_playwright__browser_resize({ width: 1440, height: 900 });

// Zum Anfang scrollen
mcp__plugin_playwright_playwright__browser_evaluate({
  expression: "window.scrollTo(0, 0)"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 1 });

// Langsam durch die Seite scrollen und Animationen triggern
mcp__plugin_playwright_playwright__browser_evaluate({
  expression: `
    (async () => {
      const totalHeight = document.body.scrollHeight;
      const step = 300;
      for (let pos = 0; pos < totalHeight; pos += step) {
        window.scrollTo(0, pos);
        await new Promise(r => setTimeout(r, 200));
      }
    })()
  `
});

mcp__plugin_playwright_playwright__browser_wait_for({ time: 5 });

// Full-Page Screenshot nach allen Animationen
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  fullPage: true,
  filename: "homepage-all-sections.png"
});
```

**Prüfpunkte:**
- [ ] Fade-in Animationen triggern beim Scrollen
- [ ] Slide-up Animationen sind smooth (keine Ruckler)
- [ ] Counter-Animationen zählen hoch
- [ ] Kein Layout-Shift während Animationen (CLS!)

---

## Test 3: Hover-Verhalten

### Button Hover States

```javascript
// Primary Button hovern
mcp__plugin_playwright_playwright__browser_hover({
  selector: "[data-testid='hero-cta-primary']"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.5 });
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "button-hover-primary.png"
});

// Service Card hovern
mcp__plugin_playwright_playwright__browser_hover({
  selector: "[data-testid='service-card-0']"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.5 });
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "card-hover-service.png"
});

// Navigation Link hovern
mcp__plugin_playwright_playwright__browser_hover({
  selector: "nav a[href='/leistungen']"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.3 });
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "nav-link-hover.png"
});
```

**Prüfpunkte:**
- [ ] Button-Hover: Farbe ändert sich (gold → gold-light)
- [ ] Card-Hover: Subtle Lift-Effekt (translateY + shadow)
- [ ] Nav-Hover: Textfarbe wechselt (muted → primary)
- [ ] Transition-Duration korrekt (150ms für Hover)
- [ ] Kein Flackern bei schnellem Hover ein/aus

---

## Test 4: Interaktive Elemente

### FAQ Accordion

```javascript
// Zum FAQ scrollen
mcp__plugin_playwright_playwright__browser_evaluate({
  expression: "document.querySelector('[data-testid=\"faq-section\"]')?.scrollIntoView({ behavior: 'smooth' })"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 1 });

// Erste FAQ öffnen
mcp__plugin_playwright_playwright__browser_click({
  selector: "[data-testid='faq-item-0'] button"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.5 });
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "faq-open.png"
});

// Zweite FAQ öffnen (erste sollte sich schließen)
mcp__plugin_playwright_playwright__browser_click({
  selector: "[data-testid='faq-item-1'] button"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 0.5 });
mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "faq-toggle.png"
});
```

### Kontaktformular

```javascript
// Zur Kontaktseite navigieren
mcp__plugin_playwright_playwright__browser_navigate({
  url: "http://localhost:3000/kontakt"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 2 });

// Formularfelder ausfüllen
mcp__plugin_playwright_playwright__browser_type({
  selector: "input[name='name']",
  text: "Max Mustermann"
});
mcp__plugin_playwright_playwright__browser_type({
  selector: "input[name='email']",
  text: "test@example.com"
});
mcp__plugin_playwright_playwright__browser_type({
  selector: "textarea[name='message']",
  text: "Test-Nachricht für das Kontaktformular."
});

mcp__plugin_playwright_playwright__browser_take_screenshot({
  type: "png",
  filename: "contact-form-filled.png"
});
```

**Prüfpunkte:**
- [ ] FAQ öffnet/schließt mit Animation
- [ ] Nur ein FAQ-Item gleichzeitig offen (Accordion-Muster)
- [ ] Formular-Inputs haben Focus-States (gold border)
- [ ] Labels sind korrekt verknüpft (Accessibility)
- [ ] Placeholder-Text sichtbar

---

## Test 5: Responsive Breakpoints

```javascript
// Alle Breakpoints testen
const breakpoints = [
  { name: 'mobile-sm', width: 320, height: 568 },
  { name: 'mobile', width: 375, height: 812 },
  { name: 'mobile-lg', width: 428, height: 926 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-xl', width: 1920, height: 1080 },
];

// Für jeden Breakpoint Screenshot machen
for (const bp of breakpoints) {
  mcp__plugin_playwright_playwright__browser_resize({ width: bp.width, height: bp.height });
  mcp__plugin_playwright_playwright__browser_navigate({ url: "http://localhost:3000" });
  mcp__plugin_playwright_playwright__browser_wait_for({ time: 2 });
  mcp__plugin_playwright_playwright__browser_take_screenshot({
    type: "png",
    filename: `responsive-${bp.name}.png`
  });
}
```

**Prüfpunkte pro Breakpoint:**
- [ ] 320px: Kein horizontaler Overflow
- [ ] 375px: Alle Texte lesbar, CTAs klickbar
- [ ] 768px: Grid wechselt zu 2-spaltig
- [ ] 1024px: Navigation komplett sichtbar
- [ ] 1440px: Optimale Darstellung
- [ ] 1920px: Content nicht zu breit (max-w-7xl)

---

## Test 6: Console Errors & Network

```javascript
// Console Errors prüfen
mcp__plugin_playwright_playwright__browser_navigate({
  url: "http://localhost:3000"
});
mcp__plugin_playwright_playwright__browser_wait_for({ time: 3 });

mcp__plugin_playwright_playwright__browser_console_messages({
  level: "error"
});

// Network Requests prüfen (404s, 500s)
mcp__plugin_playwright_playwright__browser_network_requests({
  includeStatic: true
});
```

**Erfolgskriterien:**
- [ ] 0 Console Errors
- [ ] 0 Network 404 Errors
- [ ] Keine fehlenden Bilder
- [ ] Keine fehlenden Fonts

---

## Test 7: Alle Unterseiten durchklicken

```javascript
// Alle wichtigen Seiten besuchen
const pages = [
  '/',
  '/leistungen',
  '/leistungen/ki-beratung',
  '/leistungen/ki-automatisierung',
  '/leistungen/ki-workshop',
  '/leistungen/chatgpt-beratung',
  '/leistungen/ki-implementierung',
  '/leistungen/ki-strategie',
  '/ueber-uns',
  '/blog',
  '/kontakt',
  '/ki-agentur-berlin',
  '/ki-agentur-muenchen',
  '/ki-agentur-hamburg',
  '/impressum',
  '/datenschutz',
];

for (const page of pages) {
  mcp__plugin_playwright_playwright__browser_navigate({
    url: `http://localhost:3000${page}`
  });
  mcp__plugin_playwright_playwright__browser_wait_for({ time: 1 });
  
  // Console Errors prüfen
  const errors = mcp__plugin_playwright_playwright__browser_console_messages({
    level: "error"
  });
  
  // Screenshot für Dokumentation
  mcp__plugin_playwright_playwright__browser_take_screenshot({
    type: "png",
    filename: `page-${page.replace(/\//g, '-').replace(/^-/, '')}.png`
  });
}
```

---

## Bug-Fix Workflow

Wenn ein Test fehlschlägt:

```
1. Bug identifizieren (Screenshot + Console Error)
2. Betroffene Komponente öffnen
3. Fix implementieren
4. Dev Server prüft automatisch (Hot Reload)
5. Test wiederholen
6. Nächster Test
```

---

## Erfolgskriterien Phase 2B

- [ ] Alle 7 Test-Kategorien bestanden
- [ ] 0 Console Errors auf allen Seiten
- [ ] 0 Network 404s
- [ ] Header sticky auf allen Seiten
- [ ] Mobile Navigation funktional
- [ ] Alle Animationen smooth
- [ ] Hover-States auf allen interaktiven Elementen
- [ ] FAQ Accordion funktional
- [ ] Kontaktformular ausfüllbar
- [ ] Responsive auf allen 7 Breakpoints
- [ ] Screenshots dokumentiert

> **WEITER:** Phase 3 (GitHub)
