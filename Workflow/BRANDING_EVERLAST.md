# Template: Everlast Branding & Design Tokens

> **Referenziert von:** CONFIG.md, Phase 0 (Design System), Phase 1 (Setup), Phase 2 (Core Dev)
> **Ziel:** Vollständige Design-Token-Referenz für das Everlast-Branding

---

## Brand Identity

```yaml
BRAND:
  name: "Everlast Consulting GmbH"
  tagline: "KI-Lösungen, die bleiben."
  tone: "Professionell, modern, vertrauenswürdig, technisch-elegant"
  aesthetic: "Dark Mode, Gold-Akzente, Glassmorphismus"
  inspiration: "Luxury Tech — Apple trifft Fintech"
```

---

## Farbpalette

### Primäre Farben

```yaml
COLORS:
  # Hintergründe
  background:       "#0A0A0A"    # Tief-Schwarz — Haupthintergrund
  surface:          "#141414"    # Dunkelgrau — Karten, Sektionen (alternierend)
  surface_light:    "#1A1A1A"    # Leichtes Grau — Hover-States, Inputs

  # Akzent (Gold)
  gold_primary:     "#C9A962"    # Primäres Gold — CTAs, Icons, Highlights
  gold_light:       "#D4B978"    # Helles Gold — Hover-States
  gold_dark:        "#A88B4A"    # Dunkles Gold — Schatten, Borders

  # Text
  text_primary:     "#FAF8F5"    # Fast-Weiß — Überschriften, primärer Text
  text_secondary:   "#888888"    # Grau — Body-Text, Beschreibungen
  text_tertiary:    "#666666"    # Dunkelgrau — Labels, Placeholder

  # Semantisch
  success:          "#22C55E"    # Grün — Erfolg
  error:            "#EF4444"    # Rot — Fehler
  warning:          "#F59E0B"    # Gelb/Orange — Warnung
```

### Farbverwendung

```yaml
COLOR_USAGE:
  background:
    page_background: "background"
    section_alt: "surface"           # Jede zweite Sektion
    card_background: "surface"
    input_background: "surface_light"
    
  gold:
    cta_buttons: "gold_primary"
    icons: "gold_primary"
    badges: "gold_primary (Text) + rgba(201,169,98,0.15) (BG)"
    links_hover: "gold_light"
    borders_accent: "gold_dark"
    decorative: "gold_primary"
    
  text:
    headings: "text_primary"
    body: "text_secondary"
    labels: "text_tertiary"
    cta_button_text: "background"    # Schwarz auf Gold
```

---

## Typografie

### Schriftfamilien

```yaml
FONTS:
  display:
    family: "Playfair Display"
    source: "Google Fonts"
    variable: "--font-playfair"
    usage: "Überschriften (H1, H2), Statistik-Zahlen, Sektions-Nummern"
    character: "Elegant, serif, editorial"
    
  body:
    family: "Inter"
    source: "Google Fonts"
    variable: "--font-inter"
    usage: "Body-Text, Buttons, Navigation, Labels, Beschreibungen"
    character: "Modern, clean, excellent readability"
    
  mono:
    family: "JetBrains Mono"
    source: "Google Fonts"
    variable: "--font-jetbrains"
    usage: "Code-Snippets, technische Werte, Badges"
    character: "Technical, developer-focused"
```

### Typografie-Skala

```yaml
TYPE_SCALE:
  # Display (Playfair Display)
  display_hero:
    size: "56px (desktop) / 36px (mobile)"
    weight: "400"
    line_height: "1.1"
    letter_spacing: "-1.5px"
    usage: "Nur H1 auf Homepage"
    
  display_section:
    size: "40px (desktop) / 28px (mobile)"
    weight: "400"
    line_height: "1.2"
    letter_spacing: "-1px"
    usage: "H2 Sektions-Überschriften"
    
  display_stat:
    size: "48px (desktop) / 36px (mobile)"
    weight: "700"
    line_height: "1.0"
    color: "gold_primary"
    usage: "AnimatedCounter, große Kennzahlen"
    
  # Body (Inter)
  body_large:
    size: "18px"
    weight: "400"
    line_height: "1.7"
    usage: "Hero-Sublines, Lead-Text"
    
  body_default:
    size: "16px"
    weight: "400"
    line_height: "1.6"
    usage: "Standard Body-Text"
    
  body_small:
    size: "14px"
    weight: "400"
    line_height: "1.5"
    usage: "Karten-Beschreibungen, Meta-Infos"
    
  body_xs:
    size: "12px"
    weight: "400"
    line_height: "1.4"
    usage: "Copyright, Fußnoten"
    
  # UI (Inter)
  button:
    size: "15px"
    weight: "600"
    letter_spacing: "0"
    
  label:
    size: "10-12px"
    weight: "600"
    letter_spacing: "2-2.5px"
    text_transform: "uppercase"
    color: "gold_primary"
    usage: "Badges, Sektions-Labels"
    
  nav_link:
    size: "14-15px"
    weight: "500"
    usage: "Navigation Desktop"
```

