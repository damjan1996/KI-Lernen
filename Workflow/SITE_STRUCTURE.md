# Template: Site Structure

> **Referenziert von:** Phase 2 (Core Dev)
> **Ziel:** Vollständige URL-Hierarchie, Routing, Seitentypen und Rendering-Strategie

---

## URL-Hierarchie (Vollständig)

```
https://{{DOMAIN}}
│
├── /                                    ← Homepage (SSG, Priority 1.0)
│
├── /leistungen                          ← Service-Übersicht (SSG, Priority 0.9)
│   ├── /leistungen/ki-beratung          ← Service-Detail (SSG, Priority 0.85)
│   ├── /leistungen/ki-automatisierung   ← Service-Detail (SSG, Priority 0.85)
│   ├── /leistungen/ki-workshop          ← Service-Detail (SSG, Priority 0.85)
│   ├── /leistungen/chatgpt-beratung     ← Service-Detail (SSG, Priority 0.85)
│   ├── /leistungen/ki-implementierung   ← Service-Detail (SSG, Priority 0.85)
│   └── /leistungen/ki-strategie         ← Service-Detail (SSG, Priority 0.85)
│
├── /ueber-uns                           ← Über Uns (SSG, Priority 0.7)
│
├── /blog                                ← Blog-Übersicht (ISR 3600s, Priority 0.8)
│   ├── /blog/ki-automatisierung-guide   ← Pillar Page (ISR 3600s, Priority 0.7)
│   ├── /blog/ki-mittelstand             ← Pillar Page (ISR 3600s, Priority 0.7)
│   ├── /blog/chatgpt-unternehmen        ← Cluster (ISR 3600s, Priority 0.7)
│   ├── /blog/agentic-ai-erklaert        ← Cluster (ISR 3600s, Priority 0.7)
│   └── /blog/[slug]                     ← Dynamischer Blog-Artikel
│
├── /kontakt                             ← Kontaktformular (SSG, Priority 0.6)
│
├── /ki-agentur-berlin                   ← Stadt-Seite (SSG, Priority 0.8)
├── /ki-agentur-muenchen                 ← Stadt-Seite (SSG, Priority 0.8)
├── /ki-agentur-hamburg                  ← Stadt-Seite (SSG, Priority 0.8)
├── /ki-agentur-frankfurt                ← Stadt-Seite (SSG, Priority 0.8)
├── /ki-agentur-koeln                    ← Stadt-Seite (SSG, Priority 0.8)
├── /ki-agentur-stuttgart                ← Stadt-Seite (SSG, Priority 0.7)
├── /ki-agentur-duesseldorf              ← Stadt-Seite (SSG, Priority 0.7)
├── /ki-agentur-karlsruhe               ← Stadt-Seite (SSG, Priority 0.7)
├── /ki-agentur-leipzig                  ← Stadt-Seite (SSG, Priority 0.7)
├── /ki-agentur-darmstadt                ← Stadt-Seite (SSG, Priority 0.7)
├── /ki-agentur-dresden                  ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-nuernberg                ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-hannover                 ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-heidelberg               ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-dortmund                 ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-essen                    ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-bremen                   ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-aachen                   ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-bonn                     ← Stadt-Seite (SSG, Priority 0.6)
├── /ki-agentur-potsdam                  ← Stadt-Seite (SSG, Priority 0.6)
│
├── /impressum                           ← Impressum (SSG, Priority 0.2)
├── /datenschutz                         ← Datenschutz (SSG, Priority 0.2)
│
├── /sitemap.xml                         ← Auto-generiert via sitemap.ts
├── /robots.txt                          ← Auto-generiert via robots.ts
├── /manifest.json                       ← Web App Manifest via manifest.ts
│
└── /api/
    └── /api/revalidate                  ← On-Demand ISR Endpoint (POST)
```

---

## Seitentypen & Rendering

