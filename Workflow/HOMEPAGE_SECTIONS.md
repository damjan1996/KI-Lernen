# Template: Homepage-Sektionen (20+)

> **Referenziert von:** Phase 2 (Core Dev)
> **Ziel:** Detaillierte Definition jeder Homepage-Sektion inkl. Content, Keyword-Placement, Schema

---

## Übersicht der 20 Sektionen

```
ABOVE THE FOLD
  1. HeroSection           — H1, Subline, 2x CTA
  2. ClientLogos           — Kundenlogos als Trust-Signal

PROBLEM → LÖSUNG
  3. ProblemSection         — 3-4 Schmerzpunkte der Zielgruppe
  4. SolutionSection        — Wie wir diese Probleme lösen

SERVICES
  5. ServicesGrid           — 6 Service-Kacheln mit Icons
  6. ProcessSteps           — 4-Schritte-Prozess

SOCIAL PROOF
  7. CaseStudyHighlight     — Beste Case Study mit harten Zahlen
  8. StatsSection           — 4 animierte Kennzahlen
  9. VideoTestimonial       — Kunden-Testimonial (Video oder Text)

EXPERTISE
  10. TechnologyStack       — Eingesetzte Technologien
  11. IndustrySection        — Branchen die wir bedienen
  12. ComparisonTable        — Mit KI vs. Ohne KI

TRUST
  13. PartnersSection        — Partner, Zertifikate, Mitgliedschaften
  14. TeamPreview            — 3-4 Teammitglieder
  15. PressSection           — Presse-Erwähnungen
  16. TrustSignals           — DSGVO, ISO, Made in Germany

ENGAGEMENT
  17. FAQSection             — 8-12 FAQs mit Schema
  18. BlogTeaser             — 3 aktuelle Blog-Artikel
  19. NewsletterSection      — Newsletter + Lead-Magnet

CONVERSION
  20. CTASection             — Finaler Call-to-Action
```

---

## Sektion 1: HeroSection

```yaml
HERO_SECTION:
  data_testid: "hero-section"
  
  content:
    badge: "Ihre KI-Agentur in Deutschland"
    h1: "KI Agentur Deutschland — Ihre Experten für künstliche Intelligenz"
    subline: >
      Von der KI-Strategie bis zur Implementierung — wir automatisieren
      Ihre Geschäftsprozesse mit modernster künstlicher Intelligenz.
      Maßgeschneidert. Messbar. Nachhaltig.
    cta_primary:
      text: "Kostenlose Beratung"
      href: "/kontakt"
      data_testid: "hero-cta-primary"
    cta_secondary:
      text: "Case Studies ansehen"
      href: "#case-study"
      data_testid: "hero-cta-secondary"
      
  seo:
    keyword_in_h1: "KI Agentur"
    keyword_in_first_100_words: true
    
  design:
    layout: "Text links (60%), visuelles Element rechts (40%)"
    background: "Gradient von background zu surface"
    animation: "Fade-in für Text, Slide-up für CTAs"
    hero_image: "priority Attribut (LCP!)"
```

---

## Sektion 2: ClientLogos

```yaml
CLIENT_LOGOS:
  data_testid: "client-logos"
  
  content:
    headline: "Vertrauen führender Unternehmen"
    logos: 6-8  # Mindestens 6 Logos
    # Placeholder-Logos bis echte verfügbar:
    placeholder_text: "Trusted by 50+ Unternehmen im DACH-Raum"
    
  design:
    layout: "Horizontaler Logo-Streifen, grayscale, hover: color"
    animation: "Infinite scroll (optional) oder statisch"
    opacity: "0.5 default, 1.0 on hover"
    height: "40-60px pro Logo"
```

---

## Sektion 3: ProblemSection

