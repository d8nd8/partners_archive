"use client";

import { useCallback, useState, type FocusEvent, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { HEADER_CONTENT } from "@/lib/constants";

const CURVE = 22;

const DESKTOP_DROPDOWN_LINK_CLASS =
  "block rounded-xl px-3 py-2 text-[14px] font-light tracking-[-0.07px] text-[#CECECE] transition-colors duration-150 ease-out hover:bg-[#e37952]/10 hover:text-[#e37952] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

const MOBILE_NAV_LINK_CLASS =
  "block rounded-xl px-4 py-3 text-[15px] font-light tracking-[-0.07px] text-[#CECECE] transition-colors duration-150 ease-out hover:bg-[#e37952]/10 hover:text-[#e37952] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:bg-[#e37952]/10 active:text-[#e37952]";

const MOBILE_CASE_LINK_CLASS =
  "block rounded-xl px-4 py-2.5 text-[15px] font-light tracking-[-0.07px] text-[#CECECE] transition-colors duration-150 ease-out hover:bg-[#e37952]/10 hover:text-[#e37952] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:bg-[#e37952]/10 active:text-[#e37952]";

/** Returns true when focus/pointer moved to a descendant of container. */
function relatedIsInside(container: HTMLElement, related: EventTarget | null): boolean {
  return related instanceof Node && container.contains(related);
}

/**
 * Floating navigation pill with a concave-corner dropdown for cases.
 * On mobile shows logo + hamburger; nav links appear in a slide-down panel.
 */
export default function NavigationPill() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBlur = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (!relatedIsInside(e.currentTarget, e.relatedTarget)) {
      setOpen(false);
      setMobileMenuOpen(false);
    }
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!relatedIsInside(e.currentTarget, e.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-[max(27px,calc(env(safe-area-inset-top)+10px))] z-50 flex justify-center px-4 md:top-10 md:px-6"
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
    >
      <div className="relative w-full max-w-[363px] md:max-w-[700px]">
      <div className="relative flex w-full flex-col items-stretch md:items-center">
        {/* PILL — mobile: Figma 2139:6413; desktop: unchanged */}
        <div className="relative z-20 w-full overflow-clip rounded-[11.533px] border-[0.721px] border-solid border-[#505050] bg-[#242424] p-[3.604px] shadow-[0px_14.416px_18.02px_-3.604px_rgba(0,0,0,0.1),0px_5.766px_7.208px_-4.325px_rgba(0,0,0,0.1)] md:flex md:h-[46px] md:items-center md:gap-4 md:overflow-visible md:rounded-2xl md:border-0 md:bg-[#1a1a1a] md:p-0 md:px-[15px] md:shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
          <div className="relative h-[36px] w-full shrink-0 md:contents md:h-auto">
          <a
            href="#"
            className="absolute left-[10.81px] top-1/2 z-10 inline-flex -translate-y-1/2 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:static md:z-auto md:translate-y-0 md:px-1"
          >
            <Image
              src="/logo.svg"
              alt={`${HEADER_CONTENT.logo.left}${HEADER_CONTENT.logo.star}${HEADER_CONTENT.logo.right}`}
              width={92}
              height={24}
              priority
              className="h-[26px] w-auto md:h-7"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-5 text-[14px] font-light tracking-[-0.07px] text-[#CECECE]">
            <a
              href="#about-us"
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
              href="#contacts"
              className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {HEADER_CONTENT.nav.contacts}
            </a>
          </div>

          {/* Desktop CTA */}
          <a
            href={HEADER_CONTENT.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-xl bg-white px-3 text-[13px] font-medium tracking-[-0.07px] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {HEADER_CONTENT.cta}
          </a>

          {/* Mobile menu trigger — Figma bars #CECECE */}
          <button
            type="button"
            className="absolute right-[10.81px] top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#cecece] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Меню"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  aria-hidden="true"
                  className="text-white"
                >
                  <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  initial={false}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  width="26"
                  height="18"
                  viewBox="0 0 26 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="shrink-0 text-[#cecece]"
                >
                  <rect width="26" height="2.47619" rx="1.2381" fill="currentColor" />
                  <rect y="7.42857" width="26" height="2.47619" rx="1.2381" fill="currentColor" />
                  <rect y="14.8571" width="26" height="2.47619" rx="1.2381" fill="currentColor" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
          </div>
        </div>

        {/* Desktop dropdown */}
        <AnimatePresence>
          {open && HEADER_CONTENT.casesDropdown.length > 0 && (
            <motion.div
              key="dropdown"
              initial={{ opacity: 0, scaleY: 0.72, y: -6 }}
              animate={{ opacity: 1, scaleY: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scaleY: 0.82, y: -3, transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] } }}
              className="hidden md:block absolute top-full left-1/2 z-20 -mt-px w-56 -translate-x-1/2 rounded-b-2xl bg-[#1a1a1a]"
              style={{ transformOrigin: "top center" }}
            >
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
              <div className="overflow-hidden rounded-b-2xl bg-[#1a1a1a] shadow-[0_18px_28px_-12px_rgba(0,0,0,0.35)]">
                <ul role="menu" className="p-2">
                  {HEADER_CONTENT.casesDropdown.map((item, i) => (
                    <li
                      key={`${item.href}-${item.label}`}
                      role="none"
                      style={{ animation: `nav-item-in 0.22s ease-out ${0.06 + i * 0.045}s both` }}
                    >
                      <a
                        role="menuitem"
                        href={item.href}
                        tabIndex={open ? 0 : -1}
                        className={DESKTOP_DROPDOWN_LINK_CLASS}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
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

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scaleY: 0.88, y: -6 }}
              animate={{ opacity: 1, scaleY: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ opacity: 0, scaleY: 0.92, y: -4, transition: { duration: 0.16, ease: [0.55, 0, 1, 0.45] } }}
              className="md:hidden absolute top-full left-0 right-0 z-10 mt-2 overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_18px_28px_-12px_rgba(0,0,0,0.45)]"
              style={{ transformOrigin: "top center" }}
            >
              <div className="flex flex-col gap-1 p-3">
                <a
                  href="#about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={MOBILE_NAV_LINK_CLASS}
                  style={{ animation: "nav-item-in 0.22s ease-out 0.06s both" }}
                >
                  {HEADER_CONTENT.nav.about}
                </a>

                <a
                  href="#contacts"
                  onClick={() => setMobileMenuOpen(false)}
                  className={MOBILE_NAV_LINK_CLASS}
                  style={{ animation: "nav-item-in 0.22s ease-out 0.105s both" }}
                >
                  {HEADER_CONTENT.nav.contacts}
                </a>

                <div className="mx-4 my-1 h-px bg-white/8" />

                <p
                  className="px-4 pb-1 pt-2 text-[12px] font-light uppercase tracking-[0.06em] text-[#646464]"
                  style={{ animation: "nav-item-in 0.22s ease-out 0.15s both" }}
                >
                  {HEADER_CONTENT.nav.cases}
                </p>
                {HEADER_CONTENT.casesDropdown.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={MOBILE_CASE_LINK_CLASS}
                    style={{
                      animation: `nav-item-in 0.22s ease-out ${0.195 + i * 0.045}s both`,
                    }}
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href={HEADER_CONTENT.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 rounded-xl bg-white px-4 py-3 text-center text-[15px] font-medium text-black transition-opacity active:opacity-80"
                >
                  {HEADER_CONTENT.cta}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
