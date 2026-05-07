"use client";

import { useCallback, useState, type FocusEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { HEADER_CONTENT } from "@/lib/constants";

const CASES_MENU_WIDTH = "w-56";

/**
 * Floating navigation pill — header bar and cases menu as a centered column
 * under “Кейсы”, with page background visible left/right of the menu.
 */
export default function NavigationPill() {
  const [open, setOpen] = useState(false);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  return (
    <div
      className="fixed top-5 left-1/2 z-50 flex w-[min(700px,calc(100vw-24px))] -translate-x-1/2 flex-col items-center"
      onMouseLeave={() => setOpen(false)}
      onBlur={handleBlur}
    >
      <div
        className={`flex h-[46px] w-full shrink-0 items-center gap-4 border border-[#505050] bg-[#1a1a1a] px-[15px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] ${
          open ? "rounded-2xl border-b-0" : "rounded-2xl"
        }`}
      >
        <a
          href="#"
          className="inline-flex items-center px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <Image
            src="/logo.svg"
            alt={`${HEADER_CONTENT.logo.left}${HEADER_CONTENT.logo.star}${HEADER_CONTENT.logo.right}`}
            width={92}
            height={24}
            priority
            className="h-7 w-auto"
          />
        </a>

        <div className="flex flex-1 items-center justify-center gap-5 text-[14px] font-light tracking-[-0.07px] text-[#CECECE]">
          <a
            href="#how-we-help"
            className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {HEADER_CONTENT.nav.about}
          </a>

          <button
            type="button"
            onMouseEnter={() => setOpen(true)}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="inline-flex items-center gap-2 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span>{HEADER_CONTENT.nav.cases}</span>
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-[15px] text-[#CECECE] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path
                d="M4.25 6.25L7.5 9.75L10.75 6.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <a
            href="#"
            className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {HEADER_CONTENT.nav.contacts}
          </a>
        </div>

        <a
          href="#"
          className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-3 text-[13px] font-medium tracking-[-0.07px] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {HEADER_CONTENT.cta}
        </a>
      </div>

      {open && (
        <div className="flex h-px w-full shrink-0" aria-hidden>
          <div className="min-w-0 flex-1 bg-[#505050]" />
          <div className={`${CASES_MENU_WIDTH} max-w-full shrink-0 bg-[#1a1a1a]`} />
          <div className="min-w-0 flex-1 bg-[#505050]" />
        </div>
      )}

      <AnimatePresence>
        {open && HEADER_CONTENT.casesDropdown.length > 0 && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 36,
              mass: 0.85,
            }}
            className="relative z-[2] -mt-px flex w-full justify-center overflow-hidden"
          >
            <ul
              role="menu"
              className={`relative z-[2] ${CASES_MENU_WIDTH} max-w-full shrink-0 rounded-b-2xl border border-t-0 border-[#505050] bg-[#1a1a1a] p-2 shadow-[0_8px_24px_rgba(0,0,0,0.3)]`}
            >
              {HEADER_CONTENT.casesDropdown.map((item) => (
                <li role="none" key={`${item.href}-${item.label}`}>
                  <a
                    role="menuitem"
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    className="block rounded-xl px-3 py-2 text-[14px] font-light tracking-[-0.07px] text-[#CECECE] transition-colors duration-150 ease-out hover:bg-[#e37952]/10 hover:text-[#e37952] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
