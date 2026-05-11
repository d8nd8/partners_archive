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

/**
 * Process section — accordion showing the stages of engagement.
 */
export default function Process() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="w-full overflow-hidden rounded-b-[36px] bg-[#f5f5f5] px-4 py-[60px] md:px-[36px] md:py-[90px]"
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
            return (
              <motion.div
                key={item.stage}
                className="overflow-hidden rounded-[20px] bg-white shadow-[0px_0px_1px_0px_rgba(31,34,41,0.24),0px_2px_6px_0px_rgba(31,34,41,0.04)]"
                variants={fadeInUp}
              >
                <button
                  className="flex h-[78px] w-full cursor-pointer items-center justify-between px-4 md:px-[32px]"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-[20px]">
                    <span className="rounded-[4px] border border-[#f4bda9] bg-[#ffded2] px-[4px] pb-[1.19px] pt-[2px] text-[14px] font-light uppercase leading-[18.2px] tracking-[-0.07px] text-[#e37952]">
                      {item.stage}
                    </span>
                    <span className="text-[19px] font-medium leading-[27px] tracking-[-0.2px] text-[#1a1d23]">
                      {item.title}
                    </span>
                  </div>
                  <AccordionIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && item.description && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-4 pb-[26px] md:px-[32px]">
                        <p className="whitespace-pre-line text-[16px] font-light leading-[22.95px] tracking-[-0.17px] text-[#afafaf]">
                          {item.description}
                        </p>
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
