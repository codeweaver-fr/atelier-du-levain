"use client";

import Image from "next/image";
import type React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo, useState, useCallback } from "react";

/* -------------------- Types & Data -------------------- */

type Category = "Viennoiseries" | "Pains" | "Pâtisseries" | "Sandwichs";

type Product = {
  id: string;
  title: string;
  category: Category;
  price: number;
  desc: string;
  tags?: string[];
  image: string; // chemin public/ ou URL distante
  featuredWeight?: number;
  isNew?: boolean;
  isBio?: boolean;
};

const CATEGORIES: Category[] = ["Viennoiseries", "Pains", "Pâtisseries", "Sandwichs"];

const PRODUCTS: Product[] = [
  { id:"croissant-aop", title:"Croissant AOP", category:"Viennoiseries", price:1.3, desc:"Beurre AOP, feuilletage fin, cuisson du matin.", tags:["Beurre AOP","Levain"], image:"/Images/specialites/croissant.png", isNew:true, featuredWeight:2 },
  { id:"pain-levain", title:"Pain au levain", category:"Pains", price:3.6, desc:"Farines locales, fermentation longue.", tags:["Farines locales"], image:"/Images/specialites/pain_au_levain.png", isBio:true, featuredWeight:3 },
  { id:"pain-chocolat", title:"Pain au chocolat", category:"Viennoiseries", price:1.5, desc:"Deux barres de chocolat noir, crousti-fondant.", image:"/Images/specialites/pain_au_chocolat.png" },
  { id:"tarte-abricot", title:"Tarte à l'abricot", category:"Pâtisseries", price:3.9, desc:"Crème d'amande légère, fruits de saison.", tags:["Saison"], image:"/Images/specialites/tarte_abricots.png", isNew:true },
  { id:"baguette-tradition", title:"Baguette tradition", category:"Pains", price:1.1, desc:"Alvéolée, croûte fine, mie parfumée.", tags:["Maison"], image:"/Images/specialites/baguette_tradition.png" },
  { id:"sandwich-jambon-beurre", title:"Jambon-beurre", category:"Sandwichs", price:4.5, desc:"Beurre de baratte, jambon supérieur, cornichons.", image:"/Images/specialites/jambon_beurre.png" },
  { id:"tarte-citron", title:"Tartelette citron meringuée", category:"Pâtisseries", price:3.2, desc:"Crème citron soyeuse, meringue italienne.", image:"/Images/specialites/tarte_citron.png", featuredWeight:2 },
  { id:"focaccia", title:"Focaccia romarin", category:"Pains", price:3.5, desc:"Huile d’olive, romarin, sel de Camargue.", image:"/Images/specialites/foccacia_romarin.png" },
  { id:"sandwich-poulet-crudites", title:"Poulet rôti & crudités", category:"Sandwichs", price:4.5, desc:"Poulet fermier, tomates, concombre, mayo citronnée, pain tradition.", tags:["Poulet fermier","Maison"], image:"/Images/specialites/sandwich_poulet_crudites.png" },
  { id:"sandwich-veggie-chevre-miel", title:"Végé chèvre-miel", category:"Sandwichs", price:5.0, desc:"Chèvre frais, miel, roquette, noix, pain aux céréales.", tags:["Végétarien"], image:"/Images/specialites/sandwich_veggie_chevre_miel.png" },
  { id:"chausson-pommes", title:"Chausson aux pommes", category:"Viennoiseries", price:1.8, desc:"Compote de pommes maison, feuilletage caramélisé, cannelle.", tags:["Maison"], image:"/Images/specialites/chausson_pommes.png" },
  { id:"eclair-chocolat", title:"Éclair chocolat", category:"Pâtisseries", price:2.8, desc:"Crème pâtissière chocolat 64%, glaçage brillant.", tags:["Classique"], image:"/Images/specialites/eclair_chocolat.png", featuredWeight:2 },
];