```yaml
PROBLEM_SECTION:
  data_testid: "problem-section"
  
  content:
    badge: "Das Problem"
    h2: "Die Herausforderungen ohne KI"
    problems:
      - icon: "clock"
        title: "Zeitfressende manuelle Prozesse"
        description: "Mitarbeiter verbringen 40% ihrer Zeit mit Routineaufgaben, die automatisiert werden könnten."
      - icon: "trending-down"
        title: "Verpasste Wettbewerbsvorteile"
        description: "Während Ihre Konkurrenz KI einsetzt, bleiben Sie bei manuellen Workflows stehen."
      - icon: "help-circle"
        title: "Fehlende KI-Expertise im Team"
        description: "Der Einstieg in KI scheitert oft am Know-how — nicht am Budget."
      - icon: "alert-triangle"
        title: "Datenchaos statt Datenkultur"
        description: "Wertvolle Daten liegen ungenutzt in Silos, statt Entscheidungen zu treiben."
        
  design:
    layout: "2x2 Grid mit Icon-Cards"
    background: "surface"
    animation: "Staggered fade-in (100ms Delay pro Item)"
```

---

## Sektion 4: SolutionSection

```yaml
SOLUTION_SECTION:
  data_testid: "solution-section"
  
  content:
    badge: "Unsere Lösung"
    h2: "Wie wir Ihr Unternehmen transformieren"
    text: >
      Als spezialisierte KI-Agentur bringen wir nicht nur Technologie,
      sondern Strategie. Wir identifizieren die höchsten Automatisierungspotenziale,
      implementieren maßgeschneiderte Lösungen und schulen Ihr Team.
    highlights:
      - "Bis zu 80% Zeitersparnis bei Routineprozessen"
      - "ROI innerhalb von 3-6 Monaten"
      - "DSGVO-konforme Implementierung"
      - "Langfristige Betreuung und Optimierung"
      
  design:
    layout: "Text links, Illustration/Grafik rechts"
    accent: "Gold-Highlights für die Zahlen"
```

---

## Sektion 5: ServicesGrid

```yaml
SERVICES_GRID:
  data_testid: "services-grid"
  
  content:
    badge: "Leistungen"
    h2: "Unsere KI-Dienstleistungen"
    services:
      - data_testid: "service-card-0"
        icon: "brain"
        title: "KI-Beratung"
        description: "Strategische Beratung für den erfolgreichen Einsatz von KI in Ihrem Unternehmen."
        href: "/leistungen/ki-beratung"
      - data_testid: "service-card-1"
        icon: "zap"
        title: "KI-Automatisierung"
        description: "Intelligente Automatisierung Ihrer Geschäftsprozesse mit messbarem ROI."
        href: "/leistungen/ki-automatisierung"
      - data_testid: "service-card-2"
        icon: "users"
        title: "KI-Workshop"
        description: "Praxisnahe Workshops und Schulungen für Ihr gesamtes Team."
        href: "/leistungen/ki-workshop"
      - data_testid: "service-card-3"
        icon: "message-square"
        title: "ChatGPT Beratung"
        description: "Professionelle ChatGPT-Integration und Custom GPTs für Ihr Unternehmen."
        href: "/leistungen/chatgpt-beratung"
      - data_testid: "service-card-4"
        icon: "code"
        title: "KI-Implementierung"
        description: "Von der Idee zum Produktivsystem — maßgeschneiderte KI-Lösungen."
        href: "/leistungen/ki-implementierung"
      - data_testid: "service-card-5"
        icon: "target"
        title: "KI-Strategie"
        description: "Der Fahrplan für Ihre KI-Transformation mit klarem ROI-Fokus."
        href: "/leistungen/ki-strategie"
        
  design:
    layout: "3x2 Grid (Desktop), 2x3 (Tablet), 1x6 (Mobile)"
    card_style: "GlassCard mit Hover-Lift-Effekt"
    animation: "Staggered slide-up"
```

---

## Sektion 6: ProcessSteps

```yaml
PROCESS_STEPS:
  data_testid: "process-section"
  
  content:
    badge: "Unser Prozess"
    h2: "In 4 Schritten zur KI-Lösung"
    steps:
      - number: "01"
        title: "Analyse & Beratung"
        description: "Wir analysieren Ihre Prozesse und identifizieren die vielversprechendsten KI-Use-Cases."
      - number: "02"
        title: "Strategie & Konzept"
        description: "Wir entwickeln eine maßgeschneiderte KI-Strategie mit klarem ROI-Fokus."
      - number: "03"
        title: "Implementierung"
        description: "Unser Team setzt die KI-Lösung um und integriert sie in Ihre IT-Landschaft."
      - number: "04"
        title: "Optimierung & Support"
        description: "Kontinuierliche Verbesserung und langfristige Betreuung Ihrer Lösung."
    
  schema: "HowTo"  # Referenz: seo/SCHEMA_TEMPLATES.md
  
  design:
    layout: "Horizontal mit Verbindungslinien zwischen Steps"
    numbers: "Gold, Playfair Display, 48px"
    animation: "Sequentielles Einblenden"
```