---

## Spacing System

```yaml
SPACING:
  base: "8px"
  
  scale:
    xs: "4px"       # 0.5 × base
    sm: "8px"       # 1 × base
    md: "16px"      # 2 × base
    lg: "24px"      # 3 × base
    xl: "32px"      # 4 × base
    2xl: "48px"     # 6 × base
    3xl: "64px"     # 8 × base
    4xl: "96px"     # 12 × base
    
  usage:
    section_padding_y: "96px (py-24) desktop / 64px (py-16) mobile"
    section_padding_y_lg: "128px (py-32) desktop"
    container_padding_x: "16px (px-4) mobile / 24px (px-6) tablet / 32px (px-8) desktop"
    card_padding: "24px"
    card_gap: "16px"
    section_gap: "48px"
    component_gap: "12-16px"
    text_gap: "8px"
```

---

## Border & Radius

```yaml
BORDERS:
  radius:
    sm: "4px"      # Kleine Elemente (Badges, Chips)
    md: "8px"      # Inputs, kleine Karten
    lg: "12px"     # Buttons
    xl: "16px"     # Große Karten
    2xl: "24px"    # Hero-Elemente, Glasskarten
    full: "9999px" # Runde Badges, Avatare
    
  stroke:
    default: "1px solid rgba(201, 169, 98, 0.15)"    # Subtiler Gold-Rand
    hover: "1px solid rgba(201, 169, 98, 0.3)"       # Verstärkter Gold-Rand
    active: "1px solid rgba(201, 169, 98, 0.5)"      # Aktiver Gold-Rand
    glass: "1px solid rgba(201, 169, 98, 0.2)"       # Glass-Card-Rand
    input: "1px solid rgba(255, 255, 255, 0.1)"      # Input-Rand
    input_focus: "1px solid #C9A962"                  # Input-Focus
```

---

## Shadows

```yaml
SHADOWS:
  sm: "0 2px 8px rgba(0, 0, 0, 0.2)"        # Buttons, kleine Elemente
  md: "0 4px 16px rgba(0, 0, 0, 0.3)"       # Karten
  lg: "0 8px 24px rgba(0, 0, 0, 0.4)"       # Modale, Dropdown
  gold: "0 0 20px rgba(201, 169, 98, 0.3)"  # Gold-Glow auf Hover
  
  usage:
    card_default: "sm"
    card_hover: "md + gold"
    dropdown: "lg"
    header: "0 1px 0 rgba(201, 169, 98, 0.1)"
```

---

## Glass-Effekt (Glassmorphismus)

```yaml
GLASS:
  background: "rgba(255, 255, 255, 0.05)"
  border: "1px solid rgba(201, 169, 98, 0.2)"
  blur: "16px"                                  # backdrop-blur-lg
  
  css: >
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(201, 169, 98, 0.2);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    
  usage:
    header: "Sticky Header mit Glass-Effekt"
    cards: "GlassCard Komponente"
    modal: "Modal-Hintergrund"
    tooltip: "Tooltip-Container"
```

---

## Animation & Motion

