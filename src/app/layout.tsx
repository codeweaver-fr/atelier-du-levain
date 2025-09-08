// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter, Fraunces } from "next/font/google";

// ---- SEO de base
export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-du-levain.demo"), // ajuste si tu déploies
  title: "Atelier du Levain — Démo",
  description: "Site vitrine fictif (Next.js · Tailwind · Framer Motion)",
  openGraph: {
    title: "Atelier du Levain — Démo",
    description:
      "Boulangerie fictive : Next.js · Tailwind · Framer Motion. Savoir-faire artisanal & gourmandise.",
    type: "website",
    locale: "fr_FR",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// ---- Fonts (variables utilisées par Tailwind)
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["600", "700", "800"],
  variable: "--font-serif",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Empêche la traduction automatique (évite des diffs d’hydratation) */}
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} font-sans min-h-svh bg-neutral-50 text-neutral-900 scroll-smooth antialiased`}
      >
        {/* Lien d’accès direct au contenu pour le clavier/lecteurs d’écran */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          Aller au contenu
        </a>

        <Navbar />
        {/* Pas de padding-top ici : la Navbar réserve déjà la hauteur */}
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