---

## Sektion 7: CaseStudyHighlight

```yaml
CASE_STUDY:
  data_testid: "case-study-section"
  
  content:
    badge: "Erfolgsgeschichte"
    h2: "80% weniger manueller Aufwand"
    client: "Mittelständisches Logistikunternehmen"
    challenge: "500+ Dokumente täglich manuell verarbeiten"
    solution: "Automatische Dokumentenverarbeitung mit KI"
    results:
      - metric: "80%"
        label: "Weniger manueller Aufwand"
      - metric: "3 Monate"
        label: "Time-to-Value"
      - metric: "250.000€"
        label: "Jährliche Ersparnis"
    quote: "Die KI-Lösung hat unsere Dokumentenverarbeitung revolutioniert. Was früher Stunden dauerte, erledigt die KI in Minuten."
    quote_author: "Geschäftsführer, Logistikunternehmen"
    
  design:
    layout: "Split: Zahlen links, Story rechts"
    accent: "Gold für Metriken"
    animation: "Counter-Animation für Zahlen"
```

---

## Sektion 8: StatsSection

```yaml
STATS_SECTION:
  data_testid: "stats-section"
  
  content:
    stats:
      - data_testid: "stat-0"
        value: 500
        suffix: "+"
        label: "Automatisierte Prozesse"
      - data_testid: "stat-1"
        value: 50
        suffix: "+"
        label: "Zufriedene Kunden"
      - data_testid: "stat-2"
        value: 98
        suffix: "%"
        label: "Kundenzufriedenheit"
      - data_testid: "stat-3"
        value: 80
        suffix: "%"
        label: "Durchschn. Zeitersparnis"
        
  design:
    layout: "4 Spalten nebeneinander"
    counter: "AnimatedCounter Komponente (Intersection Observer)"
    font: "Playfair Display, 48-56px, Gold"
    animation: "Count-up von 0 zum Zielwert"
    trigger: "In-View (Intersection Observer)"
```

---

## Sektionen 9-12: Expertise-Block

```yaml
# 9. VIDEO_TESTIMONIAL
VIDEO_TESTIMONIAL:
  data_testid: "testimonial-section"
  content:
    h2: "Was unsere Kunden sagen"
    # Placeholder bis echtes Video verfügbar:
    text_testimonial:
      quote: "Everlast hat uns nicht nur technisch beraten, sondern auch strategisch begleitet."
      author: "CTO, E-Commerce Unternehmen"
      company_logo: "placeholder"

# 10. TECHNOLOGY_STACK
TECHNOLOGY_STACK:
  data_testid: "tech-stack-section"
  content:
    badge: "Technologien"
    h2: "Modernste KI-Technologien"
    categories:
      - name: "LLMs & GenAI"
        items: ["OpenAI GPT-4o", "Claude", "Llama 3", "Mistral"]
      - name: "Automatisierung"
        items: ["Power Automate", "n8n", "Make", "Zapier"]
      - name: "Frameworks"
        items: ["LangChain", "LlamaIndex", "CrewAI", "AutoGen"]
      - name: "Cloud & Infrastruktur"
        items: ["Azure AI", "AWS Bedrock", "Google Cloud AI", "Vercel"]

# 11. INDUSTRY_SECTION
INDUSTRY_SECTION:
  data_testid: "industry-section"
  content:
    badge: "Branchen"
    h2: "KI-Lösungen für Ihre Branche"
    industries:
      - icon: "building-2"
        name: "Finanzdienstleistungen"
        description: "Compliance-Automatisierung, Fraud Detection, Risikobewertung"
      - icon: "factory"
        name: "Fertigung & Industrie"
        description: "Predictive Maintenance, Qualitätskontrolle, Supply Chain"
      - icon: "stethoscope"
        name: "Gesundheitswesen"
        description: "Medizinische Dokumentation, Befundanalyse, Terminplanung"
      - icon: "shopping-cart"
        name: "E-Commerce & Handel"
        description: "Personalisierung, Preisoptimierung, Chatbots"
      - icon: "truck"
        name: "Logistik & Transport"
        description: "Routenoptimierung, Dokumentenverarbeitung, Tracking"
      - icon: "briefcase"
        name: "Beratung & Dienstleistung"
        description: "Wissensmanagement, Angebotserstellung, Reporting"

# 12. COMPARISON_TABLE
COMPARISON_TABLE:
  data_testid: "comparison-section"
  content:
    h2: "Mit KI vs. Ohne KI"
    rows:
      - category: "Dokumentenverarbeitung"
        without: "4-6 Stunden pro Tag manuell"
        with: "15 Minuten automatisiert"
      - category: "Kundenanfragen"
        without: "24-48h Antwortzeit"
        with: "Sofortige KI-Antwort, 24/7"
      - category: "Datenanalyse"
        without: "Excel-Tabellen, Bauchgefühl"
        with: "Echtzeit-Insights, datengetrieben"
      - category: "Fehlerquote"
        without: "5-15% bei manuellen Prozessen"
        with: "<1% mit KI-Validierung"
      - category: "Skalierung"
        without: "Mehr Mitarbeiter = mehr Kosten"
        with: "KI skaliert ohne Mehrkosten"
```

