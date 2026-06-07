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
          ? "md:whitespace-nowrap md:text-right"
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
  aspect,
  sizes,
  roundedClass = "rounded-[16px]",
  shadowClass = "shadow-[-4px_8px_6px_rgba(0,0,0,0.22)]",
  className = "",
}: {
  src: string;
  alt: string;
  aspectClass?: string;
  /** Exact CSS aspect ratio (e.g. "45/32"); shows the full image with no crop. */
  aspect?: string;
  sizes: string;
  roundedClass?: string;
  shadowClass?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-[#e6e6e5] bg-white ${roundedClass} ${shadowClass} ${className}`}
    >
      <div
        className={`relative w-full ${aspect ? "" : aspectClass ?? ""}`}
        style={aspect ? { aspectRatio: aspect } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          quality={100}
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
  const tallImage = images.find((image) => image.variant === "tall");
  const phoneImages = images.filter((image) => image.variant === "phone");
  const highlight = highlights?.[0];

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

        {phoneImages.length > 0 ? (
          <div className="grid gap-6 pb-10 md:grid-cols-2 md:items-start md:gap-8 md:pb-14">
            {/* Left: first note with the wide photo beneath it */}
            <div className="flex flex-col gap-4">
              {notes[0] && <WorkDoneNote note={notes[0]} />}

              {wideImage && (
                <WorkDoneImage
                  src={wideImage.src}
                  alt={wideImage.alt}
                  aspect={wideImage.aspect}
                  aspectClass="aspect-[3840/2668]"
                  sizes="(max-width: 767px) 100vw, 588px"
                  roundedClass="rounded-[20px]"
                  shadowClass="shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)]"
                />
              )}
            </div>

            {/* Right: second note with the three app screens beneath it */}
            <div className="flex flex-col gap-4">
              {notes[1] && <WorkDoneNote note={notes[1]} />}

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {phoneImages.slice(0, 3).map((image) => (
                  <WorkDoneImage
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    aspect={image.aspect}
                    aspectClass="aspect-[1125/2436]"
                    sizes="(max-width: 767px) 30vw, 185px"
                    roundedClass="rounded-[18px]"
                    shadowClass="shadow-[-4px_8px_12px_-3px_rgba(0,0,0,0.2)]"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
        <div className="flex flex-col gap-6 pb-10 md:gap-10 md:pb-14">
          {/* Hero result with its note overlaid */}
          <div className="relative flex flex-col gap-4">
            {wideImage && (
              <WorkDoneImage
                src={wideImage.src}
                alt={wideImage.alt}
                aspect={wideImage.aspect}
                aspectClass="aspect-[783/498]"
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 100vw, 1200px"
              />
            )}

            {notes[0] && (
              <div className="md:absolute md:right-6 md:top-6 md:z-10 md:w-[min(349px,45%)]">
                <WorkDoneNote note={notes[0]} />
              </div>
            )}
          </div>

          {/* Two paired columns. With a tall image: note + tall on the left,
              two stacked results on the right (keeps both columns balanced). */}
          <div className="grid gap-6 md:grid-cols-2 md:items-start md:gap-8">
            <div className="flex flex-col gap-4">
              {notes[1] && <WorkDoneNote note={notes[1]} />}

              {tallImage ? (
                <WorkDoneImage
                  src={tallImage.src}
                  alt={tallImage.alt}
                  aspect={tallImage.aspect}
                  aspectClass="aspect-[3/2]"
                  sizes="(max-width: 767px) 100vw, 588px"
                />
              ) : (
                compactImage && (
                  <WorkDoneImage
                    src={compactImage.src}
                    alt={compactImage.alt}
                    aspect={compactImage.aspect}
                    aspectClass="aspect-[3/2]"
                    sizes="(max-width: 767px) 100vw, 588px"
                  />
                )
              )}
            </div>

            <div className="flex flex-col gap-4">
              {tallImage && compactImage && (
                <WorkDoneImage
                  src={compactImage.src}
                  alt={compactImage.alt}
                  aspect={compactImage.aspect}
                  aspectClass="aspect-[3/2]"
                  sizes="(max-width: 767px) 100vw, 588px"
                />
              )}

              {featureImage && (
                <WorkDoneImage
                  src={featureImage.src}
                  alt={featureImage.alt}
                  aspect={featureImage.aspect}
                  aspectClass="aspect-[3/2]"
                  sizes="(max-width: 767px) 100vw, 588px"
                  roundedClass="rounded-[20px]"
                  shadowClass="shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.22)]"
                />
              )}

              {highlight && (
                <div className="md:mr-10 md:mt-12 md:text-right">
                  <WorkDoneHighlight highlight={highlight} align="right" />
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </motion.div>
    </section>
  );
}
