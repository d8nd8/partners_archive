"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CASES_CONTENT } from "@/lib/constants";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";

function CaseBadge() {
  return (
    <div className="inline-flex items-center rounded-[4px] border border-[#f4bda9] bg-[#ffded2] px-[4px] pb-[1.19px] pt-[2px]">
      <span className="text-[13px] font-light uppercase leading-[18.2px] tracking-[-0.07px] text-[#e37952]">
        {CASES_CONTENT.badge}
      </span>
    </div>
  );
}

function CaseArrow() {
  return (
    <div className="absolute right-[8px] top-[8px] flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white">
      <Image src="/cases/arrow.svg" alt="" width={30} height={29} aria-hidden />
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
  return (
    <div
      className={`relative h-[520px] overflow-hidden rounded-[20px] border border-b-2 border-[#e6e6e5] bg-[#fafaf9] ${className ?? ""}`}
    >
      <div className={`absolute left-[28px] top-[28px] flex flex-col gap-[8px] ${textMaxWidth}`}>
        <CaseBadge />
        <p className="text-[33px] font-medium leading-[43.2px] text-black">{title}</p>
        <p className="text-[16px] font-light leading-[22.95px] tracking-[-0.17px] text-[#afafaf]">
          {description}
        </p>
      </div>
      <CaseArrow />
      {children}
    </div>
  );
}

function ScreenshotFrame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[20px] border border-[#e6e6e5] bg-white ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function CaseRuqi({ title, description }: { title: string; description: string }) {
  return (
    <CaseCardShell title={title} description={description} textMaxWidth="max-w-[544px]">
      <ScreenshotFrame className="bottom-0 left-[28px] right-[204px] top-[207px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.22)]">
        <Image
          src="/cases/ruqi-main.png"
          alt="RUQI — список исполнителей"
          fill
          sizes="(max-width: 1440px) 70vw, 968px"
          className="object-cover object-left-top"
        />
      </ScreenshotFrame>
      <ScreenshotFrame className="bottom-0 left-[620px] right-[28px] top-[107px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)]">
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

function CaseFino({ title, description }: { title: string; description: string }) {
  return (
    <CaseCardShell title={title} description={description} textMaxWidth="max-w-[534px]">
      <ScreenshotFrame className="bottom-0 left-1/2 top-[225px] w-[531px] -translate-x-1/2 shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]">
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

function CaseIfeelgood({ title, description }: { title: string; description: string }) {
  return (
    <CaseCardShell title={title} description={description} textMaxWidth="max-w-[534px]">
      <ScreenshotFrame className="bottom-0 left-[28px] right-[28px] top-[206px] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)]">
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

function CaseAstrakh({ title, description }: { title: string; description: string }) {
  return (
    <CaseCardShell title={title} description={description} textMaxWidth="max-w-[544px]">
      <ScreenshotFrame className="bottom-0 left-1/2 top-[229px] w-[1141px] -translate-x-1/2 shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.08)]">
        <Image
          src="/cases/astrakh.png"
          alt="АСтрахование — главная"
          fill
          sizes="(max-width: 1440px) 90vw, 1141px"
          className="object-cover object-top"
        />
      </ScreenshotFrame>
      <ScreenshotFrame className="bottom-0 left-[calc(50%+78px)] top-[52px] w-[383px] shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.08)]">
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
          <motion.div variants={fadeInUp}>
            <CaseRuqi title={ruqi.title} description={ruqi.description} />
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-[20px]" variants={fadeInUp}>
            <CaseFino title={fino.title} description={fino.description} />
            <CaseIfeelgood title={ifeelgood.title} description={ifeelgood.description} />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CaseAstrakh title={astrakh.title} description={astrakh.description} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
