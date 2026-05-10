"use client";

import { LeadModalProvider } from "@/context/LeadModalContext";
import LeadModal from "@/components/ui/LeadModal";

/**
 * Client-side providers wrapper — mounts context and portal-level components.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      {children}
      <LeadModal />
    </LeadModalProvider>
  );
}
