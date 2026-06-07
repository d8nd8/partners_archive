"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CaseStudyImage } from "@/types/case-study";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

type CaseStudyHeroGalleryProps = {
  image: CaseStudyImage;
};

type MockupLayeredImage = CaseStudyImage & {
  mockupDir: string;
};

/**
 * Tall screen slot for portrait-oriented UI screenshots (e.g. RUQI, Альва).
 */
const MACBOOK_SCREEN_AREA = {
  left: "27.23%",
  top: "18.84%",
  width: "45.61%",
  height: "78.61%",
} as const;

/**
 * Physical MacBook screen mask bounds for landscape desktop UI (1440×900).
 */
export const MACBOOK_SCREEN_AREA_LANDSCAPE = {
  left: "27.23%",
  top: "18.88%",
  width: "45.54%",
  height: "44.28%",
} as const;

const MACBOOK_FRAME_SCALE = 1.36;

/**
 * Shared MacBook frame layers (macbook-pro / body / shadow / screen-mask).
 * Byte-identical across all MacBook cases, so they live in one directory to be
 * cached once and preloaded from the homepage. See {@link MACBOOK_FRAME_ASSETS}.
 */
export const MACBOOK_FRAME_DIR = "/cases/_macbook";

/** Frame layer URLs, exported so the homepage can warm them ahead of navigation. */
export const MACBOOK_FRAME_ASSETS = [
  `${MACBOOK_FRAME_DIR}/macbook-pro.png`,
  `${MACBOOK_FRAME_DIR}/body.png`,
  `${MACBOOK_FRAME_DIR}/shadow.png`,
  `${MACBOOK_FRAME_DIR}/screen-mask.png`,
] as const;

/** MacBook screen width as a viewport share: frame scale × screen area width. */
export const MACBOOK_SCREEN_VIEWPORT_WIDTH =
  `${MACBOOK_FRAME_SCALE * parseFloat(MACBOOK_SCREEN_AREA.width)}vw` as const;

/**
 * Screen clip area within the Phone frame (448 × 916 logical px).
 */
const IPHONE_SCREEN_MASK_AREA = {
  left: "4.24%",
  top: "2.29%",
  width: "89.73%",
  height: "95.41%",
} as const;

/**
 * Mask group position within the Phone frame — aligns exported screen-content.png.
 */
const IPHONE_SCREEN_CONTENT_AREA = {
  left: "4.69%",
  top: "1.53%",
  width: "90.58%",
  height: "95.41%",
} as const;

const IPHONE_FRAME_WIDTH_VW = 30.5;

/** iPhone screen width as a viewport share: frame width × screen area width. */
export const IPHONE_SCREEN_VIEWPORT_WIDTH =
  `${(IPHONE_FRAME_WIDTH_VW * parseFloat(IPHONE_SCREEN_MASK_AREA.width)) / 100}vw` as const;

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * iPhone hero with layered mockup assets and scroll-linked parallax.
 */
