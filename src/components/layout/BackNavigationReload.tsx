"use client";

import { useEffect } from "react";

/**
 * Forces a full page reload on browser back/forward navigation so that
 * Framer Motion animations replay from initial state and Next.js Router Cache
 * cannot leave the page in a half-restored state.
 */
export default function BackNavigationReload() {
  useEffect(() => {
    function onPopState() {
      window.location.reload();
    }

    function onPageShow(event: PageTransitionEvent) {
      if (!event.persisted) return;
      window.location.reload();
    }

    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
