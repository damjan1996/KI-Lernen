# Phase 0: Design System Generierung

> **Tool:** Pencil MCP (VS Code Extension)
> **Input:** CONFIG.md Branding-Werte + Referenz-Node O65sj
> **Output:** `{{PROJECT_SLUG}}-design-system.pen`
> **Dauer:** ~15 Minuten
> **Abhängigkeiten:** Keine (erste Phase)

---

## Konzept

Claude ERSTELLT das Design System — es wird NICHT geladen.
Das Design System wird **vertikal** aufgebaut, damit rechts daneben in VS Code
die gesamte Website-Struktur abgebildet werden kann.

### Layout-Prinzip

```
┌─────────────────────────────────────────────────────────────────────────┐
│ VS Code Editor                                                          │
│                                                                         │
│  ┌──────────────────────┐  ┌──────────────────────────────────────────┐ │
│  │ Design System        │  │ Website-Struktur / Code                  │ │
│  │ (Vertikal, schmal)   │  │ (Breiter Bereich rechts)                 │ │
│  │                      │  │                                          │ │
│  │ ┌──────────────────┐ │  │  app/                                    │ │
│  │ │ Header           │ │  │  ├── layout.tsx                          │ │
│  │ │ "Design System"  │ │  │  ├── page.tsx (Homepage)                 │ │
│  │ └──────────────────┘ │  │  ├── leistungen/                        │ │
│  │ ┌──────────────────┐ │  │  │   ├── page.tsx                       │ │
│  │ │ 01 Brand Found.  │ │  │  │   ├── ki-beratung/page.tsx           │ │
│  │ │ Colors           │ │  │  │   ├── ki-automatisierung/page.tsx    │ │
│  │ │ Typography       │ │  │  │   └── ...                            │ │
│  │ │ Spacing          │ │  │  ├── ueber-uns/page.tsx                 │ │
│  │ └──────────────────┘ │  │  ├── blog/                              │ │
│  │ ┌──────────────────┐ │  │  │   ├── page.tsx                       │ │
│  │ │ 02 UI Components │ │  │  │   └── [slug]/page.tsx                │ │
│  │ │ Buttons          │ │  │  ├── kontakt/page.tsx                   │ │
│  │ │ Cards            │ │  │  ├── ki-agentur-[stadt]/page.tsx        │ │
│  │ │ Navigation       │ │  │  └── ...                                │ │
│  │ └──────────────────┘ │  │                                          │ │
│  │ ┌──────────────────┐ │  │                                          │ │
│  │ │ 03 Sections      │ │  │                                          │ │
│  │ │ Hero             │ │  │                                          │ │
│  │ │ Services Grid    │ │  │                                          │ │
│  │ │ Testimonials     │ │  │                                          │ │
│  │ └──────────────────┘ │  │                                          │ │
│  └──────────────────────┘  └──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Schritt 1: Referenz-Struktur analysieren (Read-Only)

```javascript
// ZUERST: Struktur des Liquid Glass Design Systems verstehen
mcp__pencil__batch_get({
  filePath: "C:\\Users\\damja\\Desktop\\NexArQ\\portfolio.pen",
  nodeIds: ["O65sj"],
  readDepth: 3
});
```

**Zweck:** Die Hierarchie und Patterns des Referenz-Design-Systems verstehen,
um die gleiche Qualität für das neue Projekt zu reproduzieren.

---

## Schritt 2: Design System Dokument erstellen

```javascript
mcp__pencil__open_document({
  filePathOrTemplate: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen"
});
```

---

## Schritt 3: Guidelines abrufen

```javascript
mcp__pencil__get_guidelines({
  topic: "design-system"
});
```

---

## Schritt 4: Design System aufbauen (Batch Operations)

> **WICHTIG:** Max 25 Operationen pro `batch_design` Call!
> **LAYOUT:** Vertikal (nicht horizontal!) — Breite: 1200px (schmaler als Referenz)

### Batch 1: Root Frame + Header

```javascript
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
root=I(document, {type: "frame", name: "{{PROJECT_NAME}} Design System", layout: "vertical", width: 1200, padding: 48, gap: 48, fill: "#0A0A0A"})
headerSection=I(root, {type: "frame", name: "headerSection", layout: "vertical", gap: 16, width: "fill_container"})
badge=I(headerSection, {type: "frame", name: "headerBadge", cornerRadius: 100, fill: "rgba(201, 169, 98, 0.15)", padding: [8, 16], gap: 8, stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.3)", thickness: 1}})
badgeIcon=I(badge, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "sparkles", fill: "#C9A962", width: 14, height: 14})
badgeText=I(badge, {type: "text", content: "EVERLAST DESIGN SYSTEM v1.0", fontFamily: "Inter", fontSize: 10, fontWeight: "600", letterSpacing: 2.5, fill: "#C9A962"})
title=I(headerSection, {type: "text", name: "headerTitle", content: "{{PROJECT_NAME}} Design System", fontFamily: "Playfair Display", fontSize: 48, fontWeight: "normal", fill: "#FAF8F5", letterSpacing: -1.5})
subtitle=I(headerSection, {type: "text", name: "headerSubtitle", content: "{{PROJECT_DESC}}", fontFamily: "Inter", fontSize: 16, fontWeight: "normal", fill: "#888888", width: "fill_container"})
divider1=I(root, {type: "frame", name: "divider1", fill: "rgba(201, 169, 98, 0.15)", height: 1, width: "fill_container"})
`
});
```

