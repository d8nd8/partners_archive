"use client";

import { LeadModalProvider } from "@/context/LeadModalContext";
import LeadModal from "@/components/ui/LeadModal";
import SmoothScroller from "@/components/layout/SmoothScroller";
import ScrollRestorationControl from "@/components/layout/ScrollRestorationControl";
import BackNavigationReload from "@/components/layout/BackNavigationReload";

/**
 * Client-side providers wrapper — mounts context and portal-level components.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      <ScrollRestorationControl />
      <BackNavigationReload />
      <SmoothScroller>{children}</SmoothScroller>
      <LeadModal />
    </LeadModalProvider>
  );
}
