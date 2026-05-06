"use client";

import { motion } from "framer-motion";
import { WHY_CONTENT } from "@/lib/constants";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import {
  WhyIconClipboardList,
  WhyIconEyeOff,
  WhyIconFileX,
  WhyIconGrid2X2Plus,
  WhyIconSlidersVertical,
  WhyIconSquareArrowOutUpRight,
  WhyIconUserRoundMinus,
  WhyIconUserRoundPlus,
} from "@/components/icons/why-section";

const ICON_MAP = {
  FileX: WhyIconFileX,
  UserRoundPlus: WhyIconUserRoundPlus,
  Grid2X2Plus: WhyIconGrid2X2Plus,
  EyeOff: WhyIconEyeOff,
  UserRoundMinus: WhyIconUserRoundMinus,
  ClipboardList: WhyIconClipboardList,
  SlidersVertical: WhyIconSlidersVertical,
  SquareArrowOutUpRight: WhyIconSquareArrowOutUpRight,
} as const;

function CardIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name as keyof typeof ICON_MAP];
  if (!Icon) return null;
  return (
    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#ffded2]">
      <Icon className="block size-6 shrink-0 translate-x-[3px] translate-y-[2px] text-[#e37952]" />
    </div>
  );
}

function ProblemCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: readonly string[];
}) {
  return (
    <motion.div
      className="flex h-[406px] w-full flex-col gap-4 rounded-[20px] border border-b-2 border-[#e6e6e5] bg-white pb-[18px] pt-[17px] px-[17px]"
      variants={fadeInUp}
    >
      <CardIcon name={icon} />
      <div className="flex flex-col gap-[6.88px]">
        <p className="pb-[10px] text-[19px] font-medium leading-[27px] tracking-[-0.2px] text-black">
          {title}
        </p>
        {items.map((item) => (
          <p
            key={item}
            className="border-b border-[#e6e6e5] pb-[7px] text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#8f8f8f]"
          >
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function SolutionCard({ icon, title }: { icon: string; title: string }) {
  return (
    <motion.div
      className="flex h-[171px] w-full flex-col gap-[27px] rounded-[20px] border border-b-2 border-[#e6e6e5] bg-white pb-[18px] pt-[17px] px-[17px]"
      variants={fadeInUp}
    >
      <CardIcon name={icon} />
      <p className="text-[19px] font-medium leading-[27px] tracking-[-0.2px] text-black">
        {title}
      </p>
    </motion.div>
  );
}

/**
 * Why section — problems and solutions grid.
 */
export default function Why() {
  return (
    <section
      className="w-full border-t border-[#e6e6e5] bg-[#f5f5f5] py-[75px] px-5 min-[1440px]:px-[120px]"
      aria-label="Почему к нам приходят"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[40px]">
        <motion.h2
          className="text-center text-[45px] font-light leading-[50px] tracking-[-0.64px] text-black"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.heading}
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 items-start gap-[20px] pt-[30px] sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.problems.map((card) => (
            <ProblemCard key={card.title} {...card} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-[33px] font-light leading-[43.2px] text-[#3e3e3e]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.subheading.before}
          <span className="text-[#e37952]">{WHY_CONTENT.subheading.accent}</span>
          {WHY_CONTENT.subheading.after}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 items-start gap-[20px] sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.solutions.map((card) => (
            <SolutionCard key={card.title} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