### Batch 2: Section 01 — Brand Foundations Header + Farbpalette

```javascript
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
sec01=I("root", {type: "frame", name: "01 Brand Foundations", layout: "vertical", gap: 32, width: "fill_container"})
sec01Header=I(sec01, {type: "frame", name: "foundHeader", layout: "vertical", gap: 6})
sec01Num=I(sec01Header, {type: "text", content: "01", fontFamily: "Inter", fontSize: 12, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
sec01Title=I(sec01Header, {type: "text", content: "Brand Foundations", fontFamily: "Playfair Display", fontSize: 36, fill: "#FAF8F5"})
sec01Desc=I(sec01Header, {type: "text", content: "Grundlegende Design-Tokens: Farben, Typografie, Spacing und Effekte", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
colorsCard=I(sec01, {type: "frame", name: "Colors", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
colorsHeader=I(colorsCard, {type: "text", content: "Farbpalette", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
colorsGrid=I(colorsCard, {type: "frame", name: "colorsGrid", layout: "horizontal", gap: 12, width: "fill_container", wrap: true})
`
});
```

### Batch 3: Farb-Swatches

```javascript
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
sw1=I("colorsGrid", {type: "frame", name: "swatch-bg", layout: "vertical", gap: 8, width: 100})
sw1Color=I(sw1, {type: "frame", fill: "#0A0A0A", width: 100, height: 60, cornerRadius: 12, stroke: {align: "inside", fill: "rgba(255,255,255,0.1)", thickness: 1}})
sw1Label=I(sw1, {type: "text", content: "Background", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw1Hex=I(sw1, {type: "text", content: "#0A0A0A", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
sw2=I("colorsGrid", {type: "frame", name: "swatch-surface", layout: "vertical", gap: 8, width: 100})
sw2Color=I(sw2, {type: "frame", fill: "#141414", width: 100, height: 60, cornerRadius: 12, stroke: {align: "inside", fill: "rgba(255,255,255,0.1)", thickness: 1}})
sw2Label=I(sw2, {type: "text", content: "Surface", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw2Hex=I(sw2, {type: "text", content: "#141414", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
sw3=I("colorsGrid", {type: "frame", name: "swatch-gold", layout: "vertical", gap: 8, width: 100})
sw3Color=I(sw3, {type: "frame", fill: "#C9A962", width: 100, height: 60, cornerRadius: 12})
sw3Label=I(sw3, {type: "text", content: "Gold Primary", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw3Hex=I(sw3, {type: "text", content: "#C9A962", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
sw4=I("colorsGrid", {type: "frame", name: "swatch-gold-light", layout: "vertical", gap: 8, width: 100})
sw4Color=I(sw4, {type: "frame", fill: "#D4B978", width: 100, height: 60, cornerRadius: 12})
sw4Label=I(sw4, {type: "text", content: "Gold Light", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw4Hex=I(sw4, {type: "text", content: "#D4B978", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
sw5=I("colorsGrid", {type: "frame", name: "swatch-text", layout: "vertical", gap: 8, width: 100})
sw5Color=I(sw5, {type: "frame", fill: "#FAF8F5", width: 100, height: 60, cornerRadius: 12})
sw5Label=I(sw5, {type: "text", content: "Text Primary", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw5Hex=I(sw5, {type: "text", content: "#FAF8F5", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
sw6=I("colorsGrid", {type: "frame", name: "swatch-muted", layout: "vertical", gap: 8, width: 100})
sw6Color=I(sw6, {type: "frame", fill: "#888888", width: 100, height: 60, cornerRadius: 12})
sw6Label=I(sw6, {type: "text", content: "Text Secondary", fontFamily: "Inter", fontSize: 11, fill: "#FAF8F5"})
sw6Hex=I(sw6, {type: "text", content: "#888888", fontFamily: "JetBrains Mono", fontSize: 10, fill: "#888888"})
`
});
```

### Batch 4: Typografie-Sektion

```javascript
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
typoCard=I("sec01", {type: "frame", name: "Typography", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
typoHeader=I(typoCard, {type: "text", content: "Typografie", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
typoDisplay=I(typoCard, {type: "frame", name: "displayType", layout: "vertical", gap: 4})
typoDisplayLabel=I(typoDisplay, {type: "text", content: "Display — Playfair Display", fontFamily: "Inter", fontSize: 11, fill: "#C9A962", fontWeight: "600", letterSpacing: 1.5})
typoDisplaySample=I(typoDisplay, {type: "text", content: "KI Agentur Deutschland", fontFamily: "Playfair Display", fontSize: 40, fill: "#FAF8F5"})
typoBody=I(typoCard, {type: "frame", name: "bodyType", layout: "vertical", gap: 4})
typoBodyLabel=I(typoBody, {type: "text", content: "Body — Inter", fontFamily: "Inter", fontSize: 11, fill: "#C9A962", fontWeight: "600", letterSpacing: 1.5})
typoBodySample=I(typoBody, {type: "text", content: "Wir entwickeln maßgeschneiderte KI-Lösungen für Ihr Unternehmen. Von der Beratung bis zur Implementierung.", fontFamily: "Inter", fontSize: 16, fill: "#FAF8F5", width: "fill_container"})
typoMono=I(typoCard, {type: "frame", name: "monoType", layout: "vertical", gap: 4})
typoMonoLabel=I(typoMono, {type: "text", content: "Mono — JetBrains Mono", fontFamily: "Inter", fontSize: 11, fill: "#C9A962", fontWeight: "600", letterSpacing: 1.5})
typoMonoSample=I(typoMono, {type: "text", content: "const ai = new Agent({ model: 'gpt-4' })", fontFamily: "JetBrains Mono", fontSize: 14, fill: "#FAF8F5"})
`
});
```

### Batch 5: Spacing + Border Radius + Divider

```javascript
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
spacingCard=I("sec01", {type: "frame", name: "Spacing", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
spacingHeader=I(spacingCard, {type: "text", content: "Spacing (8px Basis-Grid)", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
spacingRow=I(spacingCard, {type: "frame", layout: "horizontal", gap: 12, width: "fill_container"})
sp4=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 4, height: 32, cornerRadius: 2})
sp8=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 8, height: 32, cornerRadius: 2})
sp16=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 16, height: 32, cornerRadius: 2})
sp24=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 24, height: 32, cornerRadius: 2})
sp32=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 32, height: 32, cornerRadius: 2})
sp48=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 48, height: 32, cornerRadius: 2})
sp64=I(spacingRow, {type: "frame", fill: "rgba(201, 169, 98, 0.3)", width: 64, height: 32, cornerRadius: 2})
divider2=I("root", {type: "frame", name: "divider2", fill: "rgba(201, 169, 98, 0.15)", height: 1, width: "fill_container"})
`
});
```

### Batch 6-10: Section 02 — UI Components

```javascript
// Batch 6: UI Components Header + Button Variants
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
sec02=I("root", {type: "frame", name: "02 UI Components", layout: "vertical", gap: 32, width: "fill_container"})
sec02Header=I(sec02, {type: "frame", name: "uiHeader", layout: "vertical", gap: 6})
sec02Num=I(sec02Header, {type: "text", content: "02", fontFamily: "Inter", fontSize: 12, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
sec02Title=I(sec02Header, {type: "text", content: "UI Components", fontFamily: "Playfair Display", fontSize: 36, fill: "#FAF8F5"})
sec02Desc=I(sec02Header, {type: "text", content: "Wiederverwendbare Elemente: Navigation, Buttons, Cards, Inputs", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
btnCard=I(sec02, {type: "frame", name: "Buttons", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
btnHeader=I(btnCard, {type: "text", content: "Buttons", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
btnRow=I(btnCard, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})
btnPrimary=I(btnRow, {type: "frame", name: "btn-primary", fill: "#C9A962", cornerRadius: 12, padding: [12, 24]})
btnPrimaryText=I(btnPrimary, {type: "text", content: "Kostenlose Beratung", fontFamily: "Inter", fontSize: 14, fontWeight: "600", fill: "#0A0A0A"})
btnSecondary=I(btnRow, {type: "frame", name: "btn-secondary", cornerRadius: 12, padding: [12, 24], stroke: {align: "inside", fill: "#C9A962", thickness: 1}})
btnSecondaryText=I(btnSecondary, {type: "text", content: "Mehr erfahren", fontFamily: "Inter", fontSize: 14, fontWeight: "600", fill: "#C9A962"})
btnGhost=I(btnRow, {type: "frame", name: "btn-ghost", cornerRadius: 12, padding: [12, 24]})
btnGhostText=I(btnGhost, {type: "text", content: "Zurück", fontFamily: "Inter", fontSize: 14, fontWeight: "500", fill: "#888888"})
`
});

// Batch 7: Navigation Bar Component
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
navCard=I("sec02", {type: "frame", name: "Navigation", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
navHeader=I(navCard, {type: "text", content: "Navigation Bar (Sticky, Glass-Effekt)", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
navBar=I(navCard, {type: "frame", name: "navbar", layout: "horizontal", gap: 0, padding: [16, 32], fill: "rgba(10, 10, 10, 0.95)", cornerRadius: 16, width: "fill_container", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.1)", thickness: 1}})
navLogo=I(navBar, {type: "text", content: "EVERLAST", fontFamily: "Playfair Display", fontSize: 20, fill: "#C9A962", fontWeight: "700"})
navSpacer=I(navBar, {type: "frame", width: "fill_container", height: 1})
navLinks=I(navBar, {type: "frame", layout: "horizontal", gap: 32})
navLink1=I(navLinks, {type: "text", content: "Leistungen", fontFamily: "Inter", fontSize: 14, fill: "#FAF8F5"})
navLink2=I(navLinks, {type: "text", content: "Über Uns", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
navLink3=I(navLinks, {type: "text", content: "Blog", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
navLink4=I(navLinks, {type: "text", content: "Kontakt", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
navCTA=I(navBar, {type: "frame", fill: "#C9A962", cornerRadius: 8, padding: [8, 16]})
navCTAText=I(navCTA, {type: "text", content: "Beratung", fontFamily: "Inter", fontSize: 13, fontWeight: "600", fill: "#0A0A0A"})
`
});

// Batch 8: Card Components (Service Card, Stat Card)
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
cardSection=I("sec02", {type: "frame", name: "Cards", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
cardHeader=I(cardSection, {type: "text", content: "Card Components", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
cardGrid=I(cardSection, {type: "frame", layout: "horizontal", gap: 16, width: "fill_container"})
serviceCard=I(cardGrid, {type: "frame", name: "service-card", layout: "vertical", gap: 12, padding: 24, cornerRadius: 16, fill: "rgba(255, 255, 255, 0.03)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.15)", thickness: 1}, width: "fill_container"})
scIcon=I(serviceCard, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "bot", fill: "#C9A962", width: 32, height: 32})
scTitle=I(serviceCard, {type: "text", content: "KI-Beratung", fontFamily: "Inter", fontSize: 18, fill: "#FAF8F5", fontWeight: "600"})
scDesc=I(serviceCard, {type: "text", content: "Strategische Beratung für den erfolgreichen Einsatz von KI in Ihrem Unternehmen.", fontFamily: "Inter", fontSize: 14, fill: "#888888", width: "fill_container"})
scLink=I(serviceCard, {type: "text", content: "Mehr erfahren →", fontFamily: "Inter", fontSize: 13, fill: "#C9A962", fontWeight: "500"})
statCard=I(cardGrid, {type: "frame", name: "stat-card", layout: "vertical", gap: 4, padding: 24, cornerRadius: 16, fill: "rgba(201, 169, 98, 0.08)", width: "fill_container"})
statNum=I(statCard, {type: "text", content: "500+", fontFamily: "Playfair Display", fontSize: 40, fill: "#C9A962", fontWeight: "700"})
statLabel=I(statCard, {type: "text", content: "Automatisierte Prozesse", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
`
});
```

### Batch 9-12: Section 03 — Website Sections + Section 04 — Layout + Section 05 — Motion

```javascript
// Batch 9: Section 03 Header + Hero Section Mockup
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
divider3=I("root", {type: "frame", name: "divider3", fill: "rgba(201, 169, 98, 0.15)", height: 1, width: "fill_container"})
sec03=I("root", {type: "frame", name: "03 Website Sections", layout: "vertical", gap: 32, width: "fill_container"})
sec03Header=I(sec03, {type: "frame", layout: "vertical", gap: 6})
sec03Num=I(sec03Header, {type: "text", content: "03", fontFamily: "Inter", fontSize: 12, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
sec03Title=I(sec03Header, {type: "text", content: "Website Sections", fontFamily: "Playfair Display", fontSize: 36, fill: "#FAF8F5"})
sec03Desc=I(sec03Header, {type: "text", content: "Vordefinierte Sektionen für die Homepage und Unterseiten", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
heroCard=I(sec03, {type: "frame", name: "Hero Section", layout: "vertical", gap: 24, padding: 48, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.03)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.15)", thickness: 1}, width: "fill_container"})
heroLabel=I(heroCard, {type: "text", content: "HERO SECTION", fontFamily: "Inter", fontSize: 10, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
heroH1=I(heroCard, {type: "text", content: "Ihre KI-Agentur für\nmaßgeschneiderte Lösungen", fontFamily: "Playfair Display", fontSize: 44, fill: "#FAF8F5", letterSpacing: -1})
heroSub=I(heroCard, {type: "text", content: "Von der KI-Strategie bis zur Implementierung — wir automatisieren Ihre Geschäftsprozesse mit modernster künstlicher Intelligenz.", fontFamily: "Inter", fontSize: 16, fill: "#888888", width: "fill_container"})
heroCTAs=I(heroCard, {type: "frame", layout: "horizontal", gap: 16})
heroPrimary=I(heroCTAs, {type: "frame", fill: "#C9A962", cornerRadius: 12, padding: [14, 28]})
heroPrimaryText=I(heroPrimary, {type: "text", content: "Kostenlose Beratung", fontFamily: "Inter", fontSize: 15, fontWeight: "600", fill: "#0A0A0A"})
heroSecondary=I(heroCTAs, {type: "frame", cornerRadius: 12, padding: [14, 28], stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.5)", thickness: 1}})
heroSecondaryText=I(heroSecondary, {type: "text", content: "Case Studies ansehen", fontFamily: "Inter", fontSize: 15, fontWeight: "500", fill: "#C9A962"})
`
});

// Batch 10: Section 04 - Layout Patterns
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
divider4=I("root", {type: "frame", name: "divider4", fill: "rgba(201, 169, 98, 0.15)", height: 1, width: "fill_container"})
sec04=I("root", {type: "frame", name: "04 Layout Patterns", layout: "vertical", gap: 32, width: "fill_container"})
sec04Header=I(sec04, {type: "frame", layout: "vertical", gap: 6})
sec04Num=I(sec04Header, {type: "text", content: "04", fontFamily: "Inter", fontSize: 12, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
sec04Title=I(sec04Header, {type: "text", content: "Layout Patterns", fontFamily: "Playfair Display", fontSize: 36, fill: "#FAF8F5"})
sec04Desc=I(sec04Header, {type: "text", content: "Container, Grid-Systeme und Responsive Breakpoints", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
layoutCard=I(sec04, {type: "frame", name: "Grid System", layout: "vertical", gap: 20, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
layoutHeader=I(layoutCard, {type: "text", content: "Container: max-w-7xl (1280px) · Section Padding: py-24/py-32", fontFamily: "Inter", fontSize: 16, fill: "#FAF8F5", fontWeight: "600"})
gridRow=I(layoutCard, {type: "frame", layout: "horizontal", gap: 12, width: "fill_container"})
gridCol1=I(gridRow, {type: "frame", fill: "rgba(201, 169, 98, 0.1)", height: 60, cornerRadius: 8, width: "fill_container", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}})
gridCol2=I(gridRow, {type: "frame", fill: "rgba(201, 169, 98, 0.1)", height: 60, cornerRadius: 8, width: "fill_container", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}})
gridCol3=I(gridRow, {type: "frame", fill: "rgba(201, 169, 98, 0.1)", height: 60, cornerRadius: 8, width: "fill_container", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}})
`
});

// Batch 11: Section 05 - Motion & Animation
mcp__pencil__batch_design({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  operations: `
divider5=I("root", {type: "frame", name: "divider5", fill: "rgba(201, 169, 98, 0.15)", height: 1, width: "fill_container"})
sec05=I("root", {type: "frame", name: "05 Motion & Animation", layout: "vertical", gap: 32, width: "fill_container"})
sec05Header=I(sec05, {type: "frame", layout: "vertical", gap: 6})
sec05Num=I(sec05Header, {type: "text", content: "05", fontFamily: "Inter", fontSize: 12, fill: "#C9A962", fontWeight: "600", letterSpacing: 2})
sec05Title=I(sec05Header, {type: "text", content: "Motion & Animation", fontFamily: "Playfair Display", fontSize: 36, fill: "#FAF8F5"})
sec05Desc=I(sec05Header, {type: "text", content: "Timing, Easing, Hover-States und Scroll-Animationen", fontFamily: "Inter", fontSize: 14, fill: "#888888"})
motionCard=I(sec05, {type: "frame", name: "Timing", layout: "vertical", gap: 16, padding: 24, cornerRadius: 20, fill: "rgba(255, 255, 255, 0.05)", stroke: {align: "inside", fill: "rgba(201, 169, 98, 0.2)", thickness: 1}, width: "fill_container"})
motionHeader=I(motionCard, {type: "text", content: "Animation Timing", fontFamily: "Inter", fontSize: 20, fill: "#FAF8F5", fontWeight: "600"})
timingFast=I(motionCard, {type: "text", content: "Fast: 150ms · Micro-Interactions, Hover-States", fontFamily: "JetBrains Mono", fontSize: 13, fill: "#C9A962"})
timingNormal=I(motionCard, {type: "text", content: "Normal: 300ms · Transitions, Accordion, Tabs", fontFamily: "JetBrains Mono", fontSize: 13, fill: "#D4B978"})
timingSlow=I(motionCard, {type: "text", content: "Slow: 500ms · Page Transitions, Modal Open/Close", fontFamily: "JetBrains Mono", fontSize: 13, fill: "#A88B4A"})
easingNote=I(motionCard, {type: "text", content: "Easing: cubic-bezier(0.4, 0, 0.2, 1) für alle Transitionen", fontFamily: "Inter", fontSize: 13, fill: "#888888"})
`
});
```

---

## Schritt 5: Screenshot zur Validierung

```javascript
mcp__pencil__get_screenshot({
  filePath: "C:\\Users\\damja\\Desktop\\{{PROJECT_SLUG}}\\design-system.pen",
  nodeId: "root"
});
```

**Prüfpunkte:**
- [ ] Vertikales Layout (schmale Spalte, ~1200px)
- [ ] Alle 5 Sektionen sichtbar
- [ ] Farb-Swatches korrekt
- [ ] Typografie-Samples lesbar
- [ ] Everlast-Branding erkennbar (Gold auf Schwarz)

---

## Design Tokens für Phase 2

> Diese Tokens werden in Phase 2 (Core Dev) in globals.css und tailwind.config.ts übernommen.
> Siehe `templates/BRANDING_EVERLAST.md` für die vollständige Token-Referenz.

```yaml
EXPORT_TOKENS:
  colors:
    background: "#0A0A0A"
    surface: "#141414"
    surface-light: "#1A1A1A"
    gold-primary: "#C9A962"
    gold-light: "#D4B978"
    gold-dark: "#A88B4A"
    text-primary: "#FAF8F5"
    text-secondary: "#888888"
    text-tertiary: "#666666"
    success: "#22C55E"
    error: "#EF4444"
    warning: "#F59E0B"
  
  fonts:
    display: "Playfair Display"
    body: "Inter"
    mono: "JetBrains Mono"
  
  timing:
    fast: "150ms"
    normal: "300ms"
    slow: "500ms"
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
```
