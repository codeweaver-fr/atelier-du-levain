import Hero from "@/components/Hero";

export default function Page() {
  return (
    <>
      <Hero />

      {/* Ancres minimales pour la nav (à remplacer par tes vraies sections) */}
      <section id="specialites" className="py-24" />
      <section id="apropos" className="py-24" />
      <section id="infos" className="py-24" />
    </>
  );
}
