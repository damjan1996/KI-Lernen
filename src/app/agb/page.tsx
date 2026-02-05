import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "AGB von KI Lernen",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Allgemeine Geschäftsbedingungen
        </h1>

        <Card>
          <CardContent className="pt-6 prose prose-invert max-w-none">
            <h2>§ 1 Geltungsbereich</h2>
            <p>
              (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
              Verträge zwischen KI Lernen (nachfolgend &bdquo;Anbieter&ldquo;) und dem
              Kunden (nachfolgend &bdquo;Kunde&ldquo;) über den Erwerb von Online-Kursen und
              digitalen Lernmaterialien.
            </p>
            <p>
              (2) Die AGB gelten ausschließlich. Abweichende, entgegenstehende
              oder ergänzende AGB des Kunden werden nur dann Vertragsbestandteil,
              wenn der Anbieter ihrer Geltung ausdrücklich zugestimmt hat.
            </p>

            <h2>§ 2 Vertragsgegenstand</h2>
            <p>
              (1) Der Anbieter bietet Online-Kurse und digitale Lernmaterialien
              im Bereich Künstliche Intelligenz und Automatisierung an.
            </p>
            <p>
              (2) Die genaue Beschreibung der Leistungen ergibt sich aus der
              jeweiligen Kursbeschreibung auf der Website.
            </p>

            <h2>§ 3 Vertragsschluss</h2>
            <p>
              (1) Die Darstellung der Kurse auf der Website stellt kein
              rechtlich bindendes Angebot dar, sondern eine Aufforderung zur
              Abgabe eines Angebots.
            </p>
            <p>
              (2) Mit Absenden der Bestellung gibt der Kunde ein verbindliches
              Angebot zum Kauf ab. Der Vertrag kommt zustande, wenn der Anbieter
              das Angebot durch Auftragsbestätigung per E-Mail annimmt oder die
              Leistung erbringt.
            </p>

            <h2>§ 4 Preise und Zahlung</h2>
            <p>
              (1) Alle angegebenen Preise sind Endpreise und enthalten die
              gesetzliche Mehrwertsteuer.
            </p>
            <p>
              (2) Die Zahlung erfolgt über den Zahlungsdienstleister Stripe.
              Akzeptierte Zahlungsmethoden sind Kreditkarte und weitere von
              Stripe unterstützte Methoden.
            </p>
            <p>
              (3) Der Kaufpreis ist sofort mit Vertragsschluss fällig.
            </p>

            <h2>§ 5 Zugang und Nutzung</h2>
            <p>
              (1) Nach erfolgreicher Zahlung erhält der Kunde Zugang zum
              erworbenen Kurs.
            </p>
            <p>
              (2) Der Zugang ist zeitlich unbegrenzt (lebenslanger Zugang),
              sofern nicht anders angegeben.
            </p>
            <p>
              (3) Der Kunde erhält ein einfaches, nicht übertragbares
              Nutzungsrecht. Die Weitergabe der Zugangsdaten an Dritte ist nicht
              gestattet.
            </p>

            <h2>§ 6 Widerrufsrecht</h2>
            <p>
              (1) Der Kunde hat das Recht, binnen 14 Tagen ohne Angabe von
              Gründen diesen Vertrag zu widerrufen.
            </p>
            <p>
              (2) Um das Widerrufsrecht auszuüben, muss der Kunde den Anbieter
              mittels einer eindeutigen Erklärung (z.B. E-Mail) über den
              Entschluss informieren.
            </p>
            <p>
              (3) Im Falle eines wirksamen Widerrufs erstattet der Anbieter den
              vollständigen Kaufpreis binnen 14 Tagen.
            </p>

            <h2>§ 7 Urheberrecht</h2>
            <p>
              (1) Alle Kursinhalte, Videos, Texte und Materialien sind
              urheberrechtlich geschützt.
            </p>
            <p>
              (2) Die Vervielfältigung, Verbreitung oder öffentliche
              Zugänglichmachung der Inhalte ist ohne ausdrückliche Genehmigung
              nicht gestattet.
            </p>

            <h2>§ 8 Haftung</h2>
            <p>
              (1) Der Anbieter haftet unbeschränkt für Schäden aus der
              Verletzung des Lebens, des Körpers oder der Gesundheit.
            </p>
            <p>
              (2) Im Übrigen haftet der Anbieter nur bei Vorsatz und grober
              Fahrlässigkeit.
            </p>

            <h2>§ 9 Schlussbestimmungen</h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland unter
              Ausschluss des UN-Kaufrechts.
            </p>
            <p>
              (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein,
              bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>

            <p className="text-sm text-[var(--text-muted)] mt-8">
              Stand: Februar 2026
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