| Seitentyp | Rendering | revalidate | generateStaticParams | Begründung |
|-----------|-----------|------------|---------------------|------------|
| Homepage | SSG | – | – | Statisch, schnellste Ladezeit |
| Leistungen-Übersicht | SSG | – | – | Ändert sich selten |
| Service-Unterseiten | SSG | – | – | Statischer Content |
| Über Uns | SSG | – | – | Statischer Content |
| Blog-Übersicht | ISR | 3600 | – | Neue Artikel regelmäßig |
| Blog-Artikel | ISR | 3600 | `getAllBlogSlugs()` | Aktualität + Performance |
| Kontakt | SSG | – | – | Statisches Formular |
| Stadt-Seiten | SSG | – | `getAllCities()` | 20 Seiten pre-rendern |
| Impressum | SSG | – | – | Rechtliche Seiten |
| Datenschutz | SSG | – | – | Rechtliche Seiten |
| 404 | SSG | – | – | Fehlerseite |

---

## Breadcrumb-Hierarchie

```yaml
BREADCRUMBS:
  homepage:
    display: false  # Keine Breadcrumbs auf Homepage
    
  leistungen_uebersicht:
    crumbs: ["Home → Leistungen"]
    
  service_unterseite:
    crumbs: ["Home → Leistungen → {{Service-Name}}"]
    
  ueber_uns:
    crumbs: ["Home → Über Uns"]
    
  blog_uebersicht:
    crumbs: ["Home → Blog"]
    
  blog_artikel:
    crumbs: ["Home → Blog → {{Artikel-Titel}}"]
    
  kontakt:
    crumbs: ["Home → Kontakt"]
    
  stadt_seite:
    crumbs: ["Home → KI Agentur {{Stadtname}}"]
    
  impressum:
    crumbs: ["Home → Impressum"]
    
  datenschutz:
    crumbs: ["Home → Datenschutz"]
```

---

## Navigation-Struktur

### Desktop Navigation (Header)

```yaml
MAIN_NAV:
  - label: "Leistungen"
    href: "/leistungen"
    dropdown:
      - label: "KI-Beratung"
        href: "/leistungen/ki-beratung"
        icon: "brain"
      - label: "KI-Automatisierung"
        href: "/leistungen/ki-automatisierung"
        icon: "zap"
      - label: "KI-Workshop"
        href: "/leistungen/ki-workshop"
        icon: "users"
      - label: "ChatGPT Beratung"
        href: "/leistungen/chatgpt-beratung"
        icon: "message-square"
      - label: "KI-Implementierung"
        href: "/leistungen/ki-implementierung"
        icon: "code"
      - label: "KI-Strategie"
        href: "/leistungen/ki-strategie"
        icon: "target"
        
  - label: "Über Uns"
    href: "/ueber-uns"
    
  - label: "Blog"
    href: "/blog"
    
  - label: "Kontakt"
    href: "/kontakt"
    variant: "cta"  # Als Button stylen
```

### Footer Navigation

```yaml
FOOTER_SECTIONS:
  column_1:
    title: "Leistungen"
    links:
      - { label: "KI-Beratung", href: "/leistungen/ki-beratung" }
      - { label: "KI-Automatisierung", href: "/leistungen/ki-automatisierung" }
      - { label: "KI-Workshop", href: "/leistungen/ki-workshop" }
      - { label: "ChatGPT Beratung", href: "/leistungen/chatgpt-beratung" }
      - { label: "KI-Implementierung", href: "/leistungen/ki-implementierung" }
      - { label: "KI-Strategie", href: "/leistungen/ki-strategie" }
      
  column_2:
    title: "Standorte"
    links:
      - { label: "KI Agentur Berlin", href: "/ki-agentur-berlin" }
      - { label: "KI Agentur München", href: "/ki-agentur-muenchen" }
      - { label: "KI Agentur Hamburg", href: "/ki-agentur-hamburg" }
      - { label: "KI Agentur Frankfurt", href: "/ki-agentur-frankfurt" }
      - { label: "KI Agentur Köln", href: "/ki-agentur-koeln" }
      - { label: "Alle Standorte →", href: "#standorte" }
      
  column_3:
    title: "Unternehmen"
    links:
      - { label: "Über Uns", href: "/ueber-uns" }
      - { label: "Blog", href: "/blog" }
      - { label: "Kontakt", href: "/kontakt" }
      - { label: "Impressum", href: "/impressum" }
      - { label: "Datenschutz", href: "/datenschutz" }
      
  column_4:
    title: "Kontakt"
    content:
      - "{{COMPANY_NAME}}"
      - "{{STREET}}"
      - "{{ZIP}} {{CITY}}"
      - "Tel: {{PHONE}}"
      - "E-Mail: {{EMAIL}}"
```

