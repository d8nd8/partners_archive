"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CaseStudyStep } from "@/types/case-study";
import { fadeInUp, VIEWPORT } from "@/lib/motion";

type CaseStudyStepsProps = {
  steps: CaseStudyStep[];
};

/**
 * Numbered vertical process steps with scroll-linked active state.
 * Timeline rail is rendered outside the blur container so lines stay crisp.
 */
export default function CaseStudySteps({ steps }: CaseStudyStepsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateActiveStep = useCallback(() => {
    if (stepRefs.current.length === 0) return;

    const anchor = window.innerHeight * 0.42;
    let nextActive = 0;
    let closest = Number.POSITIVE_INFINITY;

    stepRefs.current.forEach((node, index) => {
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
    if (steps.length === 0) return;
    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, [steps.length, updateActiveStep]);

  if (steps.length === 0) return null;

  return (
    <section className="bg-[#f5f5f4] px-4 pb-10 pt-14 md:px-5 md:pb-14 md:pt-20 min-[1440px]:px-[120px]">
      <motion.div
        className="mx-auto max-w-[1368px] lg:pl-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            const isLast = index === steps.length - 1;
            const lineFilled = index < activeIndex;

            return (
              <div
                key={`step-${index}`}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="flex flex-col items-center md:flex-row md:items-stretch"
              >
                {/* ── Timeline rail (desktop only) ── */}
                <div className="hidden shrink-0 flex-col items-center md:flex">
                  {/* Circle */}
                  <div
                    className={`relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 bg-[#f5f5f4] transition-all duration-500 ${
                      isActive
                        ? "border-black shadow-[0_0_0_5px_rgba(0,0,0,0.07)]"
                        : isPast
                          ? "border-black"
                          : "border-[#d8d8d8]"
                    }`}
                  >
                    <span
                      className={`text-[20px] font-medium leading-none transition-colors duration-500 ${
                        isActive || isPast ? "text-black" : "text-[#cacaca]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Connector — flex-1 fills space between circles */}
                  {!isLast && (
                    <div className="relative my-4 w-[3px] flex-1 overflow-hidden rounded-full bg-[#e0e0e0] md:my-5">
                      <motion.div
                        className="absolute inset-x-0 top-0 bg-black"
                        initial={{ height: "0%" }}
                        animate={{ height: lineFilled ? "100%" : "0%" }}
                        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Content (centered on mobile, row on desktop) ── */}
                <div
                  className={`flex w-full flex-col items-center gap-3 pt-3 text-center transition-[filter,opacity] duration-500 md:w-auto md:flex-1 md:flex-row md:items-start md:gap-[18px] md:pb-4 md:pl-8 md:pt-[5px] md:text-left ${
                    isLast ? "pb-0" : "pb-14 md:pb-24"
                  }`}
                  style={{
                    filter: isActive ? "blur(0px)" : "blur(3.5px)",
                    opacity: isActive ? 1 : 0.38,
                  }}
                >
                  {/* Mobile-only number circle on top */}
                  <div
                    className={`mb-1 flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border-2 bg-[#f5f5f4] transition-all duration-500 md:hidden ${
                      isActive
                        ? "border-black shadow-[0_0_0_5px_rgba(0,0,0,0.07)]"
                        : isPast
                          ? "border-black"
                          : "border-[#d8d8d8]"
                    }`}
                  >
                    <span
                      className={`text-[18px] font-medium leading-none transition-colors duration-500 ${
                        isActive || isPast ? "text-black" : "text-[#cacaca]"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>

                  <p
                    className={`w-full text-[26px] font-medium leading-[32px] transition-colors duration-500 md:w-[540px] md:text-[33px] md:leading-[43.2px] ${
                      isActive ? "text-black" : "text-[#555]"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p
                    className={`w-full text-[15px] font-medium leading-[22px] tracking-[-0.2px] transition-colors duration-500 md:w-[575px] md:text-[19px] md:leading-[27px] ${
                      isActive ? "text-black" : "text-[#666]"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
