"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudyTechCategory } from "@/types/case-study";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { getTechIcon } from "@/lib/tech-icons";
import CaseBadge from "@/components/case-study/ui/CaseBadge";

type CaseStudyTechStackProps = {
  categories: CaseStudyTechCategory[];
};

/**
 * Two-column tech stack cards with logo chips.
 */
export default function CaseStudyTechStack({ categories }: CaseStudyTechStackProps) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-[#f5f5f4] px-4 py-10 md:px-5 md:py-14 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto flex max-w-[1200px] flex-col gap-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-center text-[32px] font-light leading-[40px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]"
        >
          Технологический стек
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <motion.article
              key={category.label}
              variants={fadeInUp}
              className="flex min-h-[264px] flex-col gap-4 rounded-[20px] border border-[#e6e6e5] border-b-2 bg-white px-[17px] py-[17px]"
            >
              <CaseBadge label={category.label} />
              <p className="text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px]">
                {category.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-[10px]">
                {category.logos.map((logo) => {
                  const icon = getTechIcon(logo.id);
                  if (!icon) return null;

                  return (
                    <div
                      key={logo.id}
                      className="flex size-[108px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[20px] border border-[#d9d9d9] bg-[#e6e6e5] px-2"
                    >
                      <Image
                        src={icon.src}
                        alt=""
                        width={32}
                        height={32}
                        aria-hidden
                        className="size-8 object-contain"
                      />
                      <span className="text-center text-[14px] font-medium leading-none tracking-[-0.07px] text-[#242424]">
                        {icon.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