function pickDailySpecial(list: Product[]) {
  if (!list.length) return null;
  const day = new Date().getDay();
  const scored = list.map((p, i) => ({ p, score: (p.featuredWeight ?? 1) + ((i + day) % 3) }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

/* -------------------- Component -------------------- */

export default function Specialites() {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState<Category>("Viennoiseries");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => PRODUCTS.filter((p) => p.category === active), [active]);
  const daily = useMemo(() => pickDailySpecial(PRODUCTS), []);

  const open = useCallback((p: Product) => setSelected(p), []);
  const close = useCallback(() => setSelected(null), []);

  return (
    <section id="specialites" className="relative py-16 md:py-20 lg:py-24">
      {/* Titre */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-amber-700 to-amber-500 bg-clip-text text-transparent">
            Nos spécialités
          </span>
        </h2>
        <p className="mt-2 text-neutral-600 max-w-2xl">
          Viennoiseries croustillantes, pains de caractère, pâtisseries fines —
          <span className="text-neutral-800"> fait maison</span> chaque matin.
        </p>
      </div>

      {/* Signature du jour */}
      {daily && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl h-[20rem] sm:h-[22rem] lg:h-[26rem] ring-1 ring-neutral-200/60 cursor-zoom-in"
            aria-label={`Signature du jour : ${daily.title}`}
            onClick={() => open(daily)}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              if (e.key === "Enter") open(daily);
            }}
          >
            <Image src={daily.image} alt={daily.title} fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-transparent" />
            {!prefersReduced && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -z-10 bottom-10 left-10 h-28 w-28 rounded-full blur-3xl"
                style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(245,158,11,.35), rgba(217,119,6,.12), transparent)" }}
                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="absolute inset-0 p-5 sm:p-8 lg:p-10 flex items-end">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white/90 backdrop-blur">
                  Signature du jour
                  {daily.isNew && <span className="rounded-full bg-emerald-500/20 text-emerald-100 px-2 py-0.5">Nouveau</span>}
                  {daily.isBio && <span className="rounded-full bg-emerald-500/20 text-emerald-100 px-2 py-0.5">Bio</span>}
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold text-white drop-shadow">{daily.title}</h3>
                <p className="mt-2 text-white/90">{daily.desc}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); open(daily);
                    }}
                    className="inline-flex items-center rounded-full border border-white/70 text-white px-4 py-2 text-sm hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    Voir en grand
                  </button>

                  <a
                    href="#apropos"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center rounded-full bg-white/90 text-neutral-900 px-3 py-1 text-sm font-medium shadow hover:bg-white"
                  >
                    Nos engagements
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      )}

      {/* Filtres catégories — NON sticky */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => {
            const activeStyle =
              c === active
                ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50";
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${activeStyle}`}
                aria-pressed={c === active}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Liste produits : pile mobile, grilles desktop */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile : 1 carte par ligne */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filtered.map((p) => (
            <Card key={p.id} product={p} onOpen={() => open(p)} />
          ))}
        </div>

        {/* Desktop : grille 2/3 colonnes */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} product={p} onOpen={() => open(p)} />
          ))}
        </div>
      </div>

      {/* Visionneuse */}
      <GalleryModal product={selected} onClose={close} />
    </section>
  );
}

/* -------------------- Card -------------------- */

function Card({
  product,
  className = "",
  onOpen,
}: {
  product: Product;
  className?: string;
  onOpen?: () => void;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl ring-1 ring-neutral-200/60 cursor-zoom-in h-64 sm:h-72 md:h-80 ${className}`}
      aria-label={product.title}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" && onOpen) onOpen();
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        fill
        sizes="(max-width:768px) 92vw, (max-width:1024px) 33vw, 28vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/10 blur-xl opacity-0 transition group-hover:opacity-100 group-hover:translate-x-[220%]" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {product.isNew && (
            <span className="rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 px-2 py-0.5 text-xs">
              Nouveau
            </span>
          )}
          {product.isBio && (
            <span className="rounded-full bg-emerald-500/20 text-emerald-100 border border-emerald-300/30 px-2 py-0.5 text-xs">
              Bio
            </span>
          )}
          {product.tags?.map((t) => (
            <span key={t} className="rounded-full bg-white/10 text-white border border-white/20 px-2 py-0.5 text-xs backdrop-blur">
              {t}
            </span>
          ))}
        </div>

        <h3 className="mt-2 text-white text-lg font-semibold drop-shadow">{product.title}</h3>
        <p className="text-white/90 text-sm line-clamp-2">{product.desc}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-white/90 text-neutral-900 px-3 py-1 text-sm font-medium shadow">
            {product.price.toFixed(2).replace(".", ",")} €
          </span>
          <span className="rounded-full border border-white/70 text-white px-3 py-1.5 text-xs opacity-90 group-hover:bg-white/10 transition">
            Voir en grand ⤢
          </span>
        </div>
      </div>

      {!prefersReduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-10 bottom-8 left-8 h-20 w-20 rounded-full blur-2xl"
          style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(245,158,11,.32), rgba(217,119,6,.12), transparent)" }}
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.article>
  );
}

/* -------------------- Modal -------------------- */

function GalleryModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.button type="button" aria-label="Fermer" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            className="absolute inset-4 md:inset-10 lg:inset-16 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-neutral-900"
            initial={prefersReduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
            animate={prefersReduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="relative h-full">
              <Image src={product.image} alt={product.title} fill sizes="100vw" className="object-contain md:object-cover" priority />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 sm:p-6">
                <div className="max-w-4xl">
                  <h3 className="text-white text-2xl font-semibold">{product.title}</h3>
                  <p className="text-white/90 mt-1">{product.desc}</p>
                </div>
              </div>
              <button onClick={onClose} className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white text-neutral-900 p-2 text-sm font-medium shadow">
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
