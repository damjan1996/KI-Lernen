# SEO-Modul: Stadt-Seiten (Lokales SEO)

> **Referenziert von:** Phase 2 (Core Dev), Phase 7 (SEO)
> **Ziel:** 20 Stadt-Seiten mit einzigartigem Content für lokales Ranking

---

## Die 20 Städte (priorisiert)

```typescript
// src/data/cities.ts
export interface CityData {
  slug: string
  name: string
  region: string
  lat: number
  lng: number
  population: string
  priority: 'high' | 'medium' | 'low'
  techFocus: string[]
  keyIndustries: string[]
  universities: string[]
  uniqueContent: string  // Kernaussage für unique Content
}

export const cities: CityData[] = [
  // ═══ PRIORITÄT HOCH (Phase 1) ═══
  {
    slug: 'berlin',
    name: 'Berlin',
    region: 'Berlin',
    lat: 52.520008,
    lng: 13.404954,
    population: '3,7 Mio.',
    priority: 'high',
    techFocus: ['Startups', 'FinTech', 'HealthTech', 'EdTech'],
    keyIndustries: ['Startups & Venture Capital', 'Kreativwirtschaft', 'Tourismus', 'Gesundheitswirtschaft'],
    universities: ['TU Berlin', 'FU Berlin', 'HU Berlin', 'Charité'],
    uniqueContent: 'Europas Startup-Hauptstadt mit über 36% aller deutschen KI-Startups'
  },
  {
    slug: 'muenchen',
    name: 'München',
    region: 'Bayern',
    lat: 48.137154,
    lng: 11.576124,
    population: '1,5 Mio.',
    priority: 'high',
    techFocus: ['Automotive AI', 'Robotik', 'IoT', 'Enterprise AI'],
    keyIndustries: ['Automotive', 'Versicherungen', 'Maschinenbau', 'IT & Software'],
    universities: ['TU München', 'LMU München', 'UnternehmerTUM'],
    uniqueContent: 'Deutschlands führender Standort für Automotive AI und Industrie 4.0'
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    region: 'Hamburg',
    lat: 53.551086,
    lng: 9.993682,
    population: '1,9 Mio.',
    priority: 'high',
    techFocus: ['Logistik AI', 'Maritime Tech', 'E-Commerce', 'Media Tech'],
    keyIndustries: ['Hafen & Logistik', 'Medien & Verlage', 'Luftfahrt', 'E-Commerce'],
    universities: ['Uni Hamburg', 'TU Hamburg', 'HAW Hamburg'],
    uniqueContent: 'Norddeutschlands Tech-Hub mit Fokus auf Logistik-KI und Maritime Tech'
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt am Main',
    region: 'Hessen',
    lat: 50.110924,
    lng: 8.682127,
    population: '760.000',
    priority: 'high',
    techFocus: ['FinTech', 'RegTech', 'Banking AI', 'Compliance AI'],
    keyIndustries: ['Banken & Finanzen', 'Beratung', 'Logistik', 'Pharma'],
    universities: ['Goethe-Universität', 'Frankfurt School'],
    uniqueContent: 'Europas Finanzzentrum mit höchster Nachfrage nach KI in Banking und Compliance'
  },
  {
    slug: 'koeln',
    name: 'Köln',
    region: 'Nordrhein-Westfalen',
    lat: 50.937531,
    lng: 6.960279,
    population: '1,1 Mio.',
    priority: 'high',
    techFocus: ['Gaming AI', 'InsurTech', 'Media AI', 'Digital Marketing'],
    keyIndustries: ['Medien & Rundfunk', 'Versicherungen', 'Gaming', 'Chemie'],
    universities: ['Uni Köln', 'TH Köln'],
    uniqueContent: 'Medien- und Versicherungsmetropole mit starkem Gaming- und InsurTech-Sektor'
  },

  // ═══ PRIORITÄT MITTEL (Phase 2) ═══
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    region: 'Baden-Württemberg',
    lat: 48.775846,
    lng: 9.182932,
    population: '635.000',
    priority: 'medium',
    techFocus: ['Automotive AI', 'Industrie 4.0', 'Robotik'],
    keyIndustries: ['Automotive', 'Maschinenbau', 'IT', 'Medizintechnik'],
    universities: ['Uni Stuttgart', 'Fraunhofer IAO'],
    uniqueContent: 'Welthauptstadt des Automobilbaus mit Daimler, Porsche und Bosch als KI-Treiber'
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    region: 'Nordrhein-Westfalen',
    lat: 51.227741,
    lng: 6.773456,
    population: '620.000',
    priority: 'medium',
    techFocus: ['Retail AI', 'Fashion Tech', 'Consulting AI'],
    keyIndustries: ['Mode & Handel', 'Telekommunikation', 'Beratung', 'Werbung'],
    universities: ['HHU Düsseldorf'],
    uniqueContent: 'NRW-Landeshauptstadt mit starkem Fokus auf Retail AI und Fashion Tech'
  },
  {
    slug: 'karlsruhe',
    name: 'Karlsruhe',
    region: 'Baden-Württemberg',
    lat: 49.006890,
    lng: 8.403653,
    population: '310.000',
    priority: 'medium',
    techFocus: ['KI-Forschung', 'Cybersecurity', 'Enterprise Software'],
    keyIndustries: ['IT & Software', 'Forschung', 'Energie', 'Recht'],
    universities: ['KIT', 'FZI Forschungszentrum Informatik'],
    uniqueContent: 'Offizieller Digital Hub für KI mit dem KIT als führender Forschungseinrichtung'
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    region: 'Sachsen',
    lat: 51.339695,
    lng: 12.373075,
    population: '600.000',
    priority: 'medium',
    techFocus: ['Smart City', 'HealthTech', 'Energie AI'],
    keyIndustries: ['Automotive', 'Medien', 'Gesundheit', 'Logistik'],
    universities: ['Uni Leipzig', 'HTWK Leipzig'],
    uniqueContent: 'Aufstrebender Smart Infrastructure Hub mit Porsche, BMW und DHL als Innovationstreiber'
  },
  {
    slug: 'darmstadt',
    name: 'Darmstadt',
    region: 'Hessen',
    lat: 49.872775,
    lng: 8.651177,
    population: '160.000',
    priority: 'medium',
    techFocus: ['Cybersecurity AI', 'Space Tech', 'NLP'],
    keyIndustries: ['IT-Sicherheit', 'Raumfahrt', 'Chemie', 'Pharma'],
    universities: ['TU Darmstadt', 'DFKI'],
    uniqueContent: 'Deutschlands Cybersecurity-Hauptstadt und Digital Hub mit der TU Darmstadt als Forschungszentrum'
  },

  // ═══ PRIORITÄT NIEDRIG (Phase 3) ═══
  {
    slug: 'dresden',
    name: 'Dresden',
    region: 'Sachsen',
    lat: 51.050409,
    lng: 13.737262,
    population: '560.000',
    priority: 'low',
    techFocus: ['Chip AI', 'Halbleiter', 'Smart Systems'],
    keyIndustries: ['Halbleiter', 'Mikroelektronik', 'Maschinenbau'],
    universities: ['TU Dresden', 'Fraunhofer IIS'],
    uniqueContent: 'Silicon Saxony: Europas größter Halbleiter-Cluster mit Infineon, Bosch und GlobalFoundries'
  },
  {
    slug: 'nuernberg',
    name: 'Nürnberg',
    region: 'Bayern',
    lat: 49.452030,
    lng: 11.076750,
    population: '520.000',
    priority: 'low',
    techFocus: ['Industrie 4.0', 'Automatisierung'],
    keyIndustries: ['Automatisierung', 'Energie', 'Versicherungen'],
    universities: ['FAU Erlangen-Nürnberg', 'TH Nürnberg'],
    uniqueContent: 'Metropolregion Nürnberg als Zentrum für Automatisierungstechnik und Industrie 4.0'
  },
  {
    slug: 'hannover',
    name: 'Hannover',
    region: 'Niedersachsen',
    lat: 52.375892,
    lng: 9.732010,
    population: '535.000',
    priority: 'low',
    techFocus: ['Messe AI', 'Industrie', 'Automotive'],
    keyIndustries: ['Automotive', 'Messen', 'Versicherungen', 'Maschinenbau'],
    universities: ['Leibniz Universität', 'L3S Forschungszentrum'],
    uniqueContent: 'Hannover Messe als Weltleitmesse für Industrie 4.0 und KI in der Produktion'
  },
  {
    slug: 'heidelberg',
    name: 'Heidelberg',
    region: 'Baden-Württemberg',
    lat: 49.398752,
    lng: 8.672434,
    population: '160.000',
    priority: 'low',
    techFocus: ['BioTech AI', 'Pharma AI', 'Forschung'],
    keyIndustries: ['Pharma', 'Biotechnologie', 'Forschung', 'Tourismus'],
    universities: ['Uni Heidelberg', 'EMBL', 'DKFZ'],
    uniqueContent: 'Exzellenzuniversität und DKFZ als Treiber für KI in der medizinischen Forschung'
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    region: 'Nordrhein-Westfalen',
    lat: 51.513587,
    lng: 7.465298,
    population: '590.000',
    priority: 'low',
    techFocus: ['Logistik AI', 'Industrie', 'Digital Transformation'],
    keyIndustries: ['Logistik', 'IT', 'Versicherungen', 'Maschinenbau'],
    universities: ['TU Dortmund', 'Fraunhofer IML'],
    uniqueContent: 'Europas führendes Logistik-Forschungszentrum mit dem Fraunhofer IML'
  },
  {
    slug: 'essen',
    name: 'Essen',
    region: 'Nordrhein-Westfalen',
    lat: 51.455643,
    lng: 7.011555,
    population: '580.000',
    priority: 'low',
    techFocus: ['Energie AI', 'Smart Grid', 'Industrial AI'],
    keyIndustries: ['Energie', 'Chemie', 'Handel', 'Gesundheit'],
    universities: ['Uni Duisburg-Essen'],
    uniqueContent: 'Sitz von RWE und E.ON: Zentrum für KI-gestützte Energiewende und Smart Grid'
  },
  {
    slug: 'bremen',
    name: 'Bremen',
    region: 'Bremen',
    lat: 53.079296,
    lng: 8.801694,
    population: '570.000',
    priority: 'low',
    techFocus: ['Luft- und Raumfahrt AI', 'Logistik', 'Maritime'],
    keyIndustries: ['Luft- und Raumfahrt', 'Logistik', 'Automotive', 'Lebensmittel'],
    universities: ['Uni Bremen', 'DFKI Bremen'],
    uniqueContent: 'Airbus, OHB und DFKI machen Bremen zum Hotspot für KI in Luft- und Raumfahrt'
  },
  {
    slug: 'aachen',
    name: 'Aachen',
    region: 'Nordrhein-Westfalen',
    lat: 50.775346,
    lng: 6.083887,
    population: '250.000',
    priority: 'low',
    techFocus: ['Produktions-KI', 'E-Mobility', 'Forschung'],
    keyIndustries: ['Maschinenbau', 'IT', 'E-Mobilität', 'Forschung'],
    universities: ['RWTH Aachen', 'Fraunhofer IPT'],
    uniqueContent: 'RWTH Aachen als eine der führenden technischen Universitäten Europas für KI-Forschung'
  },
  {
    slug: 'bonn',
    name: 'Bonn',
    region: 'Nordrhein-Westfalen',
    lat: 50.733585,
    lng: 7.099712,
    population: '330.000',
    priority: 'low',
    techFocus: ['Cybersecurity', 'GovTech', 'Telekommunikation'],
    keyIndustries: ['Telekommunikation', 'Behörden', 'IT-Sicherheit', 'UN-Organisationen'],
    universities: ['Uni Bonn', 'Fraunhofer FKIE'],
    uniqueContent: 'Deutsche Telekom und BSI: Bonns KI-Kompetenz in Telekommunikation und Cybersecurity'
  },
  {
    slug: 'potsdam',
    name: 'Potsdam',
    region: 'Brandenburg',
    lat: 52.390569,
    lng: 13.064473,
    population: '185.000',
    priority: 'low',
    techFocus: ['Data Science', 'Digital Health', 'GeoTech'],
    keyIndustries: ['IT & Software', 'Medien', 'Forschung', 'Gesundheit'],
    universities: ['Uni Potsdam', 'HPI (Hasso-Plattner-Institut)'],
    uniqueContent: 'Das Hasso-Plattner-Institut macht Potsdam zum Hotspot für Data Science und Digital Health'
  },
]
```

