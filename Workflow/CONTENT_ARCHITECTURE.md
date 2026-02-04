# SEO-Modul: Content Architecture

> **Referenziert von:** Phase 7 (SEO Deep Optimization)
> **Ziel:** Content-Silos, Pillar-Cluster-Modell, Internal Linking, Blog-Kalender

---

## Content-Silo Übersicht

```
                    ┌─────────────────┐
                    │    HOMEPAGE      │
                    │  "KI Agentur"   │
                    │  (Hub, 3000+ W) │
                    └────────┬────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
    │  SILO 1   │     │  SILO 2   │     │  SILO 3   │
    │ Services  │     │   Blog    │     │  Lokal    │
    │           │     │ (Pillar+  │     │ (20 Stadt │
    │ 6 Seiten  │     │  Cluster) │     │  seiten)  │
    └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
          │                 │                  │
    ┌─────┼─────┐     ┌─────┼─────┐     ┌─────┼─────┐
    │     │     │     │     │     │     │     │     │
   KI   KI   Chat   Pill  Clus  Clus  Ber  Mün  Ham
   Ber. Auto. GPT   ar1   ter   ter   lin  chen burg
                           1..6  7..12       ...
```

---

## Silo 1: Service-Seiten

### Hierarchie

```yaml
SILO_SERVICES:
  hub: /leistungen
  spokes:
    - /leistungen/ki-beratung
    - /leistungen/ki-automatisierung
    - /leistungen/ki-workshop
    - /leistungen/chatgpt-beratung
    - /leistungen/ki-implementierung
    - /leistungen/ki-strategie
```

### Content-Anforderungen pro Service-Seite

```yaml
SERVICE_PAGE_TEMPLATE:
  word_count: 1500-2500
  
  sections:
    - name: "Hero"
      content: "H1 mit Primary Keyword + Subline + CTA"
      
    - name: "Problem-Beschreibung"
      content: "Welche Herausforderungen löst dieser Service?"
      word_count: 200-300
      
    - name: "Lösung / Unser Ansatz"
      content: "Wie wir das Problem lösen — konkret und greifbar"
      word_count: 300-400
      
    - name: "Leistungsumfang"
      content: "Was genau beinhaltet der Service? (3-6 Unterpunkte)"
      word_count: 300-400
      
    - name: "Prozess"
      content: "4-6 Schritte von der Anfrage bis zur Umsetzung"
      schema: "HowTo"
      word_count: 200-300
      
    - name: "Case Study / Ergebnisse"
      content: "Konkretes Beispiel mit Zahlen (ROI, Zeitersparnis, etc.)"
      word_count: 200-300
      
    - name: "FAQ"
      content: "5-8 service-spezifische Fragen"
      schema: "FAQPage"
      word_count: 300-500
      
    - name: "CTA"
      content: "Abschließender Call-to-Action"
      
  internal_links:
    min: 5
    max: 15
    must_link_to:
      - Homepage (via Breadcrumb)
      - Mindestens 2 andere Service-Seiten
      - Mindestens 1 relevanter Blog-Artikel
      - Kontakt-Seite
      - Mindestens 1 Stadt-Seite
```

### Querverweise zwischen Services

```yaml
CROSS_LINKING:
  ki-beratung:
    links_to: [ki-strategie, ki-implementierung, ki-workshop]
    context: "Nach der Beratung folgt die Strategie und Implementierung"
    
  ki-automatisierung:
    links_to: [ki-implementierung, chatgpt-beratung, ki-beratung]
    context: "Automatisierung umfasst oft ChatGPT-Integration"
    
  ki-workshop:
    links_to: [chatgpt-beratung, ki-beratung, ki-strategie]
    context: "Workshops als Einstieg vor Beratung und Strategie"
    
  chatgpt-beratung:
    links_to: [ki-automatisierung, ki-workshop, ki-implementierung]
    context: "ChatGPT als Baustein größerer Automatisierungsprojekte"
    
  ki-implementierung:
    links_to: [ki-beratung, ki-automatisierung, ki-strategie]
    context: "Implementierung als logischer nächster Schritt"
    
  ki-strategie:
    links_to: [ki-beratung, ki-implementierung, ki-workshop]
    context: "Strategie als Grundlage für alle Maßnahmen"
```

---

## Silo 2: Blog (Pillar-Cluster-Modell)

