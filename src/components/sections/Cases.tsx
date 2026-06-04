"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import CaseArrowIcon from "@/components/case-study/ui/CaseArrowIcon";
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
    <motion.div
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.08, transition: springPop },
      }}
      className="absolute right-[8px] top-[8px] z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white"
    >
      <CaseArrowIcon />
    </motion.div>
  );
}

function CaseCardShell({
  href,
  title,
  description,
  textMaxWidth,
  className,
  heightClass = "h-[520px]",
  children,
}: {
  href: string;
  title: string;
  description: string;
  textMaxWidth: string;
  className?: string;
  heightClass?: string;
  children?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Link href={href} className="block">
      <motion.article
        className={`relative isolate ${heightClass} cursor-pointer overflow-hidden rounded-[20px] border border-b-2 border-[#e6e6e5] bg-[#fafaf9] ${className ?? ""}`}
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
    </Link>
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

function RuqiMainShot() {
  return (
    <Image
      src="/cases/ruqi-main.png"
      alt="RUQI — список исполнителей"
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1440px) 70vw, 968px"
      className="object-cover object-left md:object-left-top"
    />
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
      href="/cases/ruqi"
      title={title}
      description={description}
      textMaxWidth="max-w-[544px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[225px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.22)] md:hidden"
      >
        <RuqiMainShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiMain}
        className="bottom-0 left-[28px] right-[28px] top-[207px] hidden shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.22)] md:block"
      >
        <RuqiMainShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiForm}
        className="bottom-0 left-[620px] right-[28px] top-[107px] hidden shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)] md:block"
      >
        <Image
          src="/cases/ruqi-form.png"
          alt="RUQI — форма вакансии"
          fill
          sizes="(max-width: 1440px) 40vw, 552px"
          className="object-cover object-left-top"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function FinoCaseShot() {
  return (
    <Image
      src="/cases/fino.png"
      alt="FINO+ — договоры"
      fill
      sizes="(max-width: 767px) 100vw, 531px"
      className="object-cover object-left-top"
    />
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
      href="/cases/fino"
      title={title}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[225px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <FinoCaseShot />
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
      href="/cases/ifeelgood"
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
          className="object-cover"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function AlvaCaseShot() {
  return (
    <Image
      src="/cases/alva/mockup/screen-content.png"
      alt="Альва — новая заявка"
      fill
      sizes="(max-width: 767px) 100vw, 531px"
      className="object-cover object-top"
    />
  );
}

function CaseAlva({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/alva"
      title={title}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[225px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <AlvaCaseShot />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function RzdErrorsShot() {
  return (
    <Image
      src="/cases/rzd-errors.png"
      alt="РЖД — замечания"
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1440px) 70vw, 968px"
      className="object-cover object-left-top"
    />
  );
}

function RzdHomeShot() {
  return (
    <Image
      src="/cases/rzd/mockup/screen-content.png"
      alt="РЖД — панель мониторинга"
      fill
      sizes="(max-width: 1440px) 40vw, 552px"
      className="object-cover object-top"
    />
  );
}

function CaseRzd({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/rzd"
      title={title}
      description={description}
      textMaxWidth="max-w-[544px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[225px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)] md:hidden"
      >
        <RzdErrorsShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiMain}
        className="bottom-0 left-[28px] right-[28px] top-[207px] hidden shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)] md:block"
      >
        <RzdErrorsShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiForm}
        className="bottom-0 left-[620px] right-[28px] top-[107px] hidden shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)] md:block"
      >
        <RzdHomeShot />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function AstrakhCaseShot() {
  return (
    <Image
      src="/cases/astrakh/mockup/screen-content.png"
      alt="АСтрахование — услуги"
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1440px) 44vw, 534px"
      className="object-cover object-top"
    />
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
      href="/cases/astrakh"
      title={title}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[206px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)] md:right-[28px]"
      >
        <AstrakhCaseShot />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

/**
 * Cases section — grid of client case study cards.
 */
export default function Cases() {
  const [ruqi, fino, ifeelgood, rzd, alva, astrakh] = CASES_CONTENT.items;

  return (
    <section
      id="cases"
      className="w-full bg-[#f5f5f5] px-4 pb-[60px] md:px-5 md:pb-[75px] min-[1440px]:px-[120px]"
      aria-label="Наши кейсы"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col">
        <div className="flex items-center justify-center py-[30px]">
          <motion.h2
            className="text-center text-[28px] font-light leading-[34px] tracking-[-0.5px] text-black md:text-[45px] md:leading-[50px] md:tracking-[-0.64px]"
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
            className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
            variants={fadeInUp}
          >
            <div id="case-alva">
              <CaseAlva title={alva.title} description={alva.description} />
            </div>
            <div id="case-astrakh">
              <CaseAstrakh
                title={astrakh.title}
                description={astrakh.description}
              />
            </div>
          </motion.div>

          <motion.div id="case-rzd" variants={fadeInUp}>
            <CaseRzd title={rzd.title} description={rzd.description} />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-[20px] md:grid-cols-2"
            variants={fadeInUp}
          >
            <div id="case-ifeelgood">
              <CaseIfeelgood
                title={ifeelgood.title}
                description={ifeelgood.description}
              />
            </div>
            <div id="case-fino">
              <CaseFino title={fino.title} description={fino.description} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
