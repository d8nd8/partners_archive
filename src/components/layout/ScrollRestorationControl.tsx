"use client";

import { useEffect } from "react";

/**
 * Disables browser scroll restoration so back navigation can reset Lenis cleanly.
 */
export default function ScrollRestorationControl() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