### Topic Cluster 1: KI-Automatisierung

```yaml
CLUSTER_AUTOMATISIERUNG:
  pillar:
    title: "Der ultimative Guide zur KI-Automatisierung 2026"
    slug: "ki-automatisierung-guide"
    word_count: 4000-5000
    keyword: "KI Automatisierung"
    url: /blog/ki-automatisierung-guide
    description: >
      Umfassender Leitfaden: Was ist KI-Automatisierung, welche Technologien
      gibt es, wie startet man, welche ROI ist realistisch, Best Practices
      und Fallstudien aus dem DACH-Raum.
    
  cluster_articles:
    - title: "ChatGPT für Unternehmen: Best Practices 2026"
      slug: "chatgpt-unternehmen"
      keyword: "ChatGPT Unternehmen"
      word_count: 1500-2500
      link_to_pillar: "Mehr über KI-Automatisierung im Gesamtkontext"
      
    - title: "Agentic AI erklärt: Was sind KI-Agenten?"
      slug: "agentic-ai-erklaert"
      keyword: "Agentic AI"
      word_count: 2000-3000
      link_to_pillar: "KI-Agenten als nächste Stufe der Automatisierung"
      
    - title: "Prompt Engineering: Die 10 wichtigsten Techniken"
      slug: "prompt-engineering-techniken"
      keyword: "Prompt Engineering"
      word_count: 2000-3000
      link_to_pillar: "Prompt Engineering als Schlüsseldisziplin"
      
    - title: "RPA vs. KI-Automatisierung: Was ist der Unterschied?"
      slug: "rpa-vs-ki-automatisierung"
      keyword: "RPA KI"
      word_count: 1500-2000
      link_to_pillar: "Einordnung im Kontext der KI-Automatisierung"
      
    - title: "KI-Automatisierung im Mittelstand: Praxisbeispiele"
      slug: "ki-automatisierung-mittelstand"
      keyword: "KI Automatisierung Mittelstand"
      word_count: 2000-2500
      link_to_pillar: "Vertiefung des Mittelstand-Kapitels aus dem Guide"
      
    - title: "Intelligent Document Processing (IDP) erklärt"
      slug: "intelligent-document-processing"
      keyword: "Intelligent Document Processing"
      word_count: 1500-2000
      link_to_pillar: "IDP als Teilbereich der KI-Automatisierung"
```

### Topic Cluster 2: KI für den Mittelstand

```yaml
CLUSTER_MITTELSTAND:
  pillar:
    title: "KI für den Mittelstand — So starten Sie richtig"
    slug: "ki-mittelstand"
    keyword: "KI Mittelstand"
    word_count: 3000-4000
    url: /blog/ki-mittelstand
    description: >
      Praktischer Leitfaden für mittelständische Unternehmen: KI-Readiness 
      prüfen, Use-Cases identifizieren, Budget planen, Team aufbauen, 
      erste Projekte umsetzen, typische Fehler vermeiden.
    
  cluster_articles:
    - title: "KI-Kosten: Was kostet ein KI-Projekt wirklich?"
      slug: "ki-kosten"
      keyword: "KI Kosten"
      word_count: 2000-2500
      link_to_pillar: "Kosten-Kapitel im Mittelstand-Guide vertiefen"
      
    - title: "EU AI Act: Was Unternehmen jetzt wissen müssen"
      slug: "eu-ai-act"
      keyword: "EU AI Act"
      word_count: 2000-3000
      link_to_pillar: "Regulierung als Faktor für KI im Mittelstand"
      
    - title: "ROI von KI-Projekten messen und nachweisen"
      slug: "roi-ki-projekte"
      keyword: "ROI KI"
      word_count: 1500-2000
      link_to_pillar: "ROI-Berechnung als Entscheidungsgrundlage"
      
    - title: "KI-Readiness Assessment: Ist Ihr Unternehmen bereit?"
      slug: "ki-readiness-assessment"
      keyword: "KI Readiness"
      word_count: 1500-2000
      link_to_pillar: "Readiness als erster Schritt im KI-Guide"
      
    - title: "Machine Learning vs. Deep Learning vs. GenAI: Ein Überblick"
      slug: "ml-dl-genai-ueberblick"
      keyword: "Machine Learning Deep Learning"
      word_count: 2000-2500
      link_to_pillar: "Technologie-Grundlagen für den Mittelstand"
      
    - title: "Datenschutz und KI: DSGVO-konforme KI-Lösungen"
      slug: "datenschutz-ki-dsgvo"
      keyword: "KI DSGVO"
      word_count: 1500-2000
      link_to_pillar: "Datenschutz-Kapitel im Mittelstand-Guide vertiefen"
```