function IphoneLayeredHeroGallery({ image }: { image: MockupLayeredImage }) {
  const sectionRef = useRef<HTMLElement>(null);
  const screenObjectPosition = image.objectPosition ?? "top";
  const screenObjectFit = image.objectFit ?? "cover";
  const slideFromRight = image.slideFromRight ?? false;
  const [scrollTarget, setScrollTarget] = useState<
    RefObject<HTMLElement | null> | undefined
  >(undefined);

  useEffect(() => {
    if (!slideFromRight) setScrollTarget(sectionRef);
  }, [slideFromRight]);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-b border-[#e6e6e5] bg-[#f5f5f4] h-[90vw] max-h-[690px] min-h-[300px] md:h-[48vw]"
    >
      <motion.div className="flex h-full w-full justify-center">
        <motion.div
          className="relative w-[55vw] max-w-[439px] mt-7 md:w-[30.5vw]"
          initial={{ opacity: 0, ...(slideFromRight ? { x: "60vw" } : { y: 48 }) }}
          animate={slideFromRight ? { opacity: 1, x: 0 } : undefined}
          whileInView={slideFromRight ? undefined : { opacity: 1, y: 0 }}
          viewport={slideFromRight ? undefined : VIEWPORT}
          transition={{ duration: 1.8, ease: EASE_EXPO }}
          style={slideFromRight ? undefined : { y: parallaxY }}
        >
          <img
            aria-hidden
            src={`${image.mockupDir}/shadow.png`}
            className="pointer-events-none absolute inset-0 h-full w-full object-fill opacity-70 mix-blend-multiply"
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            style={{
              WebkitMaskImage: `url(${image.mockupDir}/screen-mask.png)`,
              maskImage: `url(${image.mockupDir}/screen-mask.png)`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute h-full w-full"
              style={{
                ...IPHONE_SCREEN_CONTENT_AREA,
                objectFit: screenObjectFit,
                objectPosition: screenObjectPosition,
              }}
            />
          </motion.div>

          <Image
            src={`${image.mockupDir}/iphone-pro.png`}
            alt={image.alt}
            width={1344}
            height={2748}
            priority
            sizes="(max-width: 767px) 80vw, 439px"
            className="relative z-10 h-auto w-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

const macbookContainerVariants = {
  hidden: { opacity: 0, x: "50vw" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 2, ease: EASE_EXPO },
  },
} as const;

const macbookScreenVariants = {
  hidden: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: EASE_EXPO, delay: 1.1 },
  },
} as const;

/**
 * MacBook hero with layered mockup assets and scroll-linked parallax.
 */
function MacbookLayeredHeroGallery({ image }: { image: MockupLayeredImage }) {
  const sectionRef = useRef<HTMLElement>(null);
  const screenArea = image.screenArea ?? MACBOOK_SCREEN_AREA;
  const screenObjectPosition = image.objectPosition ?? "top";
  const screenObjectFit = image.objectFit ?? "cover";
  const [scrollTarget, setScrollTarget] = useState<
    RefObject<HTMLElement | null> | undefined
  >(undefined);

  useEffect(() => {
    setScrollTarget(sectionRef);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-b border-[#e6e6e5] bg-[#f5f5f4] pt-0"
    >
      <motion.div className="w-full">
        <motion.div
          className="relative -mt-[10%] mb-[-16%] w-[136%] -ml-[18%] md:-mt-[11%] min-[1440px]:-mt-[12%]"
          variants={macbookContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          style={{ y: parallaxY }}
        >
          <img
            aria-hidden
            src={`${MACBOOK_FRAME_DIR}/shadow.png`}
            className="pointer-events-none absolute inset-0 h-full w-full object-fill opacity-70 mix-blend-multiply"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#f5f5f4]"
            style={{
              WebkitMaskImage: `url(${MACBOOK_FRAME_DIR}/screen-mask.png)`,
              maskImage: `url(${MACBOOK_FRAME_DIR}/screen-mask.png)`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          {/* Plain <img> (not next/image) so the bytes match the homepage preload
              exactly and skip the on-demand optimizer round-trip on first open. */}
          <img
            aria-hidden
            src={`${MACBOOK_FRAME_DIR}/macbook-pro.png`}
            className="relative h-auto w-full"
          />

          <img
            aria-hidden
            src={`${MACBOOK_FRAME_DIR}/body.png`}
            className="pointer-events-none absolute inset-0 h-full w-full object-fill"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[#6a6a6a] mix-blend-multiply"
            style={{
              WebkitMaskImage: `url(${MACBOOK_FRAME_DIR}/body.png)`,
              maskImage: `url(${MACBOOK_FRAME_DIR}/body.png)`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            variants={macbookScreenVariants}
            style={{
              WebkitMaskImage: `url(${MACBOOK_FRAME_DIR}/screen-mask.png)`,
              maskImage: `url(${MACBOOK_FRAME_DIR}/screen-mask.png)`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="absolute"
              style={{
                ...screenArea,
                objectFit: screenObjectFit,
                objectPosition: screenObjectPosition,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/**
 * Full-width hero image below the case title block.
 * Supports macbook layered mockup, iphone layered mockup, and flat variants.
 */
export default function CaseStudyHeroGallery({ image }: CaseStudyHeroGalleryProps) {
  const isMacbook = image.variant === "macbook";
  const isMacbookLayered = isMacbook && !!image.mockupDir;
  const isIphoneLayered = image.variant === "iphone" && !!image.mockupDir;

  if (isMacbookLayered) {
    return <MacbookLayeredHeroGallery image={image as MockupLayeredImage} />;
  }

  if (isIphoneLayered) {
    return <IphoneLayeredHeroGallery image={image as MockupLayeredImage} />;
  }

  return (
    <section className="border-b border-[#e6e6e5] bg-[#f5f5f4] px-4 pb-10 pt-4 md:px-5 md:pb-14 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto w-full max-w-[1200px]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {isMacbook ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={1440}
            height={690}
            priority
            sizes="(max-width: 767px) 100vw, 1200px"
            className="h-auto w-full"
          />
        ) : (
          <div className="overflow-hidden rounded-[20px] border border-[#e6e6e5] shadow-[-5px_10px_15px_0px_rgba(0,0,0,0.12)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={1440}
              height={690}
              priority
              sizes="(max-width: 767px) 100vw, 1200px"
              className="h-auto w-full"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
