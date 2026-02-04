# SEO-Modul: Keyword-Strategie

> **Referenziert von:** Phase 2 (Core Dev), Phase 7 (SEO)
> **Ziel:** Keyword-Mapping für alle Seiten der Website

---

## Primäre Keyword-Map

### Homepage

```yaml
URL: /
H1: "KI Agentur Deutschland – Ihre Experten für künstliche Intelligenz"
Title: "KI Agentur Deutschland – KI-Beratung & Entwicklung | {{PROJECT_NAME}}"
Description: "Ihre KI-Agentur für künstliche Intelligenz. ✓ KI-Beratung ✓ ChatGPT Integration ✓ Prozessautomatisierung ✓ KI-Workshops. Jetzt kostenlose Beratung."

Primary Keyword: "KI Agentur"
Secondary Keywords:
  - KI Agentur Deutschland
  - KI Beratung
  - Künstliche Intelligenz Agentur
  - AI Agentur
  - KI Consulting

LSI Keywords (im Fließtext einbauen):
  - Machine Learning
  - Prozessautomatisierung
  - ChatGPT
  - KI-Implementierung
  - Digitale Transformation
  - KI-Strategie
  - Automatisierung
  - Deep Learning
  - Natural Language Processing
  - Computer Vision
```

### Service-Seiten

```yaml
# ── KI-Beratung ──────────────────────────────────
URL: /leistungen/ki-beratung
H1: "KI-Beratung – Strategische Beratung für künstliche Intelligenz"
Title: "KI-Beratung – Strategisch & Praxisnah | {{PROJECT_NAME}}"
Description: "Professionelle KI-Beratung für Ihr Unternehmen. Wir identifizieren KI-Potenziale, entwickeln Strategien und begleiten die Implementierung. Jetzt beraten lassen."

Primary: "KI Beratung"
Secondary: "KI Consulting", "KI Strategie Beratung", "KI Beratung Unternehmen"

# ── KI-Automatisierung ──────────────────────────
URL: /leistungen/ki-automatisierung
H1: "KI-Automatisierung – Intelligente Prozessautomatisierung"
Title: "KI-Automatisierung – Prozesse intelligent automatisieren | {{PROJECT_NAME}}"
Description: "KI-basierte Automatisierung Ihrer Geschäftsprozesse. ✓ RPA ✓ Intelligent Document Processing ✓ Workflow-Automatisierung. Bis zu 80% Zeitersparnis."

Primary: "KI Automatisierung"
Secondary: "Prozessautomatisierung KI", "Intelligente Automatisierung", "RPA KI"

# ── KI-Workshop ──────────────────────────────────
URL: /leistungen/ki-workshop
H1: "KI-Workshop – Praxisnahes Training für Ihr Team"
Title: "KI-Workshop & Training für Unternehmen | {{PROJECT_NAME}}"
Description: "Maßgeschneiderte KI-Workshops für Ihr Team. ✓ ChatGPT Schulung ✓ Prompt Engineering ✓ KI-Kompetenz aufbauen. Jetzt Workshop buchen."

Primary: "KI Workshop"
Secondary: "KI Schulung", "KI Training Unternehmen", "ChatGPT Workshop"

# ── ChatGPT Beratung ────────────────────────────
URL: /leistungen/chatgpt-beratung
H1: "ChatGPT Beratung – Expertenwissen für KI-gestützte Kommunikation"
Title: "ChatGPT Beratung & Integration für Unternehmen | {{PROJECT_NAME}}"
Description: "Professionelle ChatGPT Beratung: Integration, Custom GPTs, Prompt Engineering und Datenschutz. DSGVO-konforme Lösungen für Ihr Unternehmen."

Primary: "ChatGPT Beratung"
Secondary: "ChatGPT Integration", "ChatGPT für Unternehmen", "GPT Beratung"

# ── KI-Implementierung ──────────────────────────
URL: /leistungen/ki-implementierung
H1: "KI-Implementierung – Von der Idee zur fertigen KI-Lösung"
Title: "KI-Implementierung – Maßgeschneiderte KI-Lösungen | {{PROJECT_NAME}}"
Description: "Professionelle KI-Implementierung für Ihr Unternehmen. Von MVP bis Produktivsystem. ✓ Machine Learning ✓ NLP ✓ Computer Vision. Jetzt starten."

Primary: "KI Implementierung"
Secondary: "KI Entwicklung", "Machine Learning Implementierung", "KI Projekt"

# ── KI-Strategie ─────────────────────────────────
URL: /leistungen/ki-strategie
H1: "KI-Strategie – Der Fahrplan für Ihre KI-Transformation"
Title: "KI-Strategie entwickeln – Roadmap für KI im Unternehmen | {{PROJECT_NAME}}"
Description: "Entwickeln Sie eine klare KI-Strategie für Ihr Unternehmen. ✓ KI-Readiness Assessment ✓ Use-Case Priorisierung ✓ Roadmap. Kostenlose Erstberatung."

Primary: "KI Strategie"
Secondary: "KI Roadmap", "KI Transformation", "KI Readiness"
```

