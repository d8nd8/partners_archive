"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { HOW_WE_HELP_CONTENT } from "@/lib/constants";
import {
  fadeInUp,
  staggerContainer,
  VIEWPORT,
} from "@/lib/motion";
import { useLeadModal } from "@/context/LeadModalContext";
import { useEffect, useMemo, useRef, useState } from "react";

const codeFont =
  "font-['Inter',_sans-serif] font-light text-[14px] leading-[18.2px] tracking-[-0.07px] not-italic";
const CONNECTOR_PATH_D =
  "M78.2794 220.235V328.888C78.2794 335.515 83.652 340.888 90.2794 340.888H326.721C333.349 340.888 338.721 346.261 338.721 352.888V421.494C338.721 428.121 344.094 433.494 350.721 433.494H957C963.627 433.494 969 428.121 969 421.494V241.261C969 234.633 963.627 229.261 957 229.261H808.376C801.748 229.261 796.376 223.888 796.376 217.261V106.607C796.376 99.9794 791.003 94.6069 784.376 94.6069H664.359C657.731 94.6069 652.359 89.2343 652.359 82.6069V13C652.359 6.37258 646.986 1 640.359 1H13C6.37258 1 1 6.37259 1 13V196.235C1 202.863 6.3726 208.235 13 208.235H66.2794C72.9068 208.235 78.2794 213.608 78.2794 220.235Z";


const TOP_CODE_LINES: (React.ReactNode | null)[] = [
  <span key="top-1">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" audit = "}</span>
    <span className="text-[#e37952]">await analyzeBusiness</span>
    <span className="text-[#cfcfcf]">(company);</span>
  </span>,
  null,
  <span key="top-2">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" bottlenecks = "}</span>
    <span className="text-[#e37952]">audit.findBottlenecks</span>
    <span className="text-[#cfcfcf]">();</span>
  </span>,
  null,
  <span key="top-3">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" risks = "}</span>
    <span className="text-[#e37952]">audit.assessRisks</span>
    <span className="text-[#cfcfcf]">{'({ severity: "critical" });'}</span>
  </span>,
  null,
  <span key="top-4">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" savings = "}</span>
    <span className="text-[#e37952]">bottlenecks.calculatePotential</span>
    <span className="text-[#cfcfcf]">();</span>
  </span>,
  <span key="top-5" className="text-[#646464]">
    {'// savings: { monthly: "₽340,000", annual: "₽4.1M" }'}
  </span>,
];

const BOTTOM_CODE_LINES: (React.ReactNode | null)[] = [
  <span key="bottom-1" className="text-[#646464]">
    {"// audit passed to roadmap builder"}
  </span>,
  <span key="bottom-2">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" before = "}</span>
    <span className="text-[#e37952]">audit.processes.getAll</span>
    <span className="text-[#cfcfcf]">();</span>
  </span>,
  <span key="bottom-3" className="text-[#646464]">
    {"// Found: 47 manual operations, 12 redundant tools"}
  </span>,
  null,
  <span key="bottom-4">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" strategy = "}</span>
    <span className="text-[#e37952]">await buildRoadmap</span>
    <span className="text-[#cfcfcf]">(before, savings.priority);</span>
  </span>,
  <span key="bottom-5">
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" after = "}</span>
    <span className="text-[#e37952]">strategy.implement</span>
    <span className="text-[#cfcfcf]">{'({ timeline: "6 months" });'}</span>
  </span>,
  <span key="bottom-6" className="text-[#646464]">
    {"// Result: -68% overhead, +3.2x team velocity"}
  </span>,
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function TypedCodeLines({
  lines,
  typedCount,
}: {
  lines: (React.ReactNode | null)[];
  typedCount: number;
}) {
  return (
    <div>
      {lines.map((line, i) => {
        if (line === null) return <div key={`spacer-${i}`} className="h-[18.2px]" />;

        const isTyped = i < typedCount;
        const shouldAnimate = i === typedCount - 1;

        if (!isTyped) return <div key={`empty-${i}`} className="h-[18.2px]" />;

        return (
          <motion.div
            key={`${i}-${shouldAnimate ? "anim" : "done"}`}
            className={`${codeFont} whitespace-nowrap`}
            initial={shouldAnimate ? { clipPath: "inset(0 100% 0 0)", opacity: 1 } : false}
            animate={shouldAnimate ? { clipPath: "inset(0 0% 0 0)", opacity: 1 } : undefined}
            transition={shouldAnimate ? { duration: 0.9, ease: "linear" } : undefined}
            style={{ willChange: shouldAnimate ? "clip-path" : undefined }}
          >
            {line}
          </motion.div>
        );
      })}
    </div>
  );
}

