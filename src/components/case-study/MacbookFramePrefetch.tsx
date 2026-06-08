"use client";

import { useEffect } from "react";
import {
  MACBOOK_FRAME_ASSETS,
  preloadAndDecode,
} from "@/components/case-study/CaseStudyHeroGallery";

/**
 * Warms the shared MacBook frame layers (~3.7 MB, identical across all cases)
 * into the browser cache while the visitor is still on the homepage, during
 * idle time so it never competes with the homepage's own assets.
 *
 * Layers are fully decoded (not just fetched), so by the time a case page opens
 * the hero's plain <img> tags are render-ready and the reveal plays in one piece
 * with nothing left to load or decode. Renders nothing.
 */
export default function MacbookFramePrefetch() {
  useEffect(() => {
    const warm = () => {
      for (const src of MACBOOK_FRAME_ASSETS) {
        void preloadAndDecode(src);
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
