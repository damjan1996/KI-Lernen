"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual authentication
    setTimeout(() => {
      setIsLoading(false);
      alert("Login-Funktionalität kommt bald!");
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-b from-[var(--background-secondary)] to-[var(--background-primary)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-[var(--accent-gold)]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 rounded-full bg-[var(--accent-blue)]/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="mx-auto max-w-md w-full px-4 sm:px-6 relative">
        <FadeIn delay={0}>
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold">
                <span className="text-[var(--accent-gold)]">KI</span>
                <span>Lernen</span>
              </span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">Willkommen zurück</h1>
            <p className="text-[var(--text-secondary)]">
              Melde dich an, um auf deine Kurse zuzugreifen
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
        <Card className="border-gradient">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@email.de"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--background-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-[var(--background-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--background-tertiary)] text-[var(--accent-gold)] focus:ring-[var(--accent-gold)]"
                  />
                  <span className="text-[var(--text-secondary)]">
                    Angemeldet bleiben
                  </span>
                </label>
                <Link
                  href="/passwort-vergessen"
                  className="text-[var(--accent-gold)] hover:underline"
                >
                  Passwort vergessen?
                </Link>
              </div>

              <Button className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Wird angemeldet...
                  </span>
                ) : (
                  <>
                    Anmelden
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[var(--border-default)] text-center">
              <p className="text-[var(--text-secondary)]">
                Noch kein Konto?{" "}
                <Link
                  href="/kurse"
                  className="text-[var(--accent-gold)] hover:underline font-medium"
                >
                  Kurs kaufen
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
        <p className="text-xs text-[var(--text-muted)] text-center mt-6">
          Mit der Anmeldung akzeptierst du unsere{" "}
          <Link href="/agb" className="underline hover:text-[var(--text-secondary)]">
            AGB
          </Link>{" "}
          und{" "}
          <Link href="/datenschutz" className="underline hover:text-[var(--text-secondary)]">
            Datenschutzbestimmungen
          </Link>
          .
        </p>
        </FadeIn>
      </div>
    </div>
  );
}
