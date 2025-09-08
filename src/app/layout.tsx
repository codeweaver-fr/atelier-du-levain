// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Atelier du Levain — Démo",
  description: "Site vitrine fictif (Next.js · Tailwind · Framer Motion)",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Empêche la traduction automatique (évite les erreurs d’hydratation) */}
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-svh bg-neutral-50 text-neutral-900 scroll-smooth antialiased">
        {/* Header flottant (déjà géré dans le composant) */}
        <Navbar />

        {/* Contenu : pas de padding-top ici car Navbar ajoute déjà un espace de réserve */}
        <main id="top">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
