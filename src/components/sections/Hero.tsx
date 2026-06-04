"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HERO_CONTENT } from "@/lib/constants";
import {
  fadeInHeroPhraseChild,
  heroCardReveal,
  heroPhraseStagger,
} from "@/lib/motion";
import { useLeadModal } from "@/context/LeadModalContext";

const HERO_CARD_STAGGER_S = 0.16;

const heroCardsStackRoot: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: HERO_CARD_STAGGER_S,
    },
  },
};

/**
 * Hero section for the landing page.
 * Cards begin their stagger when the CTA entrance animation starts.
 * Decorative splats fade in only after the card stack entrance finishes (mobile and desktop).
 */
export default function Hero() {
  const { openModal } = useLeadModal();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, (s) => s * 0.2);
  const leftBottomBlobY = useTransform(scrollY, (s) => s * 0.08);
  const glassBlobRef = useRef<HTMLDivElement | null>(null);
  const cardsRevealGateRef = useRef(false);
  const stackDoneGateRef = useRef(false);
  const [heroPhraseDone, setHeroPhraseDone] = useState(false);
  const [heroStackRevealDone, setHeroStackRevealDone] = useState(false);

  useEffect(() => {
    const el = glassBlobRef.current;
    if (!el) return;

    const BASE_TOP_PX = 92;
    const CARD_HEIGHT_PX = 1080;
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
      className="relative flex w-full items-start justify-center bg-[var(--bg-light)] pb-8 pt-[calc(27px+44px+34px)] md:min-h-[1080px] md:pb-0 md:pt-8"
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/grid.svg')] bg-[length:100%_auto] bg-left-top bg-no-repeat opacity-[0.35] md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full overflow-x-clip md:hidden"
        aria-hidden="true"
      >
        <div className="h-full min-h-full w-full bg-[url('/grid.svg')] bg-no-repeat bg-[length:520%_auto] bg-[position:calc(720px-2520*100vw/1440)_top] opacity-[0.78]" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 md:px-0">
        <div className="relative mx-auto flex min-h-[598px] w-full max-w-[363px] flex-col overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#ffffff_0%,#fff4f0_42%,#f5f4f2_100%)] pb-0 pt-0 shadow-[0_10px_50px_-18px_rgba(0,0,0,0.14)] md:mx-0 md:block md:h-[1080px] md:min-h-0 md:max-w-none md:overflow-hidden md:rounded-none md:rounded-t-[24px] md:pb-0 md:pt-[96px] md:shadow-none">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_48%_at_50%_90%,rgba(227,121,82,0.72)_0%,rgba(227,121,82,0.36)_50%,rgba(227,121,82,0)_100%)] md:bg-[radial-gradient(ellipse_100%_75%_at_50%_85%,rgba(227,121,82,0.72)_0%,rgba(227,121,82,0.36)_50%,rgba(227,121,82,0)_100%)]" />

          <div className="relative z-10 flex w-full min-h-[464px] flex-1 flex-col items-center justify-between gap-0 pt-[62px] pb-0 md:min-h-0 md:flex-none md:gap-0 md:px-0 md:pb-0 md:pt-0 md:block">
          <motion.div
            className="pointer-events-none absolute right-0 top-[100px] md:hidden"
            style={{ y: blobY }}
            initial={{ opacity: 0 }}
            animate={
              heroStackRevealDone ? { opacity: 0.75 } : { opacity: 0 }
            }
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            aria-hidden="true"
          >
            <Image src="/union1.svg" alt="" width={120} height={112} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-0 top-[300px] md:hidden"
            style={{ y: leftBottomBlobY }}
            initial={{ opacity: 0 }}
            animate={
              heroStackRevealDone ? { opacity: 0.85 } : { opacity: 0 }
            }
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            aria-hidden="true"
          >
            <Image
              src="/union3.svg"
              alt=""
              width={112}
              height={104}
              className="[filter:brightness(0.88)]"
            />
          </motion.div>
          <div className="w-full px-[21.48px] md:contents">
          <motion.div
            className="relative mx-auto flex w-full max-w-[320px] flex-col items-center gap-5 px-0 text-center md:max-w-[945px] md:px-[72.5px]"
            variants={heroPhraseStagger}
            initial="hidden"
            animate="visible"
          >
            <h1 className="flex w-full max-w-[320px] flex-col items-center font-normal tracking-[-0.42px] text-black md:max-w-[800px] md:tracking-[-0.64px]">
              <motion.span
                className="text-[33px] leading-[39.576px] md:text-[59px] md:leading-[60.8px]"
                variants={fadeInHeroPhraseChild}
              >
                {HERO_CONTENT.title.top}
              </motion.span>
              <motion.span
                className="text-[33px] leading-[39.576px] md:text-[59px] md:leading-[60.8px]"
                variants={fadeInHeroPhraseChild}
              >
                <span className="text-[var(--color-text-primary2)]">
                  {HERO_CONTENT.title.accent}
                </span>
                <span>{HERO_CONTENT.title.bottom}</span>
              </motion.span>
            </h1>

            <motion.p
              className="max-w-[320px] text-[12.37px] font-light leading-[17.57px] tracking-[-0.13px] text-[#8f8f8f] md:max-w-[421px] md:text-[19px] md:leading-[27px] md:tracking-[-0.2px]"
              variants={fadeInHeroPhraseChild}
            >
              {HERO_CONTENT.subtitle}
            </motion.p>

            <motion.button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-[6.4px] overflow-hidden rounded-[7.29px] bg-black px-[13.6px] pb-[7.15px] pt-[7.2px] text-[12.8px] font-medium leading-[18.36px] tracking-[-0.136px] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] md:gap-2 md:rounded-[9.113px] md:px-[17px] md:pb-[8.94px] md:pt-[9px] md:text-[16px] md:leading-[22.95px] md:tracking-[-0.17px]"
              variants={fadeInHeroPhraseChild}
              whileTap={{ scale: 0.97 }}
              onAnimationStart={() => {
                if (cardsRevealGateRef.current) return;
                cardsRevealGateRef.current = true;
                setHeroPhraseDone(true);
              }}
            >
              <span>{HERO_CONTENT.cta}</span>
              <span
                aria-hidden
                className="inline-flex h-[13.6px] w-[12.8px] shrink-0 items-center justify-center text-[12.8px] font-normal leading-none md:h-[17px] md:w-4 md:text-[16px]"
              >
                →
              </span>
            </motion.button>
          </motion.div>
          </div>

          <div className="relative z-[3] w-full shrink-0 translate-y-6 px-3 pb-0 md:hidden">
            <motion.div
              className="pointer-events-none relative mx-auto h-[min(302px,max(232px,68vw))] w-full min-w-0 max-w-[339px]"
              variants={heroCardsStackRoot}
              initial="hidden"
              animate={heroPhraseDone ? "visible" : "hidden"}
            >
            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute bottom-[145px] left-0 right-0 h-[132px] overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(4px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/contracts-1.png"
                alt=""
                fill
                priority
                sizes="340px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-cover object-top"
              />
              <div className="absolute inset-0 bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>
            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute bottom-[98px] left-0 right-0 h-[156px] overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(2.5px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/photo3.png"
                alt=""
                fill
                priority
                sizes="340px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-contain object-top"
              />
              <div className="absolute inset-0 bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>
            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute bottom-[56px] left-0 right-0 h-[177px] overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(1px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/photo2.png"
                alt=""
                fill
                priority
                sizes="340px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-contain object-top"
              />
              <div className="absolute inset-0 bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>
            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute bottom-0 left-0 right-0 isolate h-[206px] overflow-hidden rounded-t-[16px] border border-[#e5e5e5] border-b-0 bg-[#f5f4f2] shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [will-change:transform]"
              onAnimationComplete={() => {
                if (stackDoneGateRef.current) return;
                stackDoneGateRef.current = true;
                setHeroStackRevealDone(true);
              }}
            >
              <div className="absolute inset-x-[40px] bottom-6 top-0 flex items-end justify-center gap-2">
                <Image
                  src="/images/hero/phone1.png"
                  alt=""
                  width={180}
                  height={364}
                  priority
                  aria-hidden="true"
                  className="relative z-0 h-[166px] w-auto shrink-0 object-contain"
                />
                <Image
                  src="/images/hero/phone2.png"
                  alt=""
                  width={180}
                  height={364}
                  priority
                  aria-hidden="true"
                  className="relative z-0 h-[166px] w-auto shrink-0 object-contain"
                />
                <Image
                  src="/images/hero/phone3.png"
                  alt=""
                  width={180}
                  height={364}
                  priority
                  aria-hidden="true"
                  className="relative z-0 h-[166px] w-auto shrink-0 object-contain"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>
          </motion.div>
          </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
            variants={heroCardsStackRoot}
            initial="hidden"
            animate={heroPhraseDone ? "visible" : "hidden"}
          >
            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute left-[116px] top-[392.72px] h-[472.02px] w-[968px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(4.5px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/contracts-1.png"
                alt=""
                fill
                priority
                sizes="968px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-cover object-top"
              />
              <div className="absolute left-[-9.59px] top-[-26.12px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>

            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute left-[91px] top-[431.79px] h-[496.89px] w-[1019px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(3px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/photo3.png"
                alt=""
                fill
                priority
                sizes="1019px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-cover object-top"
              />
              <div className="absolute left-[-9.59px] top-[-26.19px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>

            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute left-[63px] top-[475.24px] h-[523.71px] w-[1074px] overflow-hidden rounded-[14px] border-[0.852px] border-[#e5e5e5] bg-white shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [filter:blur(1px)] [will-change:transform]"
            >
              <Image
                src="/images/hero/photo2.png"
                alt=""
                fill
                priority
                sizes="1074px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg=="
                aria-hidden="true"
                className="pointer-events-none object-cover object-top"
              />
              <div className="absolute left-[-8.74px] top-[-25.79px] h-[311px] w-[1112px] bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>

            <motion.div
              variants={heroCardReveal}
              className="pointer-events-none absolute bottom-0 left-8 top-[524.24px] w-[1136px] isolate overflow-hidden rounded-t-[18px] border-[0.852px] border-[#e5e5e5] border-b-0 bg-[#f5f4f2] shadow-[0px_-4px_15px_-3px_rgba(0,0,0,0.1)] [will-change:transform]"
              onAnimationComplete={() => {
                if (stackDoneGateRef.current) return;
                stackDoneGateRef.current = true;
                setHeroStackRevealDone(true);
              }}
            >
              <div className="absolute left-[88.26px] top-[61.21px] h-[585.67px] w-[960.32px]">
                <Image
                  src="/images/hero/phone1.png"
                  alt=""
                  width={313}
                  height={630}
                  priority
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-[-22.08px] [filter:blur(0.8px)]"
                />
                <Image
                  src="/images/hero/phone2.png"
                  alt=""
                  width={313}
                  height={630}
                  priority
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[323.64px] top-[-22.08px] [filter:blur(0.8px)]"
                />
                <Image
                  src="/images/hero/phone3.png"
                  alt=""
                  width={313}
                  height={630}
                  priority
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[647.28px] top-[-22.08px] [filter:blur(0.8px)]"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[var(--color-text-primary2)] mix-blend-color" />
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute left-[1038px] top-[446px] z-0 hidden select-none md:block"
            style={{ y: blobY }}
            initial={{ opacity: 0 }}
            animate={
              heroStackRevealDone ? { opacity: 0.75 } : { opacity: 0 }
            }
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            aria-hidden="true"
          >
            <Image src="/union1.svg" alt="" width={231} height={215} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute left-[-36px] top-[598px] z-20 hidden select-none -rotate-90 md:block"
            style={{ y: leftBottomBlobY }}
            initial={{ opacity: 0 }}
            animate={
              heroStackRevealDone ? { opacity: 0.85 } : { opacity: 0 }
            }
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            aria-hidden="true"
          >
            <Image src="/union3.svg" alt="" width={178} height={165} />
          </motion.div>
        </div>

        <motion.div
          ref={glassBlobRef}
          className="pointer-events-none absolute left-[calc(50%+100px)] z-[30] hidden h-[205px] w-[188px] select-none max-[1200px]:left-[700px] md:block"
          initial={{ opacity: 0 }}
          animate={heroStackRevealDone ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          aria-hidden="true"
        >
          <Image
            src="/union2.svg"
            alt=""
            width={188}
            height={205}
            className="h-full w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