---

## App Router Dateistruktur

```
src/app/
├── layout.tsx                            ← Root Layout
├── page.tsx                              ← Homepage
├── not-found.tsx                         ← 404 Seite
├── sitemap.ts                            ← Dynamische Sitemap
├── robots.ts                             ← robots.txt
├── manifest.ts                           ← Web App Manifest
│
├── leistungen/
│   ├── page.tsx                          ← Service-Übersicht
│   ├── layout.tsx                        ← Optional: Shared Layout
│   ├── ki-beratung/
│   │   └── page.tsx
│   ├── ki-automatisierung/
│   │   └── page.tsx
│   ├── ki-workshop/
│   │   └── page.tsx
│   ├── chatgpt-beratung/
│   │   └── page.tsx
│   ├── ki-implementierung/
│   │   └── page.tsx
│   └── ki-strategie/
│       └── page.tsx
│
├── ueber-uns/
│   └── page.tsx
│
├── blog/
│   ├── page.tsx                          ← Blog-Übersicht
│   └── [slug]/
│       └── page.tsx                      ← Einzelner Artikel (ISR)
│
├── kontakt/
│   └── page.tsx
│
├── ki-agentur-[stadt]/
│   └── page.tsx                          ← 20 Stadt-Seiten (SSG)
│
├── impressum/
│   └── page.tsx
│
├── datenschutz/
│   └── page.tsx
│
└── api/
    └── revalidate/
        └── route.ts                      ← On-Demand ISR
```

---

## URL-Konventionen

```yaml
URL_RULES:
  language: "de"
  case: "lowercase"
  separator: "-"
  trailing_slash: false
  
  patterns:
    service: "/leistungen/{{service-slug}}"
    city: "/ki-agentur-{{stadt-slug}}"
    blog: "/blog/{{article-slug}}"
    
  slug_rules:
    - "Nur Kleinbuchstaben, Ziffern, Bindestriche"
    - "Keine Umlaute: ä→ae, ö→oe, ü→ue, ß→ss"
    - "Keine Unterstriche, Punkte oder Sonderzeichen"
    - "Max 60 Zeichen"
    - "Keyword in der URL wenn möglich"
    
  examples:
    good: "/leistungen/ki-beratung"
    bad: "/Leistungen/KI_Beratung/"
    good: "/ki-agentur-muenchen"
    bad: "/ki-agentur-münchen"
    good: "/blog/chatgpt-unternehmen"
    bad: "/blog/2026/01/chatgpt-fuer-unternehmen.html"
```

---

## Gesamtanzahl Seiten

```yaml
PAGE_COUNT:
  homepage: 1
  service_uebersicht: 1
  service_unterseiten: 6
  ueber_uns: 1
  blog_uebersicht: 1
  blog_artikel: 14  # 2 Pillar + 12 Cluster (initial)
  kontakt: 1
  stadt_seiten: 20
  legal: 2  # Impressum + Datenschutz
  error: 1  # 404
  
  total: 48  # Seiten beim Launch
  
  # Wächst durch:
  # - Neue Blog-Artikel (wöchentlich)
  # - Weitere Cluster-Artikel
  # - Optionale: FAQ-Hub-Seite, Karriere, Partner
```