---

## Pillar Page Aufbau (Template)

```yaml
PILLAR_PAGE_STRUCTURE:
  word_count: 3000-5000
  
  sections:
    01_hero:
      content: "H1 + Einleitung (100-200 Wörter)"
      keyword_placement: "H1 + erste 100 Wörter"
      
    02_table_of_contents:
      content: "Interaktives Inhaltsverzeichnis mit Sprungmarken"
      seo_benefit: "Featured Snippet Potential"
      
    03_definition:
      content: "Was ist [Thema]? Klare Definition"
      word_count: 200-300
      schema: "Potential für FAQ Featured Snippet"
      
    04_deep_dive:
      content: "3-5 Hauptkapitel mit H2-Überschriften"
      word_count: 1500-2500
      internal_links: "Cluster-Artikel an relevanten Stellen verlinken"
      
    05_case_studies:
      content: "1-2 konkrete Praxisbeispiele mit Zahlen"
      word_count: 300-500
      
    06_comparison:
      content: "Vergleichstabelle oder Vor-/Nachteile"
      seo_benefit: "Tabellen-Rich-Result Potential"
      
    07_faq:
      content: "8-12 häufig gestellte Fragen"
      schema: "FAQPage"
      word_count: 500-800
      
    08_conclusion:
      content: "Zusammenfassung + CTA"
      word_count: 150-200
      
    09_related_articles:
      content: "Links zu allen Cluster-Artikeln"
      display: "Grid mit Thumbnail, Title, Excerpt"
```

---

## Internal Linking Strategie (Gesamtarchitektur)

### Link-Fluss-Diagramm

```
Homepage (PageRank-Hub)
  ├── → Alle 6 Services (über ServicesGrid)
  ├── → Top 3 Blog-Artikel (über BlogTeaser)
  ├── → Top 5 Städte (über Footer / CityLinks)
  ├── → Über Uns (über CTA oder Team-Sektion)
  └── → Kontakt (über Hero CTA + Footer)

Service-Seiten (pro Seite)
  ├── → Homepage (Breadcrumb)
  ├── → 2-3 andere Services (Querverweise)
  ├── → 1-2 relevante Blog-Artikel
  ├── → 1-2 Stadt-Seiten
  └── → Kontakt (CTA)

Blog Pillar Pages
  ├── → Homepage (Breadcrumb)
  ├── → Alle Cluster-Artikel (Related Articles Grid)
  ├── → 2-3 relevante Services
  └── → Kontakt (CTA)

Blog Cluster-Artikel
  ├── → Pillar Page (IMMER, 2x)
  ├── → 2-3 andere Cluster-Artikel
  ├── → 1-2 relevante Services
  └── → Kontakt (CTA)

Stadt-Seiten (pro Seite)
  ├── → Homepage (Breadcrumb)
  ├── → Alle 6 Services
  ├── → 2-3 Nachbar-Städte
  ├── → 1-2 Blog-Artikel
  └── → Kontakt (CTA)
```

### Anchor-Text Regeln

```yaml
ANCHOR_TEXT_RULES:
  - "Exakt-Match Keyword MAXIMAL 1x pro Seite"
  - "Variationen und natürliche Formulierungen bevorzugen"
  - "NIEMALS 'hier klicken' oder 'mehr erfahren' als Anchor"
  - "Anchor-Text muss den Zielinhalt beschreiben"
  
  examples_good:
    - "unsere KI-Beratung für Unternehmen"
    - "erfahren Sie mehr über KI-Automatisierung"
    - "im Guide zur KI-Automatisierung 2026"
    - "KI-Experten in München"
    
  examples_bad:
    - "hier klicken"
    - "mehr erfahren"
    - "Link"
    - "Seite besuchen"
```

### Minimum/Maximum Links pro Seite

