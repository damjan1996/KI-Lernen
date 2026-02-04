# SEO-Modul: Schema.org JSON-LD Templates

> **Referenziert von:** Phase 2 (Core Dev), Phase 7 (SEO), Phase 8 (Tests)
> **Ziel:** Structured Data auf jeder Seite für Rich Results

---

## Organization Schema (Root Layout — jede Seite)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "{{COMPANY_NAME}}",
  "legalName": "{{COMPANY_LEGAL_NAME}}",
  "url": "https://{{DOMAIN}}",
  "logo": "https://{{DOMAIN}}/images/logo.png",
  "description": "{{PROJECT_DESC}}",
  "foundingDate": "{{FOUNDING_YEAR}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{STREET}}",
    "addressLocality": "{{CITY}}",
    "postalCode": "{{ZIP}}",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{{PHONE}}",
    "contactType": "customer service",
    "email": "{{EMAIL}}",
    "availableLanguage": ["German", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/{{LINKEDIN_SLUG}}",
    "https://github.com/{{GITHUB_USER}}"
  ],
  "knowsAbout": [
    "Künstliche Intelligenz",
    "Machine Learning",
    "Prozessautomatisierung",
    "ChatGPT",
    "KI-Beratung",
    "Natural Language Processing"
  ]
}
```

---

## WebSite Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{PROJECT_NAME}}",
  "url": "https://{{DOMAIN}}",
  "description": "{{PROJECT_DESC}}",
  "publisher": {
    "@type": "Organization",
    "name": "{{COMPANY_NAME}}"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://{{DOMAIN}}/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## LocalBusiness / ProfessionalService Schema (Stadt-Seiten)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "{{PRIMARY_KEYWORD}} {{CITY_NAME}}",
  "description": "{{PRIMARY_KEYWORD}} in {{CITY_NAME}} für künstliche Intelligenz, Machine Learning und Prozessautomatisierung.",
  "url": "https://{{DOMAIN}}/ki-agentur-{{CITY_SLUG}}",
  "telephone": "{{PHONE}}",
  "email": "{{EMAIL}}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{CITY_STREET}}",
    "addressLocality": "{{CITY_NAME}}",
    "addressRegion": "{{CITY_REGION}}",
    "postalCode": "{{CITY_ZIP}}",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{CITY_LAT}}",
    "longitude": "{{CITY_LNG}}"
  },
  "areaServed": {
    "@type": "City",
    "name": "{{CITY_NAME}}"
  },
  "serviceType": [
    "KI-Beratung",
    "KI-Automatisierung",
    "ChatGPT Beratung",
    "KI-Workshop",
    "Machine Learning",
    "KI-Implementierung"
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00",
  "parentOrganization": {
    "@type": "Organization",
    "name": "{{COMPANY_NAME}}",
    "url": "https://{{DOMAIN}}"
  }
}
```

---

## Service Schema (Service-Unterseiten)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{{SERVICE_NAME}}",
  "description": "{{SERVICE_DESCRIPTION}}",
  "url": "https://{{DOMAIN}}/leistungen/{{SERVICE_SLUG}}",
  "provider": {
    "@type": "Organization",
    "name": "{{COMPANY_NAME}}",
    "url": "https://{{DOMAIN}}"
  },
  "serviceType": "{{SERVICE_TYPE}}",
  "areaServed": {
    "@type": "Country",
    "name": "Deutschland"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "{{SERVICE_NAME}} Leistungen",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "{{SUB_SERVICE_1}}"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "{{SUB_SERVICE_2}}"
        }
      }
    ]
  }
}
```

---

## FAQPage Schema (Homepage + Service-Seiten)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was macht eine KI-Agentur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine KI-Agentur berät Unternehmen bei der Einführung und Nutzung von künstlicher Intelligenz. Wir identifizieren Automatisierungspotenziale, entwickeln maßgeschneiderte KI-Lösungen und begleiten die Implementierung von der Strategie bis zum Produktivbetrieb."
      }
    },
    {
      "@type": "Question",
      "name": "Wie viel kostet ein KI-Projekt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Kosten für ein KI-Projekt variieren je nach Umfang und Komplexität. Ein typisches Beratungsprojekt startet ab 5.000€, während umfassende KI-Implementierungen zwischen 20.000€ und 150.000€ liegen können. Wir bieten eine kostenlose Erstberatung, um Ihr Budget realistisch einzuschätzen."
      }
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert die Implementierung einer KI-Lösung?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ein MVP (Minimum Viable Product) kann in 4-8 Wochen entwickelt werden. Eine vollständige KI-Lösung mit Integration in bestehende Systeme dauert typischerweise 3-6 Monate. Der genaue Zeitrahmen hängt von der Komplexität und den vorhandenen Daten ab."
      }
    }
  ]
}
```

---

## BreadcrumbList Schema (Alle Unterseiten)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://{{DOMAIN}}"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{PARENT_PAGE_NAME}}",
      "item": "https://{{DOMAIN}}/{{PARENT_SLUG}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{CURRENT_PAGE_NAME}}",
      "item": "https://{{DOMAIN}}/{{PARENT_SLUG}}/{{CURRENT_SLUG}}"
    }
  ]
}
```

---

## Article Schema (Blog-Artikel)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{ARTICLE_TITLE}}",
  "description": "{{ARTICLE_EXCERPT}}",
  "image": "https://{{DOMAIN}}/images/blog/{{ARTICLE_IMAGE}}",
  "datePublished": "{{PUBLISHED_DATE}}",
  "dateModified": "{{MODIFIED_DATE}}",
  "author": {
    "@type": "Person",
    "name": "{{AUTHOR_NAME}}",
    "url": "https://{{DOMAIN}}/ueber-uns"
  },
  "publisher": {
    "@type": "Organization",
    "name": "{{COMPANY_NAME}}",
    "logo": {
      "@type": "ImageObject",
      "url": "https://{{DOMAIN}}/images/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://{{DOMAIN}}/blog/{{ARTICLE_SLUG}}"
  },
  "keywords": "{{ARTICLE_KEYWORDS}}",
  "wordCount": "{{WORD_COUNT}}",
  "articleSection": "{{CATEGORY}}"
}
```

---

## HowTo Schema (Service-Seiten mit Prozess-Darstellung)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "So starten Sie Ihr KI-Projekt mit {{COMPANY_NAME}}",
  "description": "In 4 Schritten von der Idee zur fertigen KI-Lösung.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Kostenlose Erstberatung",
      "text": "Wir analysieren Ihre Anforderungen und identifizieren die vielversprechendsten KI-Use-Cases."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Strategie & Konzept",
      "text": "Wir entwickeln eine maßgeschneiderte KI-Strategie mit klarem ROI-Fokus."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Implementierung",
      "text": "Unser Team setzt die KI-Lösung um und integriert sie in Ihre bestehende IT-Landschaft."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Optimierung & Support",
      "text": "Kontinuierliche Verbesserung und langfristige Betreuung Ihrer KI-Lösung."
    }
  ],
  "totalTime": "P3M"
}
```

---

## React-Komponente: Generischer JSON-LD Renderer

```typescript
// src/components/seo/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
```

---

## Validierung

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/
