"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROCESS_CONTENT } from "@/lib/constants";
import { fadeInUp, staggerContainer, VIEWPORT } from "@/lib/motion";

type AccordionIconProps = {
  open: boolean;
};

function AccordionIcon({ open }: AccordionIconProps) {
  return (
    <span className="relative block h-6 w-[23px] shrink-0" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded bg-[#e37952]" />
      {!open && (
        <span className="absolute left-1/2 top-1/2 h-[2px] w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-90 rounded bg-[#e37952]" />
      )}
    </span>
  );
}

type StageBadgeProps = {
  stageNumber: number;
};

function StageBadge({ stageNumber }: StageBadgeProps) {
  return (
    <div
      className="inline-flex shrink-0 items-center rounded-[4px] border border-solid border-[#f4bda9] bg-[#ffded2] pb-[1.19px] pl-[4px] pr-[4.67px] pt-[2px] text-[#e37952]"
      aria-hidden="true"
    >
      <span className="whitespace-nowrap text-[14px] font-light uppercase leading-[18.2px] tracking-[-0.07px]">
        {stageNumber} этап
      </span>
    </div>
  );
}

/**
 * Process section — accordion showing the stages of engagement.
 */
export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="w-full overflow-hidden bg-[#f5f5f5] px-4 py-[60px] md:px-[36px] md:py-[90px]"
      aria-label="Как мы работаем"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[40px]">
        <motion.h2
          className="text-center text-[28px] font-light leading-[34px] tracking-[-0.5px] text-black md:text-[45px] md:leading-[50px] md:tracking-[-0.64px]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {PROCESS_CONTENT.heading}
        </motion.h2>

        <motion.div
          className="flex flex-col gap-[15px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          {PROCESS_CONTENT.items.map((item, i) => {
            const isOpen = openIndex === i;
            const stageNumber = i + 1;
            return (
              <motion.div
                key={item.title}
                className="overflow-hidden rounded-[20px] border border-[rgba(31,34,41,0.08)] bg-white shadow-[0px_0px_1px_0px_rgba(31,34,41,0.24),0px_2px_6px_0px_rgba(31,34,41,0.04)]"
                variants={fadeInUp}
              >
                <button
                  type="button"
                  className="grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-3 gap-y-[9px] px-[27px] pb-5 pt-6 text-left md:grid-cols-[auto_1fr_auto] md:grid-rows-1 md:items-center md:gap-x-5 md:gap-y-0 md:px-8 md:pb-6 md:pt-8 md:pr-[30px]"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`process-panel-${i}`}
                  id={`process-heading-${i}`}
                >
                  <div className="col-start-1 row-start-1 self-start md:self-center">
                    <StageBadge stageNumber={stageNumber} />
                  </div>
                  <div className="col-start-2 row-start-1 justify-self-end self-start md:col-start-3 md:row-start-1 md:self-center md:justify-self-end">
                    <AccordionIcon open={isOpen} />
                  </div>
                  <span className="col-span-2 col-start-1 row-start-2 min-w-0 text-[15px] font-medium leading-[22px] tracking-[-0.16px] text-[#1a1d23] md:col-span-1 md:col-start-2 md:row-start-1 md:text-[19px] md:leading-[27px] md:tracking-[-0.2px]">
                    {item.title}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && item.sections.length > 0 && (
                    <motion.div
                      id={`process-panel-${i}`}
                      role="region"
                      aria-labelledby={`process-heading-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="flex flex-col gap-4 px-[27px] pb-6 pt-0 md:px-8 md:pb-8 md:pt-0">
                        {item.sections.map((section, j) => (
                          <div key={`${section.heading}-${j}`}>
                            <p className="text-[13px] font-medium leading-[18.4px] tracking-[-0.14px] text-[#8a8a8a] md:text-[16px] md:leading-[23px] md:tracking-[-0.17px]">
                              {section.heading}
                            </p>
                            <p className="mt-1 whitespace-pre-line text-[13px] font-light leading-[18.4px] tracking-[-0.14px] text-[#afafaf] md:mt-1.5 md:text-[16px] md:leading-[23px] md:tracking-[-0.17px]">
                              {section.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
