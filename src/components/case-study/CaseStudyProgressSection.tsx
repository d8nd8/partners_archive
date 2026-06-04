"use client";

import { motion } from "framer-motion";
import type { CaseStudyProgress } from "@/types/case-study";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

type CaseStudyProgressSectionProps = {
  progress: CaseStudyProgress;
  statusMessage?: string;
};

/**
 * Project progress bar with optional status copy.
 */
export default function CaseStudyProgressSection({
  progress,
  statusMessage,
}: CaseStudyProgressSectionProps) {
  return (
    <section className="bg-[#f5f5f4] px-4 py-8 md:px-5 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto flex max-w-[1200px] flex-col gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {statusMessage && (
          <p className="text-center text-[24px] font-light leading-[32px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]">
            {statusMessage}
          </p>
        )}

        <div className="mx-auto w-full max-w-[658px] rounded-[16px] bg-[#e6e6e5] p-[3px]">
          <div className="relative h-[25px] overflow-hidden rounded-[13px] bg-[#fafaf9]">
            <div
              className="absolute inset-y-0 left-[3px] rounded-[12px] bg-[#e37952]"
              style={{ width: `calc(${progress.value}% - 6px)` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[16px] font-light leading-[23px] tracking-[-0.17px] text-black">
              {progress.label}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
