import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://kilernen.de"
  ),
  title: {
    default: "KI Lernen - Deine #1 Lernplattform für KI-Skills",
    template: "%s | KI Lernen",
  },
  description:
    "Erlerne durch unsere Online-Kurse gefragte KI-Skills. Zertifizierte Kurse für KI-Automatisierung, Prompt Engineering, Voice Agents und mehr.",
  keywords: [
    "KI Kurs",
    "KI lernen",
    "Künstliche Intelligenz",
    "AI Training",
    "Prompt Engineering",
    "KI Automatisierung",
    "ChatGPT",
    "Claude AI",
    "n8n",
    "Make",
  ],
  authors: [{ name: "KI Lernen" }],
  creator: "KI Lernen",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://kilernen.de",
    siteName: "KI Lernen",
    title: "KI Lernen - Die #1 KI-Lernplattform",
    description:
      "Zertifizierte KI-Kurse für die Zukunft. Lerne von Experten und werde zum KI-Profi.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KI Lernen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KI Lernen - Die #1 KI-Lernplattform",
    description: "Zertifizierte KI-Kurse für die Zukunft.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
