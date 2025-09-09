"use client";

import Image from "next/image";

export default function APropos() {
  return (
    <section id="apropos" className="relative scroll-mt-24 py-24 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
        {/* texte */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            À propos de <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">l’Atelier du Levain</span>
          </h2>
          <p className="mt-4 text-neutral-700 max-w-prose">
            Une boulangerie de quartier qui mise sur la <strong>fermentation naturelle</strong>, des
            <strong> farines locales</strong> et un savoir-faire soigné. Levain maison, pétrissage doux, cuisson au petit matin.
          </p>

          <ul className="mt-6 space-y-3 text-neutral-800">
            {[
              "Fermentation longue (digeste, arômes profonds)",
              "Beurre AOP & farines françaises",
              "Saisonnalité & production quotidienne",
              "Zéro congélation — fraîcheur garantie",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-600" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* visuel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200/60">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
            alt="Pétrissage à la main – Atelier du Levain"
            fill
            sizes="(max-width:1024px) 100vw, 640px"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-900/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