function CodePreview() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [topTypedCount, setTopTypedCount] = useState(0);
  const [bottomTypedCount, setBottomTypedCount] = useState(0);
  const [signalPhase, setSignalPhase] = useState<"idle" | "flash1" | "gap" | "flash2" | "done">("idle");

  const topTargets = useMemo(
    () => TOP_CODE_LINES.map((line, i) => (line === null ? null : i)).filter((v): v is number => v !== null),
    [],
  );
  const bottomTargets = useMemo(
    () => BOTTOM_CODE_LINES.map((line, i) => (line === null ? null : i)).filter((v): v is number => v !== null),
    [],
  );

  useEffect(() => {
    if (!inView) return;

    let cancelled = false;

    const run = async () => {
      const topMaxIndex = topTargets.length ? topTargets[topTargets.length - 1] : -1;
      for (const i of topTargets) {
        if (cancelled) return;
        setTopTypedCount(i + 1);
        await sleep(420);
      }
      if (cancelled) return;
      setTopTypedCount(topMaxIndex + 1);

      setSignalPhase("flash1");
      await sleep(350);
      if (cancelled) return;
      setSignalPhase("gap");
      await sleep(150);
      if (cancelled) return;
      setSignalPhase("flash2");
      await sleep(350);
      if (cancelled) return;
      setSignalPhase("done");

      const bottomMaxIndex = bottomTargets.length ? bottomTargets[bottomTargets.length - 1] : -1;
      for (const i of bottomTargets) {
        if (cancelled) return;
        setBottomTypedCount(i + 1);
        await sleep(420);
      }
      if (cancelled) return;
      setBottomTypedCount(bottomMaxIndex + 1);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [bottomTargets, inView, topTargets]);

  return (
    <div ref={ref} className="relative h-[440px] w-full">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 969 440"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={CONNECTOR_PATH_D} stroke="#323232" strokeWidth="1" />
        <motion.path
          d={CONNECTOR_PATH_D}
          stroke="#E37952"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{
            opacity: signalPhase === "flash1" || signalPhase === "flash2" ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0px 0px 8px rgba(227, 121, 82, 0.75))" }}
        />
      </svg>

      <div className="absolute left-[21px] top-0 w-[652px] overflow-hidden rounded-[12px] border border-[#303030] bg-[#242424] p-[9px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="relative rounded-[8px] bg-[rgba(255,255,255,0.08)] px-[32px] py-[16px] shadow-[inset_0px_-1.065px_0px_0px_rgba(255,255,255,0.1)]">
          <TypedCodeLines lines={TOP_CODE_LINES} typedCount={topTypedCount} />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[385px] overflow-hidden rounded-[12px] border border-[#303030] bg-[#242424] p-[9px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="relative rounded-[8px] bg-[rgba(255,255,255,0.08)] p-[16px] shadow-[inset_0px_-1.065px_0px_0px_rgba(255,255,255,0.1)]">
          <TypedCodeLines lines={BOTTOM_CODE_LINES} typedCount={bottomTypedCount} />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <motion.div
      className="relative h-[406px] overflow-hidden rounded-[20px] border border-[#464646]"
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="absolute inset-px overflow-hidden rounded-[20px] bg-[#303030]">
        <div className="absolute left-[20px] right-[20px] top-[20px]">
          <p className="text-[19px] font-medium leading-[27px] tracking-[-0.2px] text-white">
            {title}
          </p>
          <p className="mt-[10px] text-[16px] font-light leading-[22.95px] tracking-[-0.17px] text-[#cfcfcf]">
            {description}
          </p>
        </div>
        <div className="absolute left-[20px] right-[20px] top-[108.5px]">
          <Image
            src={image}
            alt=""
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * How we help section — hero header with code preview and service cards grid.
 */
export default function HowWeHelp() {
  const { openModal } = useLeadModal();

  return (
    <section
      id="how-we-help"
      className="w-full bg-[#f5f5f5] px-[36px] py-[10px]"
      aria-label="Как именно мы помогаем"
    >
      <div className="overflow-hidden rounded-[20px] bg-[#242424]">
        <motion.div
          className="flex gap-[48px] items-start px-[40px] py-[40px]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <div className="flex w-1/2 shrink-0 flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-[45px] font-light leading-[50px] tracking-[-0.64px] text-white">
                {HOW_WE_HELP_CONTENT.heading}
              </h2>
              <p className="text-[19px] font-light leading-[27px] tracking-[-0.2px] text-[#cfcfcf]">
                {HOW_WE_HELP_CONTENT.subtitle}
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={openModal}
                className="rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-white"
                whileTap={{ scale: 0.97 }}
              >
                {HOW_WE_HELP_CONTENT.cta.ask}
              </motion.button>
            </div>
          </div>

          <div className="w-1/2 shrink-0">
            <CodePreview />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-[20px] p-[40px] pt-0 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {HOW_WE_HELP_CONTENT.cards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
