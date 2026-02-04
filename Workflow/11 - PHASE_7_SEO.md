# Phase 7: SEO Deep Optimization

> **Dauer:** ~30-45 Minuten
> **Input:** Live-Website mit PageSpeed-Scores ≥ Minimum
> **Output:** Vollständig SEO-optimierte Website
> **Abhängigkeiten:** Phase 6 (PageSpeed bestanden)

---

## Vor dem Start: SEO-Module laden

Claude Code liest diese Module VOLLSTÄNDIG bevor mit der SEO-Optimierung begonnen wird:

```yaml
PFLICHT_LESEN:
  - seo/KEYWORD_STRATEGY.md         # Keyword-Cluster & Targeting
  - seo/SCHEMA_TEMPLATES.md         # Alle JSON-LD Templates
  - seo/CITY_PAGES.md               # 20 Stadt-Seiten mit Unique Content
  - seo/CONTENT_ARCHITECTURE.md     # Pillar Pages, Content-Silos, Blog
  - seo/TECHNICAL_SEO.md            # Sitemap, robots.txt, Canonical
```

---

## SEO-Checkliste (Vollständig)

### 7.1 Technical SEO Foundation

> Referenz: `seo/TECHNICAL_SEO.md`

- [ ] `robots.ts` generiert und erreichbar unter /robots.txt
- [ ] `sitemap.ts` generiert und erreichbar unter /sitemap.xml
- [ ] Sitemap enthält ALLE Seiten (Homepage, Services, Städte, Blog, Legal)
- [ ] Canonical URLs auf jeder Seite korrekt
- [ ] `lang="de"` im html-Element
- [ ] HTTPS enforced (Vercel Default)
- [ ] www-Redirect zu non-www (oder umgekehrt)
- [ ] Trailing Slashes konsistent
- [ ] 404-Seite vorhanden und gibt HTTP 404 zurück
- [ ] Web App Manifest (/manifest.ts)

### 7.2 On-Page SEO

> Referenz: `seo/KEYWORD_STRATEGY.md`

- [ ] Jede Seite hat unique Title Tag (30-65 Zeichen)
- [ ] Jede Seite hat unique Meta Description (50-155 Zeichen)
- [ ] Jede Seite hat genau 1x H1
- [ ] H1 enthält primäres Keyword der Seite
- [ ] Heading-Hierarchie korrekt (H1 → H2 → H3, keine Sprünge)
- [ ] Primary Keyword in ersten 100 Wörtern der Seite
- [ ] Keyword-Dichte: 1-2% (nicht mehr!)
- [ ] Alt-Tags auf allen Bildern (beschreibend, mit Keyword wo passend)
- [ ] Internal Links mit beschreibendem Anchor-Text
- [ ] Externe Links mit `rel="noopener noreferrer"` und `target="_blank"`

### 7.3 Structured Data

> Referenz: `seo/SCHEMA_TEMPLATES.md`

- [ ] **Organization** Schema auf jeder Seite (via Root Layout)
- [ ] **WebSite** Schema mit SearchAction auf Homepage
- [ ] **LocalBusiness** Schema auf jeder Stadt-Seite
- [ ] **Service** Schema auf jeder Service-Unterseite
- [ ] **FAQPage** Schema auf Homepage und Service-Seiten
- [ ] **BreadcrumbList** Schema auf allen Unterseiten
- [ ] **Article** Schema auf allen Blog-Artikeln
- [ ] **HowTo** Schema auf relevanten Service-Seiten
- [ ] JSON-LD validiert (Google Rich Results Test)

### 7.4 Content-Optimierung

> Referenz: `seo/CONTENT_ARCHITECTURE.md`

- [ ] Homepage: 20+ Sektionen mit insgesamt 3000+ Wörtern
- [ ] Jede Service-Seite: 1500-2500 Wörter
- [ ] Jede Stadt-Seite: 1000-1500 Wörter (min. 40% unique)
- [ ] Blog-Artikel: 1500-3000 Wörter
- [ ] FAQ-Sektion: 8-12 Fragen mit ausführlichen Antworten
- [ ] Pillar Page(s) erstellt: 3000-5000 Wörter
- [ ] Content-Silos korrekt verlinkt

### 7.5 Internal Linking