### Stadt-Seiten Pattern

```yaml
URL: /ki-agentur-{{stadt-slug}}
H1: "KI Agentur {{Stadtname}} – KI-Beratung & Entwicklung in {{Stadtname}}"
Title: "KI Agentur {{Stadtname}} – Ihre KI-Experten vor Ort | {{PROJECT_NAME}}"
Description: "Ihre KI-Agentur in {{Stadtname}}. Maßgeschneiderte KI-Lösungen für Unternehmen in {{Stadtname}} und {{Region}}. ✓ Kostenlose Beratung ✓ Vor-Ort-Termine"

Primary: "KI Agentur {{Stadtname}}"
Secondary: "KI Beratung {{Stadtname}}", "Künstliche Intelligenz {{Stadtname}}"
```

### Blog-Themen (Initial)

```yaml
PILLAR_ARTICLES:
  - title: "Der ultimative Guide zur KI-Automatisierung 2026"
    slug: "ki-automatisierung-guide"
    keyword: "KI Automatisierung"
    word_count: 4000-5000
    
  - title: "KI für den Mittelstand – So starten Sie richtig"
    slug: "ki-mittelstand"
    keyword: "KI Mittelstand"
    word_count: 3000-4000

CLUSTER_ARTICLES:
  - title: "ChatGPT für Unternehmen: Best Practices 2026"
    slug: "chatgpt-unternehmen"
    keyword: "ChatGPT Unternehmen"
    links_to_pillar: "ki-automatisierung-guide"
    
  - title: "Agentic AI erklärt: Was sind KI-Agenten?"
    slug: "agentic-ai-erklaert"
    keyword: "Agentic AI"
    links_to_pillar: "ki-automatisierung-guide"

  - title: "KI-Kosten: Was kostet ein KI-Projekt wirklich?"
    slug: "ki-kosten"
    keyword: "KI Kosten"
    links_to_pillar: "ki-mittelstand"

  - title: "EU AI Act: Was Unternehmen jetzt wissen müssen"
    slug: "eu-ai-act"
    keyword: "EU AI Act"
    links_to_pillar: "ki-mittelstand"

  - title: "Prompt Engineering: Die 10 wichtigsten Techniken"
    slug: "prompt-engineering-techniken"
    keyword: "Prompt Engineering"
    links_to_pillar: "ki-automatisierung-guide"

  - title: "ROI von KI-Projekten messen und nachweisen"
    slug: "roi-ki-projekte"
    keyword: "ROI KI"
    links_to_pillar: "ki-mittelstand"
```

---

## Keyword-Dichte Regeln

```yaml
DENSITY_RULES:
  primary_keyword:
    min: 0.8%
    max: 2.0%
    first_appearance: "Innerhalb der ersten 100 Wörter"
    in_h1: true
    in_title: true
    in_meta_description: true
    in_url: true (wenn möglich)
    
  secondary_keywords:
    min: 0.3%
    max: 1.0%
    distribution: "Gleichmäßig über den gesamten Text"
    
  lsi_keywords:
    usage: "Natürlich im Fließtext, nicht forciert"
    min_different: 5  # Mindestens 5 verschiedene LSI Keywords pro Seite
```

---

## Suchintent-Mapping

| Keyword | Intent | Seitentyp | CTA |
|---------|--------|-----------|-----|
| KI Agentur | Transactional | Homepage | Beratung anfragen |
| KI Beratung | Transactional | Service | Beratungstermin |
| KI Automatisierung | Mixed | Service + Blog | Demo anfragen |
| ChatGPT Beratung | Transactional | Service | Workshop buchen |
| KI Workshop | Transactional | Service | Workshop buchen |
| KI Kosten | Informational | Blog | Kostenlose Analyse |
| Was ist KI | Informational | Blog | Newsletter |
| KI Agentur Berlin | Transactional/Local | Stadt-Seite | Vor-Ort-Termin |
