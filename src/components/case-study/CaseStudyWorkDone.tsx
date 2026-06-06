"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudyContent } from "@/types/case-study";
import { fadeInUp, VIEWPORT } from "@/lib/motion";
import CaseBadge from "@/components/case-study/ui/CaseBadge";
import SectionHeading from "@/components/ui/SectionHeading";

type CaseStudyWorkDoneProps = {
  workDone: CaseStudyContent["workDone"];
};

function WorkDoneNote({
  note,
}: {
  note: NonNullable<CaseStudyContent["workDone"]["notes"][number]>;
}) {
  return (
    <article
      className={`flex min-h-[123px] flex-col gap-4 rounded-[20px] px-[17px] py-[17px] ${
        note.variant === "glass"
          ? "border border-white/40 bg-[linear-gradient(174.89deg,rgba(255,255,255,0.12)_18%,rgba(36,36,36,0.04)_100%)] backdrop-blur-[28px] backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_32px_rgba(0,0,0,0.15)]"
          : "border border-[#e6e6e5] border-b-2 bg-white"
      }`}
    >
      <CaseBadge label="примечание" />
      <p className="text-[16px] font-medium leading-[24px] tracking-[-0.2px] text-black md:text-[19px] md:leading-[27px]">
        {note.text}
      </p>
    </article>
  );
}

function WorkDoneHighlight({
  highlight,
  align = "left",
}: {
  highlight: NonNullable<CaseStudyContent["workDone"]["highlights"]>[number];
  align?: "left" | "right";
}) {
  return (
    <p
      className={`text-[24px] font-light leading-[32px] text-[#3e3e3e] md:text-[33px] md:leading-[43.2px] ${
        align === "right"
          ? "md:max-w-[312px] md:text-right"
          : "md:max-w-[405px]"
      }`}
    >
      <span className="text-[#e37952]">{highlight.accent}</span>
      {highlight.rest}
    </p>
  );
}

function WorkDoneImage({
  src,
  alt,
  aspectClass,
  sizes,
  roundedClass = "rounded-[16px]",
  shadowClass = "shadow-[-4px_8px_6px_rgba(0,0,0,0.22)]",
  className = "",
}: {
  src: string;
  alt: string;
  aspectClass: string;
  sizes: string;
  roundedClass?: string;
  shadowClass?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-[#e6e6e5] bg-white ${roundedClass} ${shadowClass} ${className}`}
    >
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-left-top"
        />
      </div>
    </div>
  );
}

/**
 * Gallery of delivered screens with optional note cards and accent headings.
 */
export default function CaseStudyWorkDone({ workDone }: CaseStudyWorkDoneProps) {
  const { notes, images, highlights } = workDone;

  if (images.length === 0 && notes.length === 0) return null;

  const wideImage = images.find((image) => image.variant === "wide");
  const featureImage = images.find((image) => image.variant === "feature");
  const compactImage = images.find((image) => image.variant === "compact");
  const rightHighlight =
    highlights?.find((highlight) => highlight.align === "right") ?? highlights?.[1];
  const leftHighlight =
    highlights?.find((highlight) => highlight.align === "left") ?? highlights?.[0];

  return (
    <section className="bg-[#f5f5f4] px-4 md:px-5 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto max-w-[1200px]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <SectionHeading>
          <h2 className="text-center text-[32px] font-light leading-[40px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]">
            Проделанная работа
          </h2>
        </SectionHeading>

        <div className="flex flex-col gap-6 pb-10 md:gap-10 md:pb-14">
          <div className="relative flex flex-col gap-4">
            {wideImage && (
              <WorkDoneImage
                src={wideImage.src}
                alt={wideImage.alt}
                aspectClass="aspect-[783/498]"
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            )}

            {notes[0] && (
              <div className="md:absolute md:right-6 md:top-6 md:z-10 md:w-[min(349px,45%)]">
                <WorkDoneNote note={notes[0]} />
              </div>
            )}

            {rightHighlight && (
              <div className="md:absolute md:bottom-6 md:right-6 md:max-w-[312px] md:text-right">
                <WorkDoneHighlight highlight={rightHighlight} align="right" />
              </div>
            )}
          </div>

          <div className="relative md:min-h-[711px]">
            <div className="flex flex-col gap-6 md:max-w-[783px]">
              {notes[1] && <WorkDoneNote note={notes[1]} />}

              {leftHighlight && <WorkDoneHighlight highlight={leftHighlight} align="left" />}

              {compactImage && (
                <WorkDoneImage
                  src={compactImage.src}
                  alt={compactImage.alt}
                  aspectClass="aspect-[783/254]"
                  sizes="(max-width: 767px) 100vw, 783px"
                />
              )}
            </div>

            {featureImage && (
              <div className="md:absolute md:right-0 md:top-[80px] md:w-[min(550px,calc(100%-200px))]">
                <WorkDoneImage
                  src={featureImage.src}
                  alt={featureImage.alt}
                  aspectClass="aspect-[550/631]"
                  sizes="(max-width: 767px) 100vw, 550px"
                  roundedClass="rounded-[20px]"
                  shadowClass="shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)]"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
