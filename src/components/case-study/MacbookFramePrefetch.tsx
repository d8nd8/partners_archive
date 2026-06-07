"use client";

import { useEffect } from "react";
import { MACBOOK_FRAME_ASSETS } from "@/components/case-study/CaseStudyHeroGallery";

/**
 * Warms the shared MacBook frame layers (~3.7 MB, identical across all cases)
 * into the browser cache while the visitor is still on the homepage, during
 * idle time so it never competes with the homepage's own assets.
 *
 * By the time a case page opens, the hero's plain <img> tags resolve straight
 * from cache, so the reveal animation plays smoothly with nothing left to load.
 * Renders nothing.
 */
export default function MacbookFramePrefetch() {
  useEffect(() => {
    const warm = () => {
      for (const src of MACBOOK_FRAME_ASSETS) {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      }
    };

    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(warm, { timeout: 3000 });
      return () => window.cancelIdleCallback?.(id);
    }

    const id = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
