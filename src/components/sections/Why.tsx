"use client";

import { motion, type Variants } from "framer-motion";
import { WHY_CONTENT } from "@/lib/constants";
import { fadeInUp, VIEWPORT } from "@/lib/motion";
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

const ICON_OFFSET_CLASS = {
  FileX: "translate-x-[4px]",
  UserRoundPlus: "translate-x-[4px]",
  Grid2X2Plus: "translate-x-[3px]",
  EyeOff: "translate-x-[2px]",
  UserRoundMinus: "translate-x-[4px]",
  ClipboardList: "translate-x-[2px]",
  SlidersVertical: "translate-x-[3px]",
  SquareArrowOutUpRight: "",
} as const;

const SLOW_STAGGER_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.22 } },
};

function CardIcon({ name }: { name: string }) {
  const iconName = name as keyof typeof ICON_MAP;
  const Icon = ICON_MAP[iconName];
  if (!Icon) return null;
  return (
    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#ffded2]">
      <Icon
        className={`block size-6 shrink-0 text-[#e37952] ${ICON_OFFSET_CLASS[iconName]}`}
      />
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
      className="flex h-[325px] w-full flex-col gap-3 rounded-[20px] border border-b-2 border-[#e6e6e5] bg-white px-[14px] pb-[16px] pt-[14px] md:h-[406px] md:gap-4 md:px-[17px] md:pb-[18px] md:pt-[17px]"
      variants={fadeInUp}
    >
      <CardIcon name={icon} />
      <div className="flex flex-col gap-[6.88px]">
        <p className="pb-[10px] text-[16px] font-medium leading-[22px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px]">
          {title}
        </p>
        {items.map((item) => (
          <p
            key={item}
            className="border-b border-[#e6e6e5] pb-[7px] text-[14px] font-light leading-[19px] tracking-[-0.17px] text-[#8f8f8f] md:text-[16px] md:leading-[23px]"
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
      className="flex h-[137px] w-full flex-col gap-[14px] rounded-[20px] border border-b-2 border-[#e6e6e5] bg-white px-[14px] pb-[16px] pt-[14px] md:h-[171px] md:gap-[27px] md:px-[17px] md:pb-[18px] md:pt-[17px]"
      variants={fadeInUp}
    >
      <CardIcon name={icon} />
      <p className="text-[16px] font-medium leading-[22px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px]">
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
      className="w-full border-t border-[#e6e6e5] bg-[#f5f5f5] px-5 py-[50px] md:pb-[75px] md:pt-[35px] min-[1440px]:px-[120px]"
      aria-label="Почему к нам приходят"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[40px]">
        <motion.h2
          className="text-center text-[28px] font-light leading-[34px] tracking-[-0.5px] text-black md:text-[45px] md:leading-[50px] md:tracking-[-0.64px]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.heading}
        </motion.h2>

        <motion.div
          className="md:hidden -mx-5 overflow-x-auto pt-6"
          initial="visible"
          animate="visible"
        >
          <div className="flex gap-4 px-5 pb-4 snap-x snap-mandatory">
            {WHY_CONTENT.problems.map((card) => (
              <div key={card.title} className="w-[280px] shrink-0 snap-start">
                <ProblemCard {...card} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop: grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 items-start gap-[20px] pt-[30px]"
          variants={SLOW_STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.problems.map((card) => (
            <ProblemCard key={card.title} {...card} />
          ))}
        </motion.div>

        <motion.p
          className="text-center text-[20px] font-light leading-[28px] text-[#3e3e3e] md:text-[33px] md:leading-[43.2px]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {WHY_CONTENT.subheading.before}
          <span className="text-[#e37952]">{WHY_CONTENT.subheading.accent}</span>
          {WHY_CONTENT.subheading.after}
        </motion.p>

        <motion.div className="md:hidden flex flex-col gap-4 pb-2">
          {WHY_CONTENT.solutions.map((card) => (
            <SolutionCard key={card.title} {...card} />
          ))}
        </motion.div>

        {/* Desktop: grid (solutions) */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 items-start gap-[20px]"
          variants={SLOW_STAGGER_CONTAINER}
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
