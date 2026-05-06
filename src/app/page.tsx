import Hero from "@/components/sections/Hero";
import Why from "@/components/sections/Why";
import HowWeHelp from "@/components/sections/HowWeHelp";
import ExpertiseTagline from "@/components/sections/ExpertiseTagline";
import Cases from "@/components/sections/Cases";
import Process from "@/components/sections/Process";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col rounded-b-[36px]">
      <Hero />
      <Why />
      <HowWeHelp />
      <ExpertiseTagline />
      <Cases />
      <Process />
    </main>
  );
}
