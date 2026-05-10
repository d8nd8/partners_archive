"use client";

import { useCallback, useState, type FocusEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { HEADER_CONTENT } from "@/lib/constants";

const CURVE = 22;

/** Returns true when focus/pointer moved to a descendant of container. */
function relatedIsInside(container: HTMLElement, related: EventTarget | null): boolean {
  return related instanceof Node && container.contains(related);
}

/**
 * Floating navigation pill with a concave-corner dropdown for cases.
 *
 * Corner rendering: CSS mask punches a quarter-circle hole at each top wing so
 * the dropdown reads as concave against the pill. The earlier circle-fill hack
 * drew the wrong quadrant (convex “ears”); masks match the intended silhouette.
 * Wings overlap the body by 1px and the panel uses one background color to hide
 * sub-pixel hairlines at the joint (motion + mask + translate rounding).
 * Junction concave radius (CURVE) matches the pill rounded-2xl corner for a smoother blend.
 *
 * Dropdown items render statically to avoid animation race conditions under
 * rapid pointer enter/leave interactions.
 */
export default function NavigationPill() {
  const [open, setOpen] = useState(false);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!relatedIsInside(e.currentTarget, e.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!relatedIsInside(e.currentTarget, e.relatedTarget)) {
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
              href="#footer-contacts"
              className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {HEADER_CONTENT.nav.contacts}
            </a>
          </div>

          <a
            href={HEADER_CONTENT.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
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
              initial={{ opacity: 0, scaleY: 0.72, y: -6 }}
              animate={{ opacity: 1, scaleY: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scaleY: 0.82, y: -3, transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] } }}
              className="absolute top-full left-1/2 z-20 -mt-px w-56 -translate-x-1/2 rounded-b-2xl bg-[#1a1a1a]"
              style={{ transformOrigin: "top center" }}
            >
              {/* Concave left: opaque wing minus BL quadrant (hole at pill junction). */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 block bg-[#1a1a1a]"
                style={{
                  width: CURVE,
                  height: CURVE,
                  right: "calc(100% - 1px)",
                  WebkitMaskImage: `radial-gradient(circle at 0 100%, transparent ${CURVE}px, #000 ${CURVE}px)`,
                  maskImage: `radial-gradient(circle at 0 100%, transparent ${CURVE}px, #000 ${CURVE}px)`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />

              {/* Concave right: opaque wing minus BR quadrant. */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 block bg-[#1a1a1a]"
                style={{
                  width: CURVE,
                  height: CURVE,
                  left: "calc(100% - 1px)",
                  WebkitMaskImage: `radial-gradient(circle at 100% 100%, transparent ${CURVE}px, #000 ${CURVE}px)`,
                  maskImage: `radial-gradient(circle at 100% 100%, transparent ${CURVE}px, #000 ${CURVE}px)`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />

              {/* Body */}
              <div className="overflow-hidden rounded-b-2xl bg-[#1a1a1a] shadow-[0_18px_28px_-12px_rgba(0,0,0,0.35)]">
                <ul role="menu" className="p-2">
                  {HEADER_CONTENT.casesDropdown.map((item, i) => (
                    <li
                      key={`${item.href}-${item.label}`}
                      role="none"
                      style={{
                        animation: `nav-item-in 0.22s ease-out ${0.06 + i * 0.045}s both`,
                      }}
                    >
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
