"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import type { CaseStudyChallengePair } from "@/types/case-study";
import { useLeadModal } from "@/context/LeadModalContext";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

type CaseStudyChallengesProps = {
  pairs: CaseStudyChallengePair[];
};

type ChallengeCardItem = {
  kind: "challenge" | "solution";
  text: string;
  pairIndex: number;
};

type ChallengeCardProps = {
  item: ChallengeCardItem;
  isActive: boolean;
  cardRef: (node: HTMLElement | null) => void;
};

function ChallengeBadge({
  label,
  accent,
  highlighted,
}: {
  label: string;
  accent?: boolean;
  highlighted?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 self-start items-center rounded-[4px] border pb-[1.19px] pl-[4px] pr-[4.67px] pt-[2px] text-[14px] font-light uppercase leading-[18.2px] tracking-[-0.07px] transition-colors duration-500 ${
        accent
          ? "border-[#f4bda9] bg-[#ffded2] text-[#e37952]"
          : highlighted
            ? "border-[#8a8a8a] bg-[#3a3a3a] text-[#d4d4d4]"
            : "border-[#464646] bg-[#303030] text-[#6c6c6c]"
      }`}
    >
      {label}
    </span>
  );
}

/**
 * Single challenge or solution card with spring-physics active state.
 */
function ChallengeCard({ item, isActive, cardRef }: ChallengeCardProps) {
  const isSolution = item.kind === "solution";

  return (
    <motion.article
      ref={cardRef as React.Ref<HTMLElement>}
      className={`flex flex-col gap-[10px] rounded-[20px] border px-[23px] py-[19px] ${
        isActive
          ? isSolution
            ? "border-[#565656] bg-[#303030]"
            : "border-[#565656] bg-[#2a2a2a]"
          : "border-[#3a3a3a] bg-transparent"
      }`}
      animate={{
        opacity: isActive ? 1 : 0.32,
        y: isActive ? 0 : 6,
        scale: isActive ? 1 : 0.985,
        filter: isActive ? "blur(0px)" : "blur(2.5px)",
        boxShadow: isActive && isSolution
          ? "0 0 0 1px rgba(227,121,82,0.15), 0 8px 32px rgba(227,121,82,0.08)"
          : isActive
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "none",
      }}
      transition={{
        opacity: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        y: { type: "spring", stiffness: 280, damping: 32 },
        scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        filter: { duration: 0.45, ease: "easeOut" },
        boxShadow: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <ChallengeBadge
        label={item.kind === "challenge" ? "вызов" : "решение"}
        accent={isActive && isSolution}
        highlighted={isActive && !isSolution}
      />
      <motion.p
        className="text-[16px] font-normal leading-[22.95px] tracking-[-0.17px]"
        animate={{ color: isActive ? "#ffffff" : "#5a5a5a" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {item.text}
      </motion.p>
    </motion.article>
  );
}

/**
 * Dark challenges and solutions section with scroll-linked card highlighting and parallax blob.
 */
export default function CaseStudyChallenges({ pairs }: CaseStudyChallengesProps) {
  const { openModal } = useLeadModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const cardCount = pairs.length * 2;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawBlobY = useTransform(scrollYProgress, [0, 1], ["40px", "-140px"]);
  const rawBlobRotate = useTransform(scrollYProgress, [0, 1], [174, 210]);
  const rawBlobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.06, 0.92]);

  const blobY = useSpring(rawBlobY, { stiffness: 60, damping: 20 });
  const blobRotate = useSpring(rawBlobRotate, { stiffness: 40, damping: 18 });
  const blobScale = useSpring(rawBlobScale, { stiffness: 50, damping: 22 });

  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.9, 0]);

  const updateActiveCard = useCallback(() => {
    if (cardRefs.current.length === 0) return;

    const container = scrollRef.current;
    let anchor = window.innerHeight * 0.42;

    if (container && container.scrollHeight > container.clientHeight + 1) {
      const rect = container.getBoundingClientRect();
      anchor = rect.top + rect.height * 0.38;
    }

    let nextActive = 0;
    let closest = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((node, index) => {
      if (!node) return;
      const { top, height } = node.getBoundingClientRect();
      const dist = Math.abs(top + height / 2 - anchor);
      if (dist < closest) {
        closest = dist;
        nextActive = index;
      }
    });

    setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
  }, []);

  useEffect(() => {
    if (cardCount === 0) return;

    cardRefs.current = cardRefs.current.slice(0, cardCount);
    updateActiveCard();

    const container = scrollRef.current;
    window.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard, { passive: true });
    container?.addEventListener("scroll", updateActiveCard, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
      container?.removeEventListener("scroll", updateActiveCard);
    };
  }, [cardCount, updateActiveCard]);

  const activeIsSolution = activeIndex % 2 === 1;

  if (pairs.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f5f4] px-4 py-10 md:px-5 md:py-14 min-[1440px]:px-[120px]"
    >
      <motion.div
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[20px] bg-[#242424]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        {/* Ambient glow orb */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[60px] top-[180px] hidden size-[520px] rounded-full lg:block"
          style={{
            opacity: glowOpacity,
            background: activeIsSolution
              ? "radial-gradient(circle, rgba(227,121,82,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(180,180,180,0.07) 0%, transparent 70%)",
            transition: "background 0.8s ease",
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[613px_1fr]">
          <div className="flex flex-col gap-6 px-6 py-10 md:px-[55px] md:py-10 lg:sticky lg:top-20 lg:self-start">
            <div>
              <h2 className="text-[32px] font-light leading-[40px] tracking-[-0.64px] text-white md:text-[45px] md:leading-[50px]">
                Вызовы
                <br />
                и решения
              </h2>
              <p className="mt-3 max-w-[262px] text-[16px] font-light leading-[24px] tracking-[-0.2px] text-[#cfcfcf] md:text-[19px] md:leading-[27px]">
                Рассказываем пошагово, как и чем мы помогли.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex h-[41px] w-fit cursor-pointer items-center rounded-[14px] border border-white/8 bg-white/4 px-[17px] text-[16px] font-medium tracking-[-0.17px] text-white transition-colors hover:bg-white/8"
            >
              Хочу также!
            </button>
          </div>

          <div
            ref={scrollRef}
            className="relative px-4 pb-8 pt-2 md:px-[21px] md:pb-10 md:pt-[35px]"
          >
            <div className="flex flex-col gap-5">
              {pairs.map((pair, pairIndex) => {
                const challengeIndex = pairIndex * 2;
                const solutionIndex = pairIndex * 2 + 1;

                return (
                  <div key={`pair-${pairIndex}`} className="flex flex-col gap-5">
                    <ChallengeCard
                      item={{ kind: "challenge", text: pair.challenge, pairIndex }}
                      isActive={activeIndex === challengeIndex}
                      cardRef={(node) => {
                        cardRefs.current[challengeIndex] = node;
                      }}
                    />
                    <ChallengeCard
                      item={{ kind: "solution", text: pair.solution, pairIndex }}
                      isActive={activeIndex === solutionIndex}
                      cardRef={(node) => {
                        cardRefs.current[solutionIndex] = node;
                      }}
                    />
                    {pairIndex < pairs.length - 1 && (
                      <div className="h-px bg-[#464646]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Parallax blob */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[187px] top-[233px] hidden size-[404px] lg:block"
          style={{ y: blobY, rotate: blobRotate, scale: blobScale }}
        >
          <div className="relative size-full">
            <Image src="/union2.svg" alt="" fill className="object-contain opacity-90" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
