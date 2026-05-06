"use client";

import { motion } from "framer-motion";
import { EXPERTISE_TAGLINE_CONTENT } from "@/lib/constants";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

/**
 * Expertise tagline section — centered quote with orange accent highlights.
 */
export default function ExpertiseTagline() {
  const { before, accent1, middle, accent2, after } = EXPERTISE_TAGLINE_CONTENT;

  return (
    <section
      className="w-full bg-[#f5f5f5] px-5 py-[75px] min-[1440px]:px-[120px]"
      aria-label="Экспертиза команды"
    >
      <div className="mx-auto max-w-[1200px]">
        <motion.p
          className="text-center text-[33px] font-normal leading-[43.2px] text-[#3e3e3e]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {before}
          <span className="text-[#e37952]">{accent1}</span>
          {middle}
          <span className="text-[#e37952]">{accent2}</span>
          {after}
        </motion.p>
      </div>
    </section>
  );
}
