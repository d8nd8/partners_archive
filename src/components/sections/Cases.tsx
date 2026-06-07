"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import CaseArrowIcon from "@/components/case-study/ui/CaseArrowIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCaseCardHref } from "@/lib/cases";
import { CASES_CONTENT } from "@/lib/constants";

const CASES_VIEWPORT = { once: true, amount: 0, margin: "0px 0px 18% 0px" } as const;

const casesRevealEase = [0.22, 1, 0.36, 1] as const;

const casesRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.48,
      delayChildren: 0.24,
    },
  },
};

const casesRevealItem: Variants = {
  hidden: (direction: number = 0) => ({
    opacity: 0,
    x: direction > 0 ? "14vw" : direction < 0 ? "-14vw" : 0,
    y: direction === 0 ? 10 : 18,
    scale: direction === 0 ? 1 : 0.985,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.85, ease: casesRevealEase },
  },
};

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
      <CaseArrowIcon className="size-4" />
    </motion.div>
  );
}

function CaseCardShell({
  href,
  title,
  subtitle,
  description,
  textMaxWidth,
  className,
  heightClass = "h-[520px]",
  children,
}: {
  href: string;
  title: string;
  subtitle?: string;
  description: string;
  textMaxWidth: string;
  className?: string;
  heightClass?: string;
  children?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const isExternal = href.startsWith("http");

  const card = (
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
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className="block">
      {card}
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
      src="/main/main-ruqimain.png"
      alt="RUQI — список исполнителей"
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 96vw, 1144px"
      className="object-cover object-left md:object-left-top"
    />
  );
}

function CaseRuqi({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/ruqi"
      title={title}
      subtitle={subtitle}
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
          src="/main/main-ruqiform.png"
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
      src="/main/main-fino.png"
      alt="FINO+ — договоры"
      fill
      sizes="(max-width: 767px) 100vw, 531px"
      className="object-cover object-left-top"
    />
  );
}

function CaseFino({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/fino"
      title={title}
      subtitle={subtitle}
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
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/ifeelgood"
      title={title}
      subtitle={subtitle}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[206px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)]"
      >
        <Image
          src="/main/main-ifg.webp"
          alt="ifeelgood — профиль"
          fill
          unoptimized
          sizes="(max-width: 1440px) 44vw, 534px"
          className="object-cover object-left-top"
        />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function AlvaCaseShot() {
  return (
    <Image
      src="/main/main-alva1.webp"
      alt="Альва — новая заявка"
      fill
      unoptimized
      sizes="(max-width: 767px) 100vw, 531px"
      className="object-cover object-[0%_20%] md:object-[0%_32%] scale-150 md:scale-100"
    />
  );
}

function CaseAlva({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/alva"
      title={title}
      subtitle={subtitle}
      description={description}
      textMaxWidth="max-w-[534px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[185px] md:top-[225px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]"
      >
        <AlvaCaseShot />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function RzhdErrorsShot() {
  return (
    <Image
      src="/main/main-rzhderror.png"
      alt="РЖД — замечания"
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 96vw, 1144px"
      className="object-cover object-left-top"
    />
  );
}

function RzhdHomeShot() {
  return (
    <Image
      src="/main/main-rzhd.webp"
      alt="РЖД — панель мониторинга"
      fill
      unoptimized
      sizes="(max-width: 1440px) 40vw, 552px"
      className="object-cover object-left-top"
    />
  );
}

function CaseRzhd({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href="/cases/rzhd"
      title={title}
      subtitle={subtitle}
      description={description}
      textMaxWidth="max-w-[544px]"
    >
      <ScreenshotFrame
        shotVariants={shotFullBleedFloat}
        className="bottom-0 left-[28px] right-[-32px] top-[225px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)] md:hidden"
      >
        <RzhdErrorsShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiMain}
        className="bottom-0 left-[28px] right-[28px] top-[207px] hidden shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)] md:block"
      >
        <RzhdErrorsShot />
      </ScreenshotFrame>
      <ScreenshotFrame
        shotVariants={shotRuqiForm}
        className="bottom-0 left-[620px] right-[28px] top-[107px] hidden shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)] md:block"
      >
        <RzhdHomeShot />
      </ScreenshotFrame>
    </CaseCardShell>
  );
}

function AstrakhCaseShot() {
  return (
    <Image
      src="/main/main-astrakh.webp"
      alt="АСтрахование — услуги"
      fill
      unoptimized
      sizes="(max-width: 767px) 100vw, (max-width: 1440px) 44vw, 534px"
      className="object-cover object-left-top"
    />
  );
}

function CaseAstrakh({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <CaseCardShell
      href={getCaseCardHref("astrakh")}
      title={title}
      subtitle={subtitle}
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
  const [ruqi, fino, ifeelgood, rzhd, alva, astrakh] = CASES_CONTENT.items;
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="cases"
      className="w-full bg-[#f5f5f5] px-4 md:px-5 min-[1440px]:px-[120px]"
      aria-label="Наши кейсы"
    >
      <motion.div
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-[20px] md:grid-cols-2"
        variants={casesRevealContainer}
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={CASES_VIEWPORT}
      >
        <motion.div variants={casesRevealItem} custom={0} className="col-span-full">
          <SectionHeading>
            <h2 className="text-center text-[28px] font-light leading-[34px] tracking-[-0.5px] text-black md:text-[45px] md:leading-[50px] md:tracking-[-0.64px]">
              {CASES_CONTENT.heading}
            </h2>
          </SectionHeading>
        </motion.div>

        <motion.div id="case-ruqi" variants={casesRevealItem} custom={1} className="col-span-full">
          <CaseRuqi title={ruqi.title} subtitle={"subtitle" in ruqi ? ruqi.subtitle : undefined} description={ruqi.description} />
        </motion.div>

        <motion.div id="case-alva" variants={casesRevealItem} custom={-1}>
          <CaseAlva title={alva.title} subtitle={"subtitle" in alva ? alva.subtitle : undefined} description={alva.description} />
        </motion.div>

        <motion.div id="case-astrakh" variants={casesRevealItem} custom={1}>
          <CaseAstrakh title={astrakh.title} subtitle={"subtitle" in astrakh ? astrakh.subtitle : undefined} description={astrakh.description} />
        </motion.div>

        <motion.div id="case-rzhd" variants={casesRevealItem} custom={-1} className="col-span-full">
          <CaseRzhd title={rzhd.title} subtitle={"subtitle" in rzhd ? rzhd.subtitle : undefined} description={rzhd.description} />
        </motion.div>

        <motion.div id="case-ifeelgood" variants={casesRevealItem} custom={1}>
          <CaseIfeelgood title={ifeelgood.title} subtitle={"subtitle" in ifeelgood ? ifeelgood.subtitle : undefined} description={ifeelgood.description} />
        </motion.div>

        <motion.div id="case-fino" variants={casesRevealItem} custom={-1}>
          <CaseFino title={fino.title} subtitle={"subtitle" in fino ? fino.subtitle : undefined} description={fino.description} />
        </motion.div>
      </motion.div>
    </section>
  );
}
