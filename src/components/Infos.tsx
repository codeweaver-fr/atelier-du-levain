"use client";

import Image from "next/image";
import { useMemo } from "react";

const SCHEDULE: Record<number, { start: string; end: string }[]> = {
  0: [{ start: "06:00", end: "13:00" }],
  1: [{ start: "05:30", end: "19:30" }],
  2: [{ start: "05:30", end: "19:30" }],
  3: [{ start: "05:30", end: "19:30" }],
  4: [{ start: "05:30", end: "19:30" }],
  5: [{ start: "05:30", end: "19:30" }],
  6: [{ start: "05:30", end: "19:30" }],
};

function toMin(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
function isOpenNow(d = new Date()) {
  const day = d.getDay();
  const min = d.getHours() * 60 + d.getMinutes();
  return (SCHEDULE[day] || []).some((r) => min >= toMin(r.start) && min < toMin(r.end));
}

export default function Infos() {
  const open = useMemo(() => isOpenNow(), []);
  return (
    <section id="infos" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2">
        {/* Contact */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Infos & contact</h2>

          <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
            <div className="flex items-center gap-2 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${open ? "bg-emerald-500" : "bg-rose-500"}`} />
              <span className={open ? "text-emerald-700" : "text-rose-700"}>
                {open ? "Ouvert maintenant" : "Fermé en ce moment"}
              </span>
            </div>

            <dl className="mt-4 grid gap-3 text-neutral-700">
              <div className="flex items-center gap-3">
                <dt className="w-24 text-neutral-500">Téléphone</dt>
                <dd><a className="text-amber-700 hover:underline" href="tel:0987654321">09 87 65 43 21</a></dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="w-24 text-neutral-500">Adresse</dt>
                <dd>12, Place d’Armes — 83000 Ville (démo)</dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="w-24 text-neutral-500">Horaires</dt>
                <dd>Lun–Sam 5h30–19h30 · Dim 6h–13h</dd>
              </div>
            </dl>

            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=12%20Place%20d%27Armes"
                target="_blank"
                className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Plan (Next/Image) */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-neutral-200/60 bg-neutral-100">
          <Image
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop"
            alt="Plan de quartier (image illustrative)"
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-900/10 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
