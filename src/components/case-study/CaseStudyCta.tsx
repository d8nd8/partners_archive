"use client";

import { motion } from "framer-motion";
import { HEADER_CONTENT } from "@/lib/constants";
import { useLeadModal } from "@/context/LeadModalContext";
import { fadeInUp, VIEWPORT } from "@/lib/motion";
import CaseArrowIcon from "@/components/case-study/ui/CaseArrowIcon";

const CTA_BACKGROUND = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  `<svg viewBox="0 0 1200 264" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect width="100%" height="100%" fill="url(#grad)"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(92.95 0.05 -0.010999 20.449 600 132)"><stop stop-color="rgba(255,255,255,1)" offset="0.10352"/><stop stop-color="rgba(248,222,212,1)" offset="0.25002"/><stop stop-color="rgba(241,188,169,1)" offset="0.39653"/><stop stop-color="rgba(234,155,125,1)" offset="0.54303"/><stop stop-color="rgba(227,121,82,1)" offset="0.68954"/></radialGradient></defs></svg>`,
)}")`;

/**
 * Bottom CTA block encouraging contact or lead form submission.
 */
export default function CaseStudyCta() {
  const { openModal } = useLeadModal();

  return (
    <section className="bg-[#f5f5f4] px-4 pb-16 pt-4 md:px-5 md:pb-20 min-[1440px]:px-[120px]">
      <motion.div
        className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-[5px] overflow-hidden rounded-[20px] border border-[#e6e6e5] border-b-2 px-[17px] pb-[18px] pt-[24px] text-center"
        style={{
          backgroundImage: CTA_BACKGROUND,
          backgroundSize: "100% 100%",
        }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,200,170,0.4) 40%, transparent 70%)",
            transformOrigin: "center",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <h2 className="relative z-10 max-w-[556px] pb-[10px] text-[28px] font-medium leading-[36px] text-black md:text-[33px] md:leading-[43.2px]">
          Создадим проект мечты вместе
        </h2>
        <p className="relative z-10 max-w-[890px] pb-[10px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-black">
          Напишите нам в Telegram о подробностях вашего проекта, и мы проведём
          бесплатную консультацию по автоматизации вашего бизнеса
        </p>
        <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:gap-5">
          <a
            href={HEADER_CONTENT.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#242424] px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-90"
          >
            Связаться
            <CaseArrowIcon />
          </a>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#242424] bg-transparent px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-[#242424] shadow-[0_4px_6px_0px_rgba(0,0,0,0.1),0_2px_4px_0px_rgba(0,0,0,0.1)] transition-colors hover:bg-black/5"
          >
            Оставить заявку
            <CaseArrowIcon />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
