"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface LeadModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal(): LeadModalContextValue {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}
