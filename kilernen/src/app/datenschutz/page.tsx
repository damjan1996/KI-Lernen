import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von KI Lernen",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Datenschutzerklärung
        </h1>

        <Card>
          <CardContent className="pt-6 prose prose-invert max-w-none">
            <h2>1. Datenschutz auf einen Blick</h2>

            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </strong>
              <br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
              dieser Website entnehmen.
            </p>

            <h2>2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei Vercel Inc. Anbieter
              ist die Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
              Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
              vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
              <br />
              <br />
              KI Lernen
              <br />
              [Adresse]
              <br />
              <br />
              E-Mail: kontakt@kilernen.de
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>

            <h3>Cookies</h3>
            <p>
              Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies
              sind kleine Datenpakete und richten auf Ihrem Endgerät keinen
              Schaden an. Sie werden entweder vorübergehend für die Dauer einer
              Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf
              Ihrem Endgerät gespeichert.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h2>5. Zahlungsdienstleister</h2>

            <h3>Stripe</h3>
            <p>
              Wir nutzen Stripe für die Abwicklung von Zahlungen. Anbieter ist
              die Stripe Payments Europe Ltd., Block 4, Harcourt Centre, Harcourt
              Road, Dublin 2, Irland.
            </p>
            <p>
              Bei der Bezahlung werden Ihre Zahlungsdaten an Stripe übermittelt.
              Stripe verarbeitet Ihre Daten gemäß der eigenen
              Datenschutzerklärung:{" "}
              <a
                href="https://stripe.com/de/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-gold)]"
              >
                https://stripe.com/de/privacy
              </a>
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul>
              <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten</li>
              <li>Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Löschung Ihrer Daten zu verlangen</li>
              <li>Einschränkung der Verarbeitung zu verlangen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
              <li>Widerspruch gegen die Verarbeitung einzulegen</li>
            </ul>

            <h2>7. SSL-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie daran, dass die
              Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und
              an dem Schloss-Symbol in Ihrer Browserzeile.
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
