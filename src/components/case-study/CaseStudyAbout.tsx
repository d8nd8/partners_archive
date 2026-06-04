"use client";

import { motion } from "framer-motion";
import type { CaseStudyAbout as CaseStudyAboutContent } from "@/types/case-study";
import { fadeInUp, VIEWPORT } from "@/lib/motion";
import CaseBadge from "@/components/case-study/ui/CaseBadge";

type CaseStudyAboutProps = {
  about: CaseStudyAboutContent;
};

/**
 * About section with customer/task cards and descriptive copy.
 */
export default function CaseStudyAbout({ about }: CaseStudyAboutProps) {
  const { title = "О проекте", items, paragraphs } = about;

  if (items.length === 0 && paragraphs.length === 0) return null;

  return (
    <section className="bg-[#f5f5f4] px-4 pt-10 pb-6 md:px-5 md:pt-14 md:pb-8 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto flex max-w-[1368px] flex-col items-center gap-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <h2 className="text-center text-[32px] font-light leading-[40px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]">
          {title}
        </h2>

        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-10 lg:p-10">
          {items.length > 0 && (
            <div className="w-full shrink-0 overflow-hidden rounded-[20px] bg-[#565656] lg:max-w-[591px]">
              <div className="rounded-[20px] bg-[#464646] p-px">
                <div className="flex flex-col gap-4 rounded-[20px] border border-[#565656] border-b-2 bg-[#303030] px-[17px] py-[18px]">
                  {items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-4">
                      <CaseBadge label={item.label} />
                      <p className="text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-white md:text-[19px] md:leading-[27px]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="w-full text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px] lg:max-w-[573px]">
              {paragraphs.map((paragraph, index) => (
                <p key={`about-paragraph-${index}`} className={index > 0 ? "mt-6" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
