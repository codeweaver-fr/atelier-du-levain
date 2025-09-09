"use client";

import Image from "next/image";
import heroImg from "../../public/Images/hero-boulangerie.webp";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

// --- horaires (local time) ---
const schedule: Record<number, Array<{ start: string; end: string }>> = {
  0: [{ start: "06:00", end: "13:00" }],                 // Dim
  1: [{ start: "05:30", end: "19:30" }],                 // Lun
  2: [{ start: "05:30", end: "19:30" }],
  3: [{ start: "05:30", end: "19:30" }],
  4: [{ start: "05:30", end: "19:30" }],
  5: [{ start: "05:30", end: "19:30" }],
  6: [{ start: "05:30", end: "19:30" }],                 // Sam
};
function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function isOpenNow(d = new Date()) {
  const day = d.getDay();
  const min = d.getHours() * 60 + d.getMinutes();
  const ranges = schedule[day] || [];
  return ranges.some((r) => min >= toMin(r.start) && min < toMin(r.end));
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const prefersReduced = useReducedMotion();

  // Parallax scroll (halos)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const open = useMemo(() => isOpenNow(), []);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      {/* Fond + Ken Burns (respecte prefers-reduced-motion) */}
      <motion.div
        className="absolute inset-0 -z-20 h-[92svh]"
        initial={{ scale: prefersReduced ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: prefersReduced ? 0 : 24, ease: "easeOut" }}
      >
        <Image
          src={heroImg}
          alt="Fournil artisanal — ambiance chaleureuse"
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          className="object-cover object-[35%_50%] md:object-[38%_50%]"
        />
      </motion.div>

      {/* Voiles / vignette ciné / contraste côté texte */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/65 via-neutral-900/25 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-900/10 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[64%] md:w-[60%] bg-gradient-to-r from-black/60 via-black/28 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_65%,transparent,rgba(0,0,0,0.45))]" />

      {/* Halos ambrés (parallax scroll) */}
      <motion.div
        aria-hidden
        style={{ y: y1, background: "radial-gradient(40% 40% at 50% 50%, rgba(245,158,11,.32), rgba(217,119,6,.12), transparent)" }}
        className="pointer-events-none absolute -left-24 bottom-10 -z-10 h-[40vh] w-[40vh] rounded-full blur-3xl opacity-20"
      />
      <motion.div
        aria-hidden
        style={{ y: y2, background: "radial-gradient(40% 40% at 50% 50%, rgba(245,158,11,.26), rgba(217,119,6,.10), transparent)" }}
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-[36vh] w-[36vh] rounded-full blur-3xl opacity-16"
      />

      {/* Contenu — coussin bas mobile (chips/CTA + safe-area) */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[92svh] grid items-center pb-[calc(env(safe-area-inset-bottom)+88px)] md:pb-0">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              Démo fictive — Atelier du Levain
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${
                open ? "bg-emerald-500/15 text-emerald-200 border border-emerald-300/30"
                     : "bg-rose-500/15 text-rose-200 border border-rose-300/30"
              }`}
              title={open ? "Ouvert maintenant" : "Fermé en ce moment"}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-rose-400"}`} />
              {open ? "Ouvert maintenant" : "Fermé"}
            </span>
          </div>

          {/* Titre : gradient + halo “breathing” derrière le mot (pas de trait, pas de ruban) */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-balance text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
          >
            <span className="relative inline-block align-baseline">
              {/* halo ambré doux qui “respire” sous le mot */}
              {!prefersReduced && (
                <motion.span
                  aria-hidden
                  className="absolute -inset-x-4 -inset-y-1 -z-10 rounded-full"
                  style={{
                    background:
                      "radial-gradient(120% 140% at 20% 60%, rgba(245,158,11,0.18), rgba(245,158,11,0.06) 45%, transparent 65%)",
                    filter: "blur(2px)",
                  }}
                  animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}

              <span className="font-serif italic font-semibold tracking-normal bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                Savoir-faire artisanal
              </span>
            </span>{" "}
            & gourmandise au quotidien.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-4 max-w-2xl text-lg text-white/90"
          >
            Pains au levain, viennoiseries dorées, pâtisseries de saison. Simples,
            bonnes, honnêtes au cœur de votre quartier.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#specialites"
              className="rounded-full bg-amber-600 px-5 py-3 text-sm font-medium text-white shadow
                         ring-1 ring-amber-300/40 hover:bg-amber-700 hover:ring-amber-400/50
                         transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Découvrir nos créations
            </a>
            
          </motion.div>

          {/* Qualités */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["Levain naturel", "Farines locales", "Beurre AOP", "Cuisson du matin"].map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur hover:bg-white/15 transition"
              >
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Indicateur scroll (safe-area) */}
        <a
          href="#specialites"
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 text-white/80 hover:text-white transition z-30
                     bottom-[calc(env(safe-area-inset-bottom)+12px)] md:bottom-6"
          aria-label="Faire défiler vers les spécialités"
        >
          <span className="text-xs">Faire défiler</span>
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ y: 0 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </motion.svg>
        </a>
      </div>

      {/* Vapeurs (super légères) */}
      {!prefersReduced && (
        <>
          <motion.div
            aria-hidden
            initial={{ opacity: 0.0, y: 24 }}
            animate={{ opacity: [0.0, 0.22, 0.0], y: -80 }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.6 }}
            className="pointer-events-none absolute left-[22%] bottom-24 h-24 w-16 rounded-full blur-2xl bg-white/18"
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0.0, y: 24 }}
            animate={{ opacity: [0.0, 0.2, 0.0], y: -92 }}
            transition={{ duration: 7, repeat: Infinity, delay: 1.4 }}
            className="pointer-events-none absolute left-[30%] bottom-28 h-28 w-14 rounded-full blur-2xl bg-white/14"
          />
        </>
      )}
    </section>
  );
}
