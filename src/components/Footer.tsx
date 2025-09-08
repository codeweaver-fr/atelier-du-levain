
"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-amber-50/60 via-white to-white border-t border-neutral-200/60">
      {/* Liseré fin ambre */}
      <div className="h-px w-full bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm text-neutral-700">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-7 w-7 rounded-full bg-amber-600 shadow-[0_0_0_4px_rgba(245,158,11,0.18)]" />
            <p className="font-semibold text-neutral-900">Atelier du Levain (démo)</p>
          </div>
          <p className="mt-3 text-neutral-600">
            Site vitrine fictif — Next.js · Tailwind · Framer Motion.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="font-medium text-neutral-900">Contact</p>
          <p className="mt-2 text-neutral-600">12, Place d&apos;Armes — 83000 Ville (démo)</p>
          <p className="text-neutral-600">Lun–Sam 5h30–19h30 · Dim 6h–13h</p>
          <a className="inline-flex items-center gap-2 mt-2 text-amber-700 hover:underline" href="tel:0987654321">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.2 2 2 0 0 1 4.06 2h2a2 2 0 0 1 2 1.72c.12.86.33 1.7.62 2.5a2 2 0 0 1-.45 2.11L7.1 9.91a16 16 0 0 0 6 6l1.58-1.13a2 2 0 0 1 2.11-.45c.8.29 1.64.5 2.5.62A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            09 87 65 43 21
          </a>
        </div>

        {/* Social */}
        <div>
          <p className="font-medium text-neutral-900">Suivre</p>
          <div className="mt-3 flex items-center gap-3">
            <a aria-label="Instagram" href="#" className="p-2 rounded-full border border-neutral-200 hover:border-amber-300 hover:bg-amber-50 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
            <a aria-label="Facebook" href="#" className="p-2 rounded-full border border-neutral-200 hover:border-amber-300 hover:bg-amber-50 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Légal */}
        <div>
          <p className="font-medium text-neutral-900">Légal</p>
          <p className="mt-2 text-neutral-600">Démonstration fictive — aucun commerce réel associé.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200/70 backdrop-blur-sm bg-white/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-neutral-500 flex items-center justify-between">
          <span>© {year} Atelier du Levain — Démo</span>
          <div className="flex items-center gap-6">
            <span>Conçu pour présentation client</span>
            {/* Ancre -> pas d'onClick (compatible Server Component) */}
            <a
              href="#top"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 border border-neutral-300 hover:border-amber-300 hover:bg-amber-50 text-neutral-700 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Haut de page
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