```yaml
LINKING_STRATEGIE:
  homepage:
    links_to:
      - Alle Service-Seiten (über ServicesGrid)
      - Top 3 Blog-Artikel (über BlogTeaser)
      - Top 5 Stadt-Seiten (über Footer oder CityLinks Sektion)
      - Über Uns, Kontakt (über CTAs)
  
  service_pages:
    links_to:
      - Homepage (Breadcrumb)
      - Andere Service-Seiten (Querverweise)
      - Relevante Blog-Artikel
      - Kontakt (CTA)
      - Relevante Stadt-Seiten
  
  city_pages:
    links_to:
      - Homepage (Breadcrumb)
      - Alle Service-Seiten
      - 2-3 andere Stadt-Seiten in der Region
      - Blog-Artikel
      - Kontakt
  
  blog_articles:
    links_to:
      - Pillar Page (immer!)
      - Andere Cluster-Artikel
      - Relevante Service-Seiten
      - Kontakt
  
  MIN_INTERNAL_LINKS_PER_PAGE: 5
  MAX_INTERNAL_LINKS_PER_PAGE: 20
```

### 7.6 Stadt-Seiten Optimierung

> Referenz: `seo/CITY_PAGES.md`

- [ ] 20 Stadt-Seiten erstellt
- [ ] Jede Stadt-Seite hat unique Content (40%+ einzigartig)
- [ ] Lokale Wirtschaftsdaten pro Stadt
- [ ] Branchenfokus pro Stadt
- [ ] Lokale Case Studies oder Referenzen
- [ ] LocalBusiness Schema mit korrekter Geo-Info
- [ ] Stadt-Name in Title, H1, Meta Description, URL

### 7.7 Open Graph & Social Media

- [ ] OG:Title auf jeder Seite
- [ ] OG:Description auf jeder Seite
- [ ] OG:Image (1200x630px) auf jeder Seite
- [ ] OG:Type (website auf Homepage, article auf Blog)
- [ ] OG:Locale = de_DE
- [ ] Twitter Card = summary_large_image
- [ ] OG Image Datei existiert und ist optimiert

### 7.8 Performance für SEO

- [ ] Core Web Vitals im grünen Bereich (Phase 6 bestanden)
- [ ] Mobile-First Indexing: Mobile Version vollständig
- [ ] Kein Render-Blocking JavaScript
- [ ] Kein Render-Blocking CSS
- [ ] Images lazy-loaded (außer Above-the-Fold)
- [ ] Hero Image mit `priority` Attribut

---

## SEO-Validierung

### Google Rich Results Test

```javascript
// Structured Data validieren
WebFetch({
  url: `https://search.google.com/test/rich-results?url=${encodeURIComponent("{{VERCEL_URL}}")}`,
  prompt: "Prüfe ob die Structured Data erkannt wird. Liste alle erkannten Schema-Typen."
});
```

### Sitemap Check

```javascript
// Sitemap abrufen und prüfen
WebFetch({
  url: "{{VERCEL_URL}}/sitemap.xml",
  prompt: "Zähle die URLs in der Sitemap. Prüfe ob Homepage, alle Service-Seiten, Stadt-Seiten und Blog-Seiten enthalten sind."
});
```

### robots.txt Check

```javascript
WebFetch({
  url: "{{VERCEL_URL}}/robots.txt",
  prompt: "Prüfe ob die robots.txt korrekt konfiguriert ist: Sitemap-Verweis, User-Agent Regeln."
});
```

---

## Nach Phase 7: Commit & Re-Deploy

```bash
git add .
git commit -m "seo: complete SEO optimization

- Structured Data: Organization, LocalBusiness, Service, FAQ, Article, Breadcrumb
- 20 Stadt-Seiten mit unique Content
- Internal Linking Strategie implementiert
- Content-Silos und Pillar Pages
- Technical SEO: Sitemap, robots.txt, Canonical
- Open Graph und Social Meta Tags
- FAQ mit Schema Markup

Co-Authored-By: Claude Code <noreply@anthropic.com>"

git push
npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT
```

---

## Erfolgskriterien

- [ ] Alle 7.1-7.8 Checklisten-Punkte abgehakt
- [ ] Google Rich Results Test: Keine Errors
- [ ] Sitemap.xml erreichbar und vollständig
- [ ] robots.txt korrekt
- [ ] PageSpeed SEO Score weiterhin ≥ 95

> **WEITER:** Phase 8 (Test Suite)
