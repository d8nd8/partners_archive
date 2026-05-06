"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HOW_WE_HELP_CONTENT } from "@/lib/constants";
import {
  fadeInUp,
  staggerContainer,
  codeLineVariant,
  codeBlockStagger,
  VIEWPORT,
} from "@/lib/motion";

const codeFont =
  "font-['Inter',_sans-serif] font-light text-[14px] leading-[18.2px] tracking-[-0.07px] not-italic";

const TOP_CODE_LINES: (React.ReactNode | null)[] = [
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" audit = "}</span>
    <span className="text-[#e37952]">await analyzeBusiness</span>
    <span className="text-[#cfcfcf]">(company);</span>
  </>,
  null,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" bottlenecks = "}</span>
    <span className="text-[#e37952]">audit.findBottlenecks</span>
    <span className="text-[#cfcfcf]">();</span>
  </>,
  null,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" risks = "}</span>
    <span className="text-[#e37952]">audit.assessRisks</span>
    <span className="text-[#cfcfcf]">{'({ severity: "critical" });'}</span>
  </>,
  null,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" savings = "}</span>
    <span className="text-[#e37952]">bottlenecks.calculatePotential</span>
    <span className="text-[#cfcfcf]">();</span>
  </>,
  <span className="text-[#646464]">{'// savings: { monthly: "₽340,000", annual: "₽4.1M" }'}</span>,
];

const BOTTOM_CODE_LINES: (React.ReactNode | null)[] = [
  <span className="text-[#646464]">{"// audit passed to roadmap builder"}</span>,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" before = "}</span>
    <span className="text-[#e37952]">audit.processes.getAll</span>
    <span className="text-[#cfcfcf]">();</span>
  </>,
  <span className="text-[#646464]">{"// Found: 47 manual operations, 12 redundant tools"}</span>,
  null,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" strategy = "}</span>
    <span className="text-[#e37952]">await buildRoadmap</span>
    <span className="text-[#cfcfcf]">(before, savings.priority);</span>
  </>,
  <>
    <span className="text-[#e37952]">const</span>
    <span className="text-[#cfcfcf]">{" after = "}</span>
    <span className="text-[#e37952]">strategy.implement</span>
    <span className="text-[#cfcfcf]">{'({ timeline: "6 months" });'}</span>
  </>,
  <span className="text-[#646464]">{"// Result: -68% overhead, +3.2x team velocity"}</span>,
];

function CodeLines({ lines }: { lines: (React.ReactNode | null)[] }) {
  return (
    <motion.div
      variants={codeBlockStagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {lines.map((line, i) =>
        line === null ? (
          <div key={i} className="h-[18.2px]" />
        ) : (
          <motion.div key={i} variants={codeLineVariant} className={`${codeFont} whitespace-nowrap`}>
            {line}
          </motion.div>
        ),
      )}
    </motion.div>
  );
}

function CodePreview() {
  return (
    <div className="relative h-[440px] w-full">
      <Image
        src="/images/code-connector.svg"
        alt=""
        width={640}
        height={440}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="absolute left-[21px] top-0 w-[652px] overflow-hidden rounded-[12px] border border-[#303030] bg-[#242424] p-[9px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="relative rounded-[8px] bg-[rgba(255,255,255,0.08)] px-[32px] py-[16px] shadow-[inset_0px_-1.065px_0px_0px_rgba(255,255,255,0.1)]">
          <CodeLines lines={TOP_CODE_LINES} />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[385px] overflow-hidden rounded-[12px] border border-[#303030] bg-[#242424] p-[9px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <div className="relative rounded-[8px] bg-[rgba(255,255,255,0.08)] p-[16px] shadow-[inset_0px_-1.065px_0px_0px_rgba(255,255,255,0.1)]">
          <CodeLines lines={BOTTOM_CODE_LINES} />
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
  return (
    <section
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
                className="rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-white"
                whileTap={{ scale: 0.97 }}
              >
                {HOW_WE_HELP_CONTENT.cta.ask}
              </motion.button>
              <motion.button
                className="rounded-[14px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-white"
                whileTap={{ scale: 0.97 }}
              >
                {HOW_WE_HELP_CONTENT.cta.contact}
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
