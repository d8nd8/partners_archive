"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudyTechCategory } from "@/types/case-study";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { getTechIcon } from "@/lib/tech-icons";
import CaseBadge from "@/components/case-study/ui/CaseBadge";
import SectionHeading from "@/components/ui/SectionHeading";

type CaseStudyTechStackProps = {
  categories: CaseStudyTechCategory[];
};

/**
 * Two-column tech stack cards with logo chips.
 */
export default function CaseStudyTechStack({ categories }: CaseStudyTechStackProps) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-[#f5f5f4] px-4 md:px-5 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto flex max-w-[1200px] flex-col"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <SectionHeading>
          <motion.h2
            variants={fadeInUp}
            className="text-center text-[32px] font-light leading-[40px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]"
          >
            Технологический стек
          </motion.h2>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 md:pb-14">
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
              <div
                className="mt-auto flex flex-wrap gap-[10px] md:grid md:[grid-template-columns:var(--tech-cols)]"
                style={
                  {
                    "--tech-cols": `repeat(${category.logos.filter((l) => getTechIcon(l.id)).length}, minmax(0, 1fr))`,
                  } as React.CSSProperties
                }
              >
                {category.logos.map((logo) => {
                  const icon = getTechIcon(logo.id);
                  if (!icon) return null;

                  return (
                    <div
                      key={logo.id}
                      className="flex h-[108px] w-[112px] flex-col items-center overflow-hidden rounded-[20px] border border-[#d9d9d9] bg-[#e6e6e5] px-2 pt-3 pb-3 md:w-full"
                    >
                      <div className="flex flex-1 items-center justify-center">
                        <Image
                          src={icon.src}
                          alt=""
                          width={48}
                          height={48}
                          aria-hidden
                          className={`object-contain ${"iconClassName" in icon ? (icon as { iconClassName: string }).iconClassName : "size-8"}`}
                        />
                      </div>
                      <span className="text-center text-[13px] font-medium leading-none tracking-[-0.07px] text-[#242424] break-words md:text-[14px]">
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
