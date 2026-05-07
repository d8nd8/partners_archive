"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { HERO_CONTENT } from "@/lib/constants";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

/**
 * Hero section for the landing page.
 */
export default function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, (s) => s * 0.2);
  const leftBottomBlobY = useTransform(scrollY, (s) => s * 0.08);
  const glassBlobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = glassBlobRef.current;
    if (!el) return;

    const BASE_TOP_PX = 92;
    const CARD_HEIGHT_PX = 1072;
    const BLOB_HEIGHT_PX = 205;
    const PARALLAX = 0.2;
    const MAX_DRIFT_PX = 56;

    const applyTop = (docScrollY: number) => {
      const drift = Math.min(docScrollY * PARALLAX, MAX_DRIFT_PX);
      const maxTopInCard = CARD_HEIGHT_PX - BLOB_HEIGHT_PX;
      el.style.top = `${Math.min(BASE_TOP_PX + drift, maxTopInCard)}px`;
    };

    applyTop(window.scrollY);
    const unsubscribe = scrollY.on("change", applyTop);

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <section
      className="relative flex w-full items-start justify-center bg-[var(--bg-light)] pt-[40px] pb-0"
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[url('/grid.svg')] bg-[length:100%_auto] bg-left-top bg-no-repeat opacity-[0.35]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px]">
        <div className="relative h-[1072px] overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#ffffff_0%,#fff4f0_42%,#f5f4f2_100%)] pt-[96px]">
          <div className="pointer-events-none absolute left-1/2 top-[340px] h-[800px] w-[1400px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(227,121,82,0.52)_0%,rgba(227,121,82,0.22)_45%,rgba(227,121,82,0)_75%)] blur-[40px]" />

          <motion.div
            className="relative z-10 mx-auto flex max-w-[945px] flex-col items-center gap-5 px-[72.5px] text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h1 className="flex w-full max-w-[800px] flex-col items-center font-normal tracking-[-0.64px] text-black">
              <span className="text-[59px] leading-[60.8px]">
                {HERO_CONTENT.title.top}
              </span>
              <span className="text-[59px] leading-[60.8px]">
                <span className="text-[var(--color-text-primary2)]">
                  {HERO_CONTENT.title.accent}
                </span>
                <span>{HERO_CONTENT.title.bottom}</span>
              </span>
            </h1>

            <p className="max-w-[421px] text-[19px] font-light leading-[27px] tracking-[-0.2px] text-[var(--color-text-secondary)]">
              {HERO_CONTENT.subtitle}
            </p>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 overflow-hidden rounded-[14px] bg-[var(--color-primary-background-2)] px-[17px] pb-[8.94px] pt-[9px] text-[16px] font-medium leading-[22.95px] tracking-[-0.17px] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
              whileTap={{ scale: 0.97 }}
            >
              {HERO_CONTENT.cta}
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 4.25L10.25 8.5L6 12.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>

          <div className="absolute left-[116px] top-[384.72px] h-[472.02px] w-[968px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(3.5px)]">
            <Image
              src="/images/hero/contracts-1.png"
              alt=""
              fill
              aria-hidden="true"
              className="pointer-events-none object-cover object-top"
            />
            <div className="absolute left-[-9.59px] top-[-26.12px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
          </div>

          <div className="absolute left-[91px] top-[423.79px] h-[496.89px] w-[1019px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(2px)]">
            <Image
              src="/images/hero/photo3.png"
              alt=""
              fill
              aria-hidden="true"
              className="pointer-events-none object-cover object-top"
            />
            <div className="absolute left-[-9.59px] top-[-26.19px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
          </div>

          <div className="absolute left-[63px] top-[467.24px] h-[523.71px] w-[1074px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/hero/photo2.png"
              alt=""
              fill
              aria-hidden="true"
              className="pointer-events-none object-cover object-top"
            />
            <div className="absolute left-[-8.74px] top-[-25.79px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
          </div>

          <motion.div
            className="pointer-events-none absolute left-[1038px] top-[438px] select-none opacity-55"
            style={{ y: blobY }}
            aria-hidden="true"
          >
            <Image src="/union1.svg" alt="" width={231} height={215} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-[-36px] top-[590px] z-20 select-none -rotate-90 opacity-[0.68]"
            style={{ y: leftBottomBlobY }}
            aria-hidden="true"
          >
            <Image src="/union3.svg" alt="" width={178} height={165} />
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 top-[380px] w-8 bg-[linear-gradient(to_right,rgba(227,121,82,0.4),rgba(227,121,82,0))] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_100%)]" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-[380px] w-8 bg-[linear-gradient(to_left,rgba(227,121,82,0.4),rgba(227,121,82,0))] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_100%)]" aria-hidden="true" />

          <div className="absolute bottom-0 left-8 top-[516.24px] w-[1136px] isolate overflow-hidden rounded-t-[18px] border-[0.852px] border-[#e5e5e5] border-b-0 bg-[#f5f4f2] shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)]">
            <div className="absolute left-[88.26px] top-[61.21px] h-[585.67px] w-[960.32px]">
              <Image
                src="/images/hero/phone1.png"
                alt=""
                width={313}
                height={630}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[-22.08px]"
              />
              <Image
                src="/images/hero/phone2.png"
                alt=""
                width={313}
                height={630}
                aria-hidden="true"
                className="pointer-events-none absolute left-[323.64px] top-[-22.08px]"
              />
              <Image
                src="/images/hero/phone3.png"
                alt=""
                width={313}
                height={630}
                aria-hidden="true"
                className="pointer-events-none absolute left-[647.28px] top-[-22.08px]"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[var(--color-text-primary2)] mix-blend-color" />
          </div>
        </div>

        <div
          ref={glassBlobRef}
          className="pointer-events-none absolute left-[calc(50%+100px)] z-[30] h-[205px] w-[188px] select-none max-[1200px]:left-[700px]"
          aria-hidden="true"
        >
          <Image
            src="/union2.svg"
            alt=""
            width={188}
            height={205}
            className="h-full w-full opacity-50"
          />
        </div>
      </div>
    </section>
  );
}