---

## Sektionen 13-16: Trust-Block

```yaml
# 13. PARTNERS_SECTION
PARTNERS_SECTION:
  data_testid: "partners-section"
  content:
    h2: "Unsere Partner & Zertifikate"
    partners:
      - type: "technology"
        items: ["Microsoft Partner", "OpenAI Partner", "Google Cloud"]
      - type: "certification"
        items: ["ISO 27001", "DSGVO-konform", "BSI-zertifiziert"]

# 14. TEAM_PREVIEW
TEAM_PREVIEW:
  data_testid: "team-section"
  content:
    badge: "Unser Team"
    h2: "Die Menschen hinter der KI"
    description: "Erfahrene Berater, Entwickler und Data Scientists — vereint in der Mission, KI für Unternehmen nutzbar zu machen."
    members: 3-4  # Begrenzt auf Homepage, Rest auf /ueber-uns
    cta:
      text: "Gesamtes Team kennenlernen"
      href: "/ueber-uns"

# 15. PRESS_SECTION
PRESS_SECTION:
  data_testid: "press-section"
  content:
    h2: "Bekannt aus"
    logos: ["Logo 1", "Logo 2", "Logo 3"]  # Platzhalter
    # Alternativ: Presse-Zitate mit Quelle

# 16. TRUST_SIGNALS
TRUST_SIGNALS:
  data_testid: "trust-section"
  content:
    signals:
      - icon: "shield-check"
        text: "DSGVO-konform"
      - icon: "server"
        text: "Hosting in Deutschland"
      - icon: "lock"
        text: "Ende-zu-Ende verschlüsselt"
      - icon: "award"
        text: "Made in Germany"
```

---

## Sektionen 17-20: Engagement & Conversion

