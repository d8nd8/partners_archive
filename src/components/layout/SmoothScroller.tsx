"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { takePendingScroll } from "@/lib/pendingScroll";

/**
 * Keeps Lenis alive after client navigations.
 */
function LenisRouteSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Prefer a target stashed by a nav click (reliable across the route change);
    // fall back to the URL hash for direct loads of /#section.
    const hash = takePendingScroll() ?? window.location.hash;
    lenis.start();

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (hash) {
      // The destination page may be heavy: the anchored section can mount a few
      // frames late and then shift down as images above it load. Poll (via
      // setTimeout, which fires even if the tab is briefly backgrounded) until
      // the element exists, scroll to it, then re-correct after layout settles.
      let attempts = 0;
      const tryScroll = () => {
        if (cancelled) return;
        const target = document.querySelector(hash);

        if (target) {
          lenis.resize();
          // Smoothly travel down to the anchored section.
          lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
          // Re-correct for late layout shifts (lazy images pushing the section).
          [400, 800].forEach((delay) => {
            const id = setTimeout(() => {
              if (cancelled) return;
              lenis.resize();
              lenis.scrollTo(target as HTMLElement, { duration: 0.6 });
            }, delay);
            timeouts.push(id);
          });
          return;
        }

        if (attempts++ < 180) {
          timeouts.push(setTimeout(tryScroll, 32));
        }
      };
      tryScroll();
    } else {
      const id = setTimeout(() => {
        if (cancelled) return;
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
        window.dispatchEvent(new Event("scroll"));
      }, 0);
      timeouts.push(id);
    }

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [pathname, lenis]);

  return null;
}

/**
 * Wraps children with Lenis smooth scrolling, synced to framer-motion's frame loop.
 */
export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
      }}
    >
      <LenisRouteSync />
      {children}
    </ReactLenis>
  );
}
