import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface FooterLink {
  name: string;
  href: string;
  comingSoon?: boolean;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: Record<string, FooterSection> = {
  kurse: {
    title: "Kurse",
    links: [
      { name: "KI-Automatisierung", href: "/kurse/ki-automatisierung" },
      { name: "Prompt Engineering", href: "/kurse/prompt-engineering", comingSoon: true },
      { name: "Voice Agents", href: "/kurse/voice-agents", comingSoon: true },
      { name: "RAG & LLM", href: "/kurse/rag-llm", comingSoon: true },
    ],
  },
  unternehmen: {
    title: "Unternehmen",
    links: [
      { name: "Über uns", href: "/ueber-uns" },
      { name: "Beratung", href: "/beratung" },
      { name: "YouTube", href: "https://youtube.com/@EverlastAI", external: true },
    ],
  },
  rechtliches: {
    title: "Rechtliches",
    links: [
      { name: "Impressum", href: "/impressum" },
      { name: "Datenschutz", href: "/datenschutz" },
      { name: "AGB", href: "/agb" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[var(--text-primary)]">
                KI
              </span>
              <span className="text-xl font-bold text-[var(--accent-gold)]">
                Lernen
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-xs">
              Erlerne durch unsere Online-Kurse gefragte KI-Skills, mit denen du
              dich langfristig erfolgreich selbstständig machen kannst.
            </p>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-2"
                      {...(link.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {link.name}
                      {link.comingSoon && (
                        <span className="text-xs text-[var(--text-muted)] bg-[var(--background-tertiary)] px-2 py-0.5 rounded">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="py-6 border-t border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            *Haftungsausschluss: Die gezeigten Ergebnisse sind echte Beispiele
            unserer Kursteilnehmer. Individuelle Ergebnisse können variieren und
            hängen von verschiedenen Faktoren ab. Die Inhalte dieser Seite
            richten sich ausdrücklich an Gewerbetreibende und Unternehmer im
            Sinne des §14 BGB.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {new Date().getFullYear()} KI Lernen. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/impressum"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Impressum
            </Link>
            <span className="text-[var(--text-muted)]">|</span>
            <Link
              href="/datenschutz"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <Link
        href="https://wa.me/491234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">
          Fragen? WhatsApp!
        </span>
      </Link>
    </footer>
  );
}
