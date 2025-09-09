import Hero from "@/components/Hero";
import Specialites from "@/components/Specialites";
import APropos from "@/components/APropos";
import Infos from "@/components/Infos";

export default function Page() {
  return (
    <>
      <Hero />
      <Specialites />   {/* id="specialites" est dans le composant */}
      <APropos />       {/* id="apropos" */}
      <Infos />         {/* id="infos" */}
    </>
  );
}
