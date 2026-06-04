"use client";

import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

type CaseStudyQuoteProps = {
  quote: string;
};

/**
 * Large centered insight quote between process and tech sections.
 */
export default function CaseStudyQuote({ quote }: CaseStudyQuoteProps) {
  return (
    <section className="bg-[#f5f5f4] px-4 py-10 md:px-5 md:py-14 min-[1440px]:px-[120px]">
      <motion.blockquote
        className="mx-auto max-w-[1200px] text-center text-[24px] font-light leading-[32px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {quote}
      </motion.blockquote>
    </section>
  );
}
