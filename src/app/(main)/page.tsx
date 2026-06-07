import Hero from "@/components/sections/Hero";
import Why from "@/components/sections/Why";
import HowWeHelp from "@/components/sections/HowWeHelp";
import ExpertiseTagline from "@/components/sections/ExpertiseTagline";
import Cases from "@/components/sections/Cases";
import Process from "@/components/sections/Process";
import MacbookFramePrefetch from "@/components/case-study/MacbookFramePrefetch";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Why />
      <HowWeHelp />
      <ExpertiseTagline />
      <Cases />
      <Process />
      <MacbookFramePrefetch />
    </main>
  );
}