---

## Content-Anforderungen pro Stadt-Seite

> **KRITISCH:** Mindestens 40% des Contents muss UNIQUE pro Seite sein!

### Pflicht-Sektionen pro Stadt-Seite

```yaml
SECTION_1_HERO:
  H1: "KI Agentur {{Stadtname}} – KI-Beratung & Entwicklung"
  Subline: Unique pro Stadt, mit regionalen Bezügen
  CTA: "Kostenlose Beratung in {{Stadtname}}"

SECTION_2_CITY_INTRO:
  Inhalt: 200-300 Wörter über die Stadt als Wirtschaftsstandort
  Must-Include:
    - Einwohnerzahl und wirtschaftliche Bedeutung
    - Warum KI für Unternehmen in dieser Stadt relevant ist
    - Lokale Branchen und deren KI-Potenzial

SECTION_3_LOCAL_INDUSTRIES:
  Inhalt: Branchenfokus der Stadt (unique pro Stadt!)
  Beispiel München: Automotive, Versicherungen, Maschinenbau
  Beispiel Frankfurt: Banking, FinTech, Compliance

SECTION_4_SERVICES:
  Inhalt: Services angepasst an lokale Branchen
  Shared Content: Service-Beschreibungen (identisch)
  Unique: Beispiele und Use-Cases für lokale Branchen

SECTION_5_LOCAL_EXPERTISE:
  Inhalt: Lokale Partner, Universitäten, Forschungseinrichtungen
  Must-Include:
    - Lokale Universitäten und Forschungszentren
    - Wirtschaftsförderung / IHK
    - Relevante Konferenzen oder Events

SECTION_6_CASE_STUDY:
  Inhalt: Lokale Referenz oder branchenspezifische Case Study
  Falls keine lokale Referenz: Branchenspezifische Case Study

SECTION_7_FAQ:
  Inhalt: 5-8 stadtspezifische FAQs
  Beispiel: "Was kostet eine KI-Beratung in München?"
  FAQ Schema Markup: JA

SECTION_8_CTA:
  Inhalt: Lokaler CTA
  Text: "Vereinbaren Sie ein kostenloses Gespräch mit unseren KI-Experten in {{Stadtname}}"
```

---

## Duplicate Content Vermeidung

```yaml
ANTI_DUPLICATE_RULES:
  - Jede Stadt hat UNTERSCHIEDLICHE Branchen-Fokus-Texte
  - Jede Stadt hat UNTERSCHIEDLICHE lokale Daten (Einwohner, Uni, Events)
  - Jede Stadt hat EIGENE FAQ-Fragen
  - Shared Content (Services) darf max 60% der Seite ausmachen
  - Canonical URL zeigt immer auf die eigene Stadt-Seite
  - Kein Cross-Canonical zwischen Stadt-Seiten!
```