```yaml
# 17. FAQ_SECTION
FAQ_SECTION:
  data_testid: "faq-section"
  schema: "FAQPage"  # IMMER mit Schema Markup!
  
  content:
    badge: "Häufige Fragen"
    h2: "FAQ – Ihre Fragen, unsere Antworten"
    items:
      - data_testid: "faq-item-0"
        question: "Was macht eine KI-Agentur?"
        answer: "Eine KI-Agentur berät Unternehmen bei der Einführung und Nutzung von künstlicher Intelligenz. Wir identifizieren Automatisierungspotenziale, entwickeln maßgeschneiderte KI-Lösungen und begleiten die Implementierung von der Strategie bis zum Produktivbetrieb."
      - data_testid: "faq-item-1"
        question: "Wie viel kostet ein KI-Projekt?"
        answer: "Die Kosten variieren je nach Umfang. Ein typisches Beratungsprojekt startet ab 5.000€, während umfassende KI-Implementierungen zwischen 20.000€ und 150.000€ liegen können. Wir bieten eine kostenlose Erstberatung, um Ihr Budget realistisch einzuschätzen."
      - data_testid: "faq-item-2"
        question: "Wie lange dauert die Implementierung einer KI-Lösung?"
        answer: "Ein MVP kann in 4-8 Wochen entwickelt werden. Eine vollständige KI-Lösung mit Integration in bestehende Systeme dauert typischerweise 3-6 Monate."
      - data_testid: "faq-item-3"
        question: "Braucht mein Unternehmen überhaupt KI?"
        answer: "Wenn Sie regelmäßig manuelle, repetitive Aufgaben haben, große Datenmengen verarbeiten oder Kundenanfragen bearbeiten — ja. KI bringt den höchsten ROI bei Prozessen mit hohem Volumen und klar definierten Regeln."
      - data_testid: "faq-item-4"
        question: "Ist KI DSGVO-konform einsetzbar?"
        answer: "Ja, absolut. Wir implementieren ausschließlich DSGVO-konforme Lösungen mit europäischem Hosting, Datenverschlüsselung und transparenter Datenverarbeitung."
      - data_testid: "faq-item-5"
        question: "Welche Branchen bedienen Sie?"
        answer: "Wir arbeiten branchenübergreifend mit Schwerpunkten in Finanzdienstleistungen, Fertigung, Gesundheitswesen, E-Commerce, Logistik und professionellen Dienstleistungen."
      - data_testid: "faq-item-6"
        question: "Arbeiten Sie nur vor Ort oder auch remote?"
        answer: "Beides. Wir bieten Vor-Ort-Workshops und -Beratung in ganz Deutschland sowie vollständig remote durchgeführte Projekte an."
      - data_testid: "faq-item-7"
        question: "Was unterscheidet Sie von anderen KI-Beratungen?"
        answer: "Wir kombinieren strategische Beratung mit technischer Umsetzung. Statt nur Konzepte zu liefern, implementieren wir die Lösungen auch — end-to-end, mit messbarem ROI."
        
  design:
    pattern: "Accordion (nur 1 Item gleichzeitig offen)"
    animation: "Smooth open/close (300ms)"

# 18. BLOG_TEASER
BLOG_TEASER:
  data_testid: "blog-teaser-section"
  content:
    badge: "Blog"
    h2: "Aktuelle Insights"
    articles: 3  # Neueste 3 Blog-Artikel
    cta:
      text: "Alle Artikel lesen"
      href: "/blog"

# 19. NEWSLETTER_SECTION
NEWSLETTER_SECTION:
  data_testid: "newsletter-section"
  content:
    h2: "KI-Insights direkt ins Postfach"
    description: "Monatliche Praxistipps, Trends und Case Studies aus der Welt der künstlichen Intelligenz."
    lead_magnet: "Kostenloses KI-Readiness-Assessment"
    form:
      fields: ["email"]
      cta: "Jetzt anmelden"
    privacy: "Kein Spam. Jederzeit kündbar. DSGVO-konform."

# 20. CTA_SECTION
CTA_SECTION:
  data_testid: "final-cta-section"
  content:
    h2: "Bereit für KI in Ihrem Unternehmen?"
    description: "Vereinbaren Sie ein kostenloses, unverbindliches Erstgespräch mit unseren KI-Experten."
    cta_primary:
      text: "Kostenlose Beratung anfragen"
      href: "/kontakt"
    cta_secondary:
      text: "Oder rufen Sie uns an: {{PHONE}}"
      
  design:
    background: "Gradient mit Gold-Accent"
    layout: "Zentriert, volle Breite"
    animation: "Subtle pulse auf Primary CTA"
```

---

## Technische Regeln für alle Sektionen

```yaml
SECTION_RULES:
  wrapper: >
    Jede Sektion wird in <SectionWrapper> gepackt:
    <section className="py-24 lg:py-32" data-testid="{{testid}}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>

  background_alternation: >
    Sektionen alternieren zwischen background (#0A0A0A) und surface (#141414)
    für visuelle Trennung.

  heading_hierarchy: >
    H1: Nur 1x auf der Seite (HeroSection)
    H2: Jede Sektion hat ein H2
    H3: Innerhalb von Sektionen für Sub-Kategorien

  responsive: >
    Mobile-First: Basis-Layout für 320px
    Tablet: ab 768px (md:)
    Desktop: ab 1024px (lg:)
    Widescreen: ab 1440px (xl:) — max-w-7xl limitiert Content

  animation: >
    Framer Motion InView für Scroll-Animationen
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
```
