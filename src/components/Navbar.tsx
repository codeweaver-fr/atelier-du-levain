"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";

const LINKS = [
  { href: "#specialites", label: "Spécialités" },
  { href: "#apropos",     label: "À propos" },
  { href: "#infos",       label: "Infos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  // Effets scroll (ombre/verre + auto-hide + barre de progression)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 6);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;

      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? y / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy (lien actif)
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Barre flottante sobre (verre + accent ambre) */}
      <motion.div
        initial={false}
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-0 top-2 z-50"
      >
        <div className="mx-auto max-w-6xl px-3">
          <div className="relative">
            {/* Halo doux ambre */}
            <div
              aria-hidden
              className={`absolute -inset-0.5 rounded-full blur-md transition-opacity ${
                scrolled ? "opacity-100" : "opacity-90"
              }`}
              style={{
                background:
                  "linear-gradient(90deg, rgba(245,158,11,.25), rgba(217,119,6,.25))",
              }}
            />
            {/* Conteneur glass */}
            <div
              className="relative h-16 rounded-full border border-neutral-200/80 bg-white/70 backdrop-blur-xl shadow-lg"
            >
              {/* Progress lecture (ambre fin) */}
              <motion.div
                style={{ scaleX: progress }}
                className="absolute left-0 top-0 h-0.5 w-full origin-left bg-amber-500/80 rounded-full"
              />

              <div className="h-full px-4 sm:px-6 flex items-center justify-between text-neutral-900">
                {/* Brand */}
                <a href="#top" className="flex items-center gap-2">
                  <span className="inline-block h-9 w-9 rounded-full bg-amber-600 shadow-[0_0_0_4px_rgba(245,158,11,0.20)]" />
                  <span className="font-semibold tracking-wide">Atelier du Levain</span>
                </a>

                {/* Liens desktop (pill highlight ambre) */}
                <LayoutGroup>
                  <nav className="hidden md:flex items-center gap-1 text-sm">
                    {LINKS.map((l) => {
                      const isActive = active === l.href.slice(1);
                      return (
                        <div key={l.href} className="relative">
                          {isActive && (
                            <motion.span
                              layoutId="nav-pill"
                              className="absolute inset-0 rounded-full bg-amber-100 border border-amber-300/70"
                              transition={{ type: "spring", stiffness: 450, damping: 30 }}
                            />
                          )}
                          <a
                            href={l.href}
                            className={`relative z-10 px-3 py-2 rounded-full transition ${
                              isActive ? "text-amber-800" : "hover:bg-amber-50/80 hover:text-amber-700"
                            }`}
                          >
                            {l.label}
                          </a>
                        </div>
                      );
                    })}
                  </nav>
                </LayoutGroup>

                {/* CTA + burger */}
                <div className="flex items-center gap-2">
                  <a
                    href="tel:0987654321"
                    className="hidden sm:inline-flex items-center rounded-full bg-amber-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-amber-700 transition"
                  >
                    Commander
                  </a>
                  <button
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-controls="mobile-nav"
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white/80 hover:bg-neutral-100 transition"
                  >
                    {!open ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panneau mobile propre (blanc + accent ambre) */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="sheet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <motion.nav
                id="mobile-nav"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className="mx-auto mt-24 w-[92%] max-w-md rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 bg-white"
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              >
                <div className="px-5 py-4 font-semibold border-b border-amber-200 text-neutral-900">
                  Navigation
                </div>
                <div className="px-5 py-4 text-base text-neutral-900">
                  <div className="flex flex-col gap-1">
                    {LINKS.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-xl px-3 py-3 transition ${
                          active === l.href.slice(1) ? "bg-amber-50 text-amber-800" : "hover:bg-neutral-100"
                        }`}
                      >
                        {l.label}
                      </a>
                    ))}
                    <a
                      href="tel:0987654321"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-amber-600 text-white px-4 py-3 font-medium shadow hover:bg-amber-700 transition"
                      onClick={() => setOpen(false)}
                    >
                      Appeler maintenant
                    </a>
                  </div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* réserve la hauteur du header */}
      <div className="h-20" />
    </>
  );
}