```yaml
ANIMATION:
  timing:
    fast: "150ms"     # Hover-States, Mikro-Interaktionen
    normal: "300ms"   # Transitionen, Accordion, Tabs
    slow: "500ms"     # Seitenwechsel, Modal Open/Close
    
  easing:
    default: "cubic-bezier(0.4, 0, 0.2, 1)"   # Für alles
    in: "cubic-bezier(0.4, 0, 1, 1)"           # Einblenden
    out: "cubic-bezier(0, 0, 0.2, 1)"          # Ausblenden
    
  scroll_animations:
    fade_in:
      initial: "{ opacity: 0, y: 20 }"
      animate: "{ opacity: 1, y: 0 }"
      transition: "{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }"
      
    slide_up:
      initial: "{ opacity: 0, y: 40 }"
      animate: "{ opacity: 1, y: 0 }"
      transition: "{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }"
      
    stagger:
      parent: "{ staggerChildren: 0.1 }"
      child: "fade_in"
      
  hover_states:
    button_primary: "bg-gold → bg-gold-light, scale(1.02), shadow-gold"
    button_secondary: "border-opacity 0.5 → 0.8"
    card: "translateY(-4px), shadow upgrade, border-opacity increase"
    nav_link: "text-secondary → text-primary, underline offset"
    image: "scale(1.03), brightness increase"
```

---

## Komponenten-Patterns

### Button Variants

```yaml
BUTTONS:
  primary:
    bg: "gold_primary"
    text: "background"
    hover_bg: "gold_light"
    padding: "14px 28px"
    radius: "12px"
    font: "Inter 600 15px"
    shadow_hover: "shadow-gold"
    
  secondary:
    bg: "transparent"
    text: "gold_primary"
    border: "1px solid rgba(201, 169, 98, 0.5)"
    hover_border: "1px solid rgba(201, 169, 98, 0.8)"
    padding: "14px 28px"
    radius: "12px"
    
  ghost:
    bg: "transparent"
    text: "text_secondary"
    hover_text: "text_primary"
    padding: "8px 16px"
```

### Card Variants

```yaml
CARDS:
  glass_card:
    bg: "rgba(255, 255, 255, 0.05)"
    border: "1px solid rgba(201, 169, 98, 0.15)"
    radius: "20px"
    padding: "24px"
    hover: "border-opacity increase, translateY(-4px)"
    
  service_card:
    bg: "rgba(255, 255, 255, 0.03)"
    border: "1px solid rgba(201, 169, 98, 0.15)"
    radius: "16px"
    padding: "24px"
    content: "Icon → Title → Description → Link"
    
  stat_card:
    bg: "rgba(201, 169, 98, 0.08)"
    radius: "16px"
    padding: "24px"
    content: "Zahl (Playfair, Gold) → Label (Inter, Secondary)"
```

### Badge Pattern

```yaml
BADGE:
  bg: "rgba(201, 169, 98, 0.15)"
  border: "1px solid rgba(201, 169, 98, 0.3)"
  text_color: "gold_primary"
  font: "Inter 600 10px, uppercase, letter-spacing 2.5px"
  padding: "8px 16px"
  radius: "full (9999px)"
  icon: "Optional Lucide Icon links (14px)"
```

---

## Responsive Design Tokens

```yaml
BREAKPOINTS:
  xs: "320px"     # Kleine Smartphones
  sm: "375px"     # Standard Smartphones
  md: "768px"     # Tablets
  lg: "1024px"    # Laptops
  xl: "1440px"    # Desktop
  2xl: "1920px"   # Widescreen
  
  max_content_width: "1280px"  # max-w-7xl
  
RESPONSIVE_RULES:
  font_scaling:
    h1: "36px → 48px → 56px"     # mobile → tablet → desktop
    h2: "28px → 32px → 40px"
    body: "16px (konstant)"
    
  grid:
    services: "1col → 2col → 3col"
    stats: "2col → 4col"
    team: "1col → 2col → 4col"
    
  spacing:
    section_py: "64px → 96px → 128px"
    container_px: "16px → 24px → 32px"
```

---

## Favicon & Icons

```yaml
FAVICON:
  format: "SVG primary, PNG fallback"
  sizes: [16, 32, 48, 180, 192, 512]
  theme_color: "#C9A962"
  background_color: "#0A0A0A"
  design: "Stilisiertes 'E' oder abstrakte KI-Darstellung in Gold auf Schwarz"

ICON_LIBRARY:
  library: "Lucide React"
  style: "Outline (stroke-width 2)"
  default_size: "24px"
  accent_color: "gold_primary"
  default_color: "text_secondary"
```
