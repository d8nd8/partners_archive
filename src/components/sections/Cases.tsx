"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CASES_CONTENT } from "@/lib/constants";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";

const springPop = {
  type: "spring" as const,
  stiffness: 420,
  damping: 30,
  mass: 0.85,
};

const caseCardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    y: -10,
    scale: 1.008,
    boxShadow:
      "0 32px 64px -16px rgba(0,0,0,0.14), 0 14px 28px -10px rgba(0,0,0,0.08)",
    transition: springPop,
  },
};

const shotRuqiMain: Variants = {
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: {
    x: -16,
    y: -10,
    rotate: -1.25,
    scale: 1.03,
    transition: springPop,
  },
};

const shotRuqiForm: Variants = {
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: {
    x: 20,
    y: 12,
    rotate: 2,
    scale: 1.045,
    transition: springPop,
  },
};

const shotCenterFloatCentred: Variants = {
  rest: { x: "-50%", y: 0, rotate: 0, scale: 1 },
  hover: {
    x: "-50%",
    y: -14,
    rotate: 1.85,
    scale: 1.028,
    transition: springPop,
  },
};

const shotFullBleedFloat: Variants = {
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: {
    x: 0,
    y: -12,
    rotate: -0.65,
    scale: 1.02,
    transition: springPop,
  },
};

const shotWideTilt: Variants = {
  rest: { x: "-50%", y: 0, rotate: 0, scale: 1 },
  hover: {
    x: "-50%",
    y: -10,
    rotate: -0.9,
    scale: 1.014,
    transition: springPop,
  },
};

const shotStackAccent: Variants = {
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: {
    x: 18,
    y: -10,
    rotate: 5.25,
    scale: 1.045,
    transition: springPop,
  },
};

const shotStatic: Variants = {
  rest: {},
  hover: {},
};

const frameRadiusVariants: Variants = {
  rest: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  hover: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    transition: springPop,
  },
};

function mergeVariants(base: Variants, extra: Variants): Variants {
  return {
    rest: { ...(extra.rest ?? {}), ...(base.rest ?? {}) },
    hover: { ...(extra.hover ?? {}), ...(base.hover ?? {}) },
  };
}

function CaseBadge() {
  return (
    <motion.div
      variants={{
        rest: { scale: 1, opacity: 1 },
        hover: { scale: 1.04, opacity: 1, transition: springPop },
      }}
      className="inline-flex w-fit shrink-0 origin-left items-center rounded-[4px] border border-[#f4bda9] bg-[#ffded2] pb-[1.19px] pl-[4px] pr-[4.67px] pt-[2px]"
    >
      <span className="text-[14px] font-light uppercase leading-[18.2px] tracking-[-0.07px] text-[#e37952]">
        {CASES_CONTENT.badge}
      </span>
    </motion.div>
  );
}

function CaseArrow() {
  return (
    <div className="pointer-events-none absolute right-[8px] top-[8px] flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white">
      <Image
        src="/cases/arrow.svg"
        alt=""
        width={16}
        height={16}
        className="block max-h-[18px] max-w-[18px] object-contain"
        aria-hidden
      />
    </div>
  );
}

function CaseCardShell({
  title,
  description,
  textMaxWidth,
  className,
  children,
}: {
  title: string;
  description: string;
  textMaxWidth: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`relative isolate h-[520px] cursor-pointer overflow-hidden rounded-[20px] border border-b-2 border-[#e6e6e5] bg-[#fafaf9] ${className ?? ""}`}
      variants={caseCardVariants}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : "hover"}
    >
      <div
        className={`absolute left-[28px] top-[28px] z-10 flex flex-col items-start gap-[8px] ${textMaxWidth}`}
      >
        <CaseBadge />
        <p className="w-full text-[33px] font-medium leading-[43.2px] text-black">
          {title}
        </p>
        <p className="w-full text-[16px] font-light leading-[22.95px] tracking-[-0.17px] text-[#afafaf]">
          {description}
        </p>
      </div>
      <CaseArrow />
      {children}
    </motion.article>
  );
}

function ScreenshotFrame({
  shotVariants,
  className,
  children,
}: {
  shotVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={mergeVariants(shotVariants ?? shotStatic, frameRadiusVariants)}
      className={`absolute overflow-hidden border border-[#e6e6e5] bg-white [&_img]:pointer-events-none [&_img]:select-none ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function CaseRuqi({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      title={title}
      description={description}
      textMaxWidth="max-w-[544px]"
    >
      <ScreenshotFrame
        shotVariants={shotRuqiMain}
        className="bottom-0 left-[28px] right-[204px] top-[207px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.22)]"
      >
        <Image
          src="/cases/ruqi-main.png"
          alt="RUQI — список исполнителей"
          fill
          sizes="(max-width: 1440px) 70vw, 968px"
          className="object-cover object-left-top"
        />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiForm}
        className="bottom-0 left-[620px] right-[28px] top-[107px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)]"
      >
        <Image
          src="/cases/ruqi-form.png"
          alt="RUQI — форма вакансии"
          fill
          sizes="(max-width: 1440px) 40vw, 552px"
          className="object-cover object-top"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function CaseFino({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      title={title}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotCenterFloatCentred}
        className="bottom-0 left-1/2 top-[225px] w-[531px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/cases/fino.png"
          alt="FINO+ — договоры"
          fill
          sizes="531px"
          className="object-cover object-top"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function CaseIfeelgood({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      title={title}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[28px] top-[206px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/cases/ifeelgood.png"
          alt="ifeelgood — профиль"
          fill
          sizes="(max-width: 1440px) 44vw, 534px"
          className="object-cover object-top"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function CaseAstrakh({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      title={title}
      description={description}
      textMaxWidth="max-w-[544px]"
    >
      <ScreenshotFrame
        shotVariants={shotWideTilt}
        className="bottom-0 left-1/2 top-[229px] w-[1141px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/cases/astrakh.png"
          alt="АСтрахование — главная"
          fill
          sizes="(max-width: 1440px) 90vw, 1141px"
          className="object-cover object-top"
        />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotStackAccent}
        className="bottom-0 left-[calc(50%+78px)] top-[52px] w-[383px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/cases/astrakh.png"
          alt="АСтрахование — сервисы"
          fill
          sizes="383px"
          className="object-cover object-[0%_60%]"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

/**
 * Cases section — grid of four client case study cards.
 */
export default function Cases() {
  const [ruqi, fino, ifeelgood, astrakh] = CASES_CONTENT.items;

  return (
    <section
      id="cases"
      className="w-full bg-[#f5f5f5] px-5 pb-[75px] min-[1440px]:px-[120px]"
      aria-label="Наши кейсы"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col">
        <div className="flex items-center justify-center py-[30px]">
          <motion.h2
            className="text-center text-[45px] font-light leading-[50px] tracking-[-0.64px] text-black"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {CASES_CONTENT.heading}
          </motion.h2>
        </div>

        <motion.div
          className="flex flex-col gap-[20px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <motion.div id="case-ruqi" variants={fadeInUp}>
            <CaseRuqi title={ruqi.title} description={ruqi.description} />
          </motion.div>

          <motion.div
            id="case-fino"
            className="grid grid-cols-2 gap-[20px]"
            variants={fadeInUp}
          >
            <CaseFino title={fino.title} description={fino.description} />
            <div id="case-ifeelgood">
              <CaseIfeelgood
                title={ifeelgood.title}
                description={ifeelgood.description}
              />
            </div>
          </motion.div>

          <motion.div id="case-astrakh" variants={fadeInUp}>
            <CaseAstrakh
              title={astrakh.title}
              description={astrakh.description}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
