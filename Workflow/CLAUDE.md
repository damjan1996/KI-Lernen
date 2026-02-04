# WORKFLOW REGELN – STRIKT EINHALTEN

> Diese Regeln sind VERBINDLICH und haben höchste Priorität.
> Bei Verstoß: Workflow stoppen und User benachrichtigen.

---

## Sequenzielle Abarbeitung

- Dieser Workflow besteht aus **9 Phasen (0–8)**, definiert in separaten MD-Dateien.
- Du darfst **NIEMALS** eine Phase überspringen oder Schritte aus späteren Phasen vorziehen.
- Arbeite **IMMER** nur die aktuelle Phase ab.
- Erst wenn **ALLE** Schritte einer Phase erledigt sind, darfst du zur nächsten übergehen.
- Lies vor jeder Phase die zugehörige MD-Datei **VOLLSTÄNDIG**.

---

## Checkpoint-System

Nach Abschluss **jeder Phase**:

1. Aktualisiere die Datei `STATUS.md` mit dem aktuellen Stand
2. Melde dem User: **"Phase X abgeschlossen. Soll ich mit Phase Y fortfahren?"**
3. **WARTE** auf explizite Bestätigung des Users
4. Fahre **NICHT** automatisch fort

---

## Context-Management

- Lade immer nur die MD-Datei der **AKTUELLEN** Phase + `01 - CONFIG.md`
- Lade **NICHT** alle Phasen-Dateien gleichzeitig
- Ignoriere Inhalte von Phasen, die noch nicht freigeschaltet sind

---

## Fortschrittsdokumentation

Bei **jedem abgeschlossenen Schritt**:

1. Aktualisiere `STATUS.md` sofort
2. Markiere den Schritt als `[x]` erledigt
3. Notiere Timestamp und ggf. relevante Outputs

Format in STATUS.md:
```markdown
- [x] Schritt erledigt (15:42:30)
- [ ] Schritt offen
```

---

## Phasen-Übersicht

| Phase | Datei | Beschreibung |
|-------|-------|--------------|
| 0 | `03 - PHASE_0_DESIGN_SYSTEM.md` | Pencil Design System generieren |
| 1 | `04 - PHASE_1_SETUP.md` | Next.js Setup & Scaffolding |
| 2 | `05 - PHASE_2_CORE_DEV.md` | Core Development |
| 2B | `06 - PHASE_2B_UI_TESTING.md` | UI/UX Playwright Tests |
| 3 | `07 - PHASE_3_GITHUB.md` | GitHub Repository |
| 4 | `08 - PHASE_4_VERCEL.md` | Vercel Deployment |
| 5 | `09 - PHASE_5_PLAYWRIGHT_LIVE.md` | Playwright Live Tests |
| 6 | `10 - PHASE_6_PAGESPEED.md` | PageSpeed Validation |
| 7 | `11 - PHASE_7_SEO.md` | SEO Deep Optimization |
| 8 | `12 - PHASE_8_TEST_SUITE.md` | Automated Test Suite |

---

## Slash-Commands

Nutze die vordefinierten Commands für kontrollierte Phasen-Arbeit:

- `/project:phase0` bis `/project:phase8` – Einzelne Phase starten
- `/project:status` – Aktuellen Fortschritt anzeigen
- `/project:next` – Nächste offene Phase ermitteln

---

## Verbotene Aktionen

- Mehrere Phasen in einem Durchgang abarbeiten
- Schritte überspringen, weil sie "offensichtlich" sind
- Vorausschauend Code schreiben, der erst in späteren Phasen relevant ist
- STATUS.md nicht aktualisieren
- Ohne User-Bestätigung zur nächsten Phase wechseln

---

## Bei Fehlern

Wenn ein Schritt fehlschlägt:

1. **STOPPE** sofort
2. Dokumentiere den Fehler in STATUS.md
3. Melde dem User: "Fehler in Phase X, Schritt Y: [Beschreibung]"
4. Warte auf Anweisung

---

## Projekt-Variablen

Alle Variablen werden aus `01 - CONFIG.md` geladen:

- `{{PROJECT_NAME}}` – Projektname
- `{{PROJECT_SLUG}}` – URL-freundlicher Name
- `{{DOMAIN}}` – Ziel-Domain
- `{{WORKING_DIR}}` – Arbeitsverzeichnis

**Ersetze ALLE Variablen vor der Ausführung eines Schritts.**
