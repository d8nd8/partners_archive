"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";

/**
 * Keeps Lenis alive after client navigations.
 */
function LenisRouteSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });
    lenis.resize();
    lenis.start();

    const frameId = requestAnimationFrame(() => {
      lenis.resize();
      window.dispatchEvent(new Event("scroll"));
    });

    return () => cancelAnimationFrame(frameId);
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
