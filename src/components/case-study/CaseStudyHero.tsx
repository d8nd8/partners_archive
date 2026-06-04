"use client";

import { motion } from "framer-motion";
import { HEADER_CONTENT } from "@/lib/constants";

import CaseBadge from "@/components/case-study/ui/CaseBadge";
import CaseArrowIcon from "@/components/case-study/ui/CaseArrowIcon";
import { MACBOOK_SCREEN_VIEWPORT_WIDTH } from "@/components/case-study/CaseStudyHeroGallery";

type CaseStudyHeroProps = {
  title: string;
  description: string;
  descriptionMaxWidth?: string;
};

/**
 * Case study page hero with badge, title and subtitle.
 */
export default function CaseStudyHero({
  title,
  description,
  descriptionMaxWidth = MACBOOK_SCREEN_VIEWPORT_WIDTH,
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
          {title}
        </h1>
        <p
          className="w-full text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px]"
          style={{ maxWidth: descriptionMaxWidth }}
        >
          {description}
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
