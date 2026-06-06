"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HEADER_CONTENT } from "@/lib/constants";

import CaseBadge from "@/components/case-study/ui/CaseBadge";
import CaseArrowIcon from "@/components/case-study/ui/CaseArrowIcon";
import { MACBOOK_SCREEN_VIEWPORT_WIDTH } from "@/components/case-study/CaseStudyHeroGallery";

type CaseStudyHeroProps = {
  title: string;
  subtitle?: string;
  description: string;
  descriptionMaxWidth?: string;
  descriptionDelay?: number;
};

const MS_PER_CHAR = 28;

function TypewriterDescription({ text, delay = 0 }: { text: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(delay === 0);
  const done = count >= text.length;

  useEffect(() => {
    if (delay === 0) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || done) return;
    const t = setTimeout(() => setCount((c) => c + 1), MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [started, count, done]);

  return (
    <span className="relative block">
      {/* Invisible spacer — keeps the container height stable */}
      <span aria-hidden className="invisible">{text}</span>
      <span className="absolute inset-0 text-center">
        {text.slice(0, count)}
        {started && !done && (
          <span aria-hidden className="animate-pulse opacity-40">|</span>
        )}
      </span>
    </span>
  );
}

/**
 * Case study page hero with badge, title and subtitle.
 */
export default function CaseStudyHero({
  title,
  subtitle,
  description,
  descriptionMaxWidth = MACBOOK_SCREEN_VIEWPORT_WIDTH,
  descriptionDelay,
}: CaseStudyHeroProps) {
  return (
    <section className="bg-[#f5f5f4] px-4 pb-0 pt-16 md:px-5 md:pt-20 min-[1440px]:px-[120px] min-[1440px]:pt-[90px]">
      <motion.div
        className="mx-auto flex max-w-[1200px] flex-col items-center gap-[10px] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CaseBadge />
        <h1 className="text-[32px] font-medium leading-[40px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]">
          <span className="text-[#e37952]">{title}</span>
          {subtitle && <> / {subtitle}</>}
        </h1>
        <p
          className="w-full text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-black md:max-w-[var(--desc-mw)] md:text-[19px] md:leading-[27px]"
          style={{ "--desc-mw": descriptionMaxWidth } as React.CSSProperties}
        >
          {descriptionDelay != null ? (
            <TypewriterDescription text={description} delay={descriptionDelay} />
          ) : (
            description
          )}
        </p>
        <a
          href={HEADER_CONTENT.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[34px] inline-flex h-[41px] items-center gap-2 rounded-[14px] bg-[#242424] px-[17px] text-[16px] font-medium tracking-[-0.17px] text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
        >
          Связаться
          <CaseArrowIcon />
        </a>
      </motion.div>
    </section>
  );
}
