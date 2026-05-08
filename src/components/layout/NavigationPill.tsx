"use client";

import { useCallback, useState, type FocusEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { HEADER_CONTENT } from "@/lib/constants";

const CURVE = 14;

/**
 * Floating navigation pill with a concave-corner dropdown for cases.
 *
 * Structural notes:
 * - The pill stays fully rounded in both states (no border-b-0 hack).
 * - The 3-section fake-border divider is replaced by two mask-based curve spans
 *   positioned at the top corners of the dropdown, giving a concave joint.
 * - Dropdown is absolute (top-full) so it does not affect pill layout.
 * - Height animates via spring; list items stagger on x + opacity.
 */
export default function NavigationPill() {
  const [open, setOpen] = useState(false);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }, []);

  return (
    <div
      className="fixed top-5 left-1/2 z-50 w-[min(700px,calc(100vw-24px))] -translate-x-1/2"
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      <div className="relative flex flex-col items-center">
        {/* PILL — always fully rounded */}
        <div className="relative z-20 flex h-[46px] w-full items-center gap-4 rounded-2xl bg-[#1a1a1a] px-[15px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
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

        {/* DROPDOWN — absolute, does not shift pill */}
        <AnimatePresence>
          {open && HEADER_CONTENT.casesDropdown.length > 0 && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeIn" } }}
              className="absolute top-full left-1/2 z-10 w-56 -translate-x-1/2"
            >
              {/* Concave left corner: cuts a quarter-circle from bottom-left */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 right-full block"
                style={{
                  width: CURVE,
                  height: CURVE,
                  backgroundColor: "#1a1a1a",
                  WebkitMaskImage: `radial-gradient(circle at 0 100%, transparent ${CURVE}px, #000 ${CURVE + 0.5}px)`,
                  maskImage: `radial-gradient(circle at 0 100%, transparent ${CURVE}px, #000 ${CURVE + 0.5}px)`,
                }}
              />
              {/* Concave right corner: cuts a quarter-circle from bottom-right */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-full block"
                style={{
                  width: CURVE,
                  height: CURVE,
                  backgroundColor: "#1a1a1a",
                  WebkitMaskImage: `radial-gradient(circle at 100% 100%, transparent ${CURVE}px, #000 ${CURVE + 0.5}px)`,
                  maskImage: `radial-gradient(circle at 100% 100%, transparent ${CURVE}px, #000 ${CURVE + 0.5}px)`,
                }}
              />

              {/* Body: smooth height tween + stagger on items */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden rounded-b-2xl bg-[#1a1a1a] shadow-[0_18px_28px_-12px_rgba(0,0,0,0.35)]"
              >
                <motion.ul
                  role="menu"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
                    closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
                  }}
                  className="p-2"
                >
                  {HEADER_CONTENT.casesDropdown.map((item) => (
                    <motion.li
                      key={`${item.href}-${item.label}`}
                      role="none"
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -8 },
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <a
                        role="menuitem"
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className="block rounded-xl px-3 py-2 text-[14px] font-light tracking-[-0.07px] text-[#CECECE] transition-colors duration-150 ease-out hover:bg-[#e37952]/10 hover:text-[#e37952] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
