# Phase 4: Vercel Production Deployment

> **Dauer:** ~3 Minuten
> **Input:** GitHub Repository aus Phase 3
> **Output:** Live-URL auf Vercel
> **Abhängigkeiten:** Phase 3 (Repo existiert)

---

## Production Deploy

```bash
cd "C:\Users\damja\Desktop\{{PROJECT_SLUG}}\website"

# WICHTIG: Token direkt verwenden — KEIN LOGIN NÖTIG!
npx vercel --prod --yes --token=TexLoDHoBrhOrJX2nmVWwRMT
```

### Vercel CLI Optionen

```yaml
VERCEL_OPTIONS:
  --prod: Production Deployment (nicht Preview)
  --yes: Alle Prompts automatisch bestätigen
  --token: Authentifizierung ohne Login
  # team: null → Personal Account
```

---

## Environment Variables setzen

```bash
# Base URL für Sitemap und OG Images
npx vercel env add NEXT_PUBLIC_BASE_URL production --token=TexLoDHoBrhOrJX2nmVWwRMT
# Wert: https://{{DOMAIN}}

# Revalidation Secret für On-Demand ISR
npx vercel env add REVALIDATION_SECRET production --token=TexLoDHoBrhOrJX2nmVWwRMT
# Wert: {{RANDOM_SECRET}}
```

---

## Custom Domain konfigurieren (falls verfügbar)

```bash
# Domain hinzufügen
npx vercel domains add {{DOMAIN}} --token=TexLoDHoBrhOrJX2nmVWwRMT

# DNS Records anzeigen (für Registrar)
npx vercel domains inspect {{DOMAIN}} --token=TexLoDHoBrhOrJX2nmVWwRMT
```

### DNS-Konfiguration beim Registrar

```yaml
# A Record für Root Domain
Type: A
Name: @
Value: 76.76.21.21

# CNAME für www Subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Deployment validieren

```bash
# Deployment-URL abrufen
npx vercel ls --token=TexLoDHoBrhOrJX2nmVWwRMT

# Die URL notieren: https://{{PROJECT_SLUG}}.vercel.app
# oder https://{{DOMAIN}} falls Custom Domain aktiv
```

---

## Erfolgskriterien

- [ ] `npx vercel --prod` erfolgreich abgeschlossen
- [ ] Live-URL erreichbar
- [ ] Keine Build-Errors im Vercel Dashboard
- [ ] Environment Variables gesetzt
- [ ] Custom Domain (falls vorhanden) zeigt korrekt

> **WICHTIG:** Die Vercel-URL wird in Phase 5 für Live-Tests benötigt!
> Variable: `VERCEL_URL` = Die URL aus dem Deploy-Output

> **WEITER:** Phase 5 (Playwright Live Testing)
