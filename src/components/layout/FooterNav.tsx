"use client";

import { useCallback, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { FOOTER_CONTENT } from "@/lib/constants";
import { setPendingScroll } from "@/lib/pendingScroll";

/**
 * Footer section links ("О нас", "Кейсы"). The target sections live only on the
 * home page, but the footer also renders on other routes (e.g. /privacy). So:
 * on the home page we smoothly scroll in-page; elsewhere we navigate home and
 * hand the scroll target off to LenisRouteSync (see pendingScroll).
 */
export default function FooterNav() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();

      if (pathname === "/") {
        lenis?.scrollTo(href, { duration: 1.2 });
      } else {
        setPendingScroll(href);
        router.push(`/${href}`, { scroll: false });
      }
    },
    [pathname, router, lenis],
  );

  return (
    <nav aria-label="Footer navigation" className="shrink-0 md:pt-[1px]">
      <ul className="flex flex-col gap-5 md:gap-[8px]">
        {FOOTER_CONTENT.nav.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#303030]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