```yaml
LINK_DENSITY:
  homepage:
    internal_min: 20
    internal_max: 50
    external: 0
    
  service_pages:
    internal_min: 5
    internal_max: 20
    external: 0-2
    
  blog_pillar:
    internal_min: 10
    internal_max: 30
    external: 2-5
    
  blog_cluster:
    internal_min: 5
    internal_max: 15
    external: 1-3
    
  city_pages:
    internal_min: 8
    internal_max: 20
    external: 1-3
```

---

## Blog-Kalender (Erste 3 Monate)

```yaml
MONTH_1:
  week_1:
    type: "Pillar Page"
    article: "Der ultimative Guide zur KI-Automatisierung 2026"
    priority: "HIGHEST"
  week_2:
    type: "Cluster"
    article: "ChatGPT für Unternehmen: Best Practices 2026"
  week_3:
    type: "Cluster"
    article: "Agentic AI erklärt: Was sind KI-Agenten?"
  week_4:
    type: "Cluster"
    article: "Prompt Engineering: Die 10 wichtigsten Techniken"

MONTH_2:
  week_1:
    type: "Pillar Page"
    article: "KI für den Mittelstand — So starten Sie richtig"
    priority: "HIGHEST"
  week_2:
    type: "Cluster"
    article: "KI-Kosten: Was kostet ein KI-Projekt wirklich?"
  week_3:
    type: "Cluster"
    article: "EU AI Act: Was Unternehmen jetzt wissen müssen"
  week_4:
    type: "Cluster"
    article: "ROI von KI-Projekten messen und nachweisen"

MONTH_3:
  week_1:
    type: "Cluster"
    article: "RPA vs. KI-Automatisierung: Was ist der Unterschied?"
  week_2:
    type: "Cluster"
    article: "KI-Readiness Assessment: Ist Ihr Unternehmen bereit?"
  week_3:
    type: "Cluster"
    article: "Machine Learning vs. Deep Learning vs. GenAI"
  week_4:
    type: "Cluster"
    article: "Datenschutz und KI: DSGVO-konforme KI-Lösungen"
```

---

## E-E-A-T Content-Signale

```yaml
EEAT_SIGNALS:
  experience:
    - "Case Studies mit konkreten Zahlen (ROI, Zeitersparnis)"
    - "Kundenlogos und Referenzen"
    - "Screenshots von echten Projekten"
    - "Formulierungen wie 'In unserer Arbeit mit 50+ Unternehmen...'"
    
  expertise:
    - "Autoren-Bio mit Qualifikationen auf jedem Blog-Artikel"
    - "Spezifische Fachbegriffe korrekt verwenden"
    - "Tiefe über Breite: Lieber 1 Thema erschöpfend als 10 oberflächlich"
    - "Aktuelle Daten und Statistiken (2025/2026)"
    
  authoritativeness:
    - "Erwähnungen in Fachpresse (PressSection)"
    - "Partnerschaften mit bekannten Unternehmen"
    - "Zertifikate und Qualifikationen"
    - "Vorträge, Webinare, Konferenzen"
    
  trustworthiness:
    - "Impressum mit vollständiger Rechtsform"
    - "DSGVO-konforme Datenschutzerklärung"
    - "SSL/HTTPS (Vercel automatisch)"
    - "Kontaktinformationen leicht auffindbar"
    - "Keine übertriebenen Versprechen"
```

---

## Featured Snippets Optimierung

```yaml
FEATURED_SNIPPET_TARGETS:
  definition_snippets:
    - question: "Was ist eine KI Agentur?"
      answer_format: "Paragraph (40-60 Wörter)"
      placement: "FAQ-Sektion Homepage"
      
    - question: "Was kostet ein KI Projekt?"
      answer_format: "Paragraph + Preisspanne"
      placement: "FAQ-Sektion Homepage + Blog"
      
  list_snippets:
    - question: "Welche KI-Dienstleistungen gibt es?"
      answer_format: "Numbered List (6 Items)"
      placement: "Service-Übersichtsseite"
      
  table_snippets:
    - question: "KI Tools Vergleich"
      answer_format: "Comparison Table"
      placement: "Blog Pillar Page"

SNIPPET_RULES:
  - "Frage als H2 oder H3 formulieren"
  - "Antwort direkt nach der Überschrift (kein Filler)"
  - "Paragraph-Snippets: 40-60 Wörter"
  - "List-Snippets: 5-8 Items mit klarer Struktur"
  - "Table-Snippets: Vergleichstabellen mit HTML table"
```
