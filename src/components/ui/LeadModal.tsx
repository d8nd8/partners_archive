"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLeadModal } from "@/context/LeadModalContext";

type ContactMethod = "phone" | "whatsapp" | "telegram";
type FormStatus = "idle" | "submitting" | "success";

/**
 * Formats raw digit string (up to 11 chars, starting with 7) as +7 (XXX) XXX-XX-XX.
 * Separators are only added when there are digits following them.
 */
function formatPhone(digits: string): string {
  if (!digits) return "";

  const a = digits.slice(1, 4);
  const p1 = digits.slice(4, 7);
  const p2 = digits.slice(7, 9);
  const p3 = digits.slice(9, 11);

  let result = "+7";
  if (a) result += ` (${a}`;
  if (p1) result += `) ${p1}`;
  if (p2) result += `-${p2}`;
  if (p3) result += `-${p3}`;

  return result;
}

/**
 * Extracts digits from any string, normalises Russian country code to 7,
 * clamps to 11 digits.
 */
function extractDigits(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  else if (d.length > 0 && !d.startsWith("7")) d = "7" + d;
  return d.slice(0, 11);
}

const CONTACT_OPTIONS: { id: ContactMethod; label: string; icon: React.ReactNode }[] = [
  {
    id: "phone",
    label: "Телефон",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M2.5 3.5C2.5 3.5 3 7 6 10C9 13 12.5 13.5 12.5 13.5L13.5 11.5L11 10L9.5 11.5C9.5 11.5 7.5 11 6 9.5C4.5 8 4 6 4 6L5.5 4.5L4.5 2L2.5 3.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 9.24 1.86 10.4 2.48 11.38L1.5 14.5L4.7 13.54C5.65 14.12 6.78 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 6.5C5.5 6.5 5.6 7.7 6.8 8.9C8 10.1 9.3 10.2 9.3 10.2L10 9.3L8.7 8.5L8.1 9.1C8.1 9.1 7.5 8.9 6.9 8.3C6.3 7.7 6.1 7.1 6.1 7.1L6.7 6.5L5.9 5.2L5 5.9"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M14 2.5L1.5 7.5L6 8.5L7.5 13.5L10 10L13.5 12.5L14 2.5Z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8.5L10 5.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.18, ease: [0.55, 0, 1, 0.45] },
  },
};

/**
 * Lead collection modal triggered by "Связаться" and "Задать вопрос" CTAs.
 */
export default function LeadModal() {
  const { isOpen, closeModal } = useLeadModal();
  const nameId = useId();
  const phoneId = useId();
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("phone");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const reset = useCallback(() => {
    setName("");
    setContactMethod("phone");
    setPhoneDigits("");
    setStatus("idle");
  }, []);

  const handleClose = useCallback(() => {
    closeModal();
    setTimeout(reset, 300);
  }, [closeModal, reset]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || phoneDigits.length < 11) return;

      setStatus("submitting");
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    },
    [name, phoneDigits],
  );

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => firstInputRef.current?.focus(), 50);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lead-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
          style={{ backgroundColor: "rgba(0,0,0,0.62)", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            key="lead-modal-card"
            className="relative w-full max-w-[440px] overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_32px_64px_rgba(0,0,0,0.5)]"
            variants={cardVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
          >
            {status === "success" ? (
              <SuccessState onClose={handleClose} />
            ) : (
              <FormState
                nameId={nameId}
                phoneId={phoneId}
                firstInputRef={firstInputRef}
                name={name}
                setName={setName}
                contactMethod={contactMethod}
                setContactMethod={setContactMethod}
                phoneDigits={phoneDigits}
                setPhoneDigits={setPhoneDigits}
                status={status}
                onSubmit={handleSubmit}
                onClose={handleClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FormState({
  nameId,
  phoneId,
  firstInputRef,
  name,
  setName,
  contactMethod,
  setContactMethod,
  phoneDigits,
  setPhoneDigits,
  status,
  onSubmit,
  onClose,
}: {
  nameId: string;
  phoneId: string;
  firstInputRef: React.RefObject<HTMLInputElement | null>;
  name: string;
  setName: (v: string) => void;
  contactMethod: ContactMethod;
  setContactMethod: (v: ContactMethod) => void;
  phoneDigits: string;
  setPhoneDigits: (v: string) => void;
  status: FormStatus;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  const isValid = name.trim().length > 0 && phoneDigits.length === 11;

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneDigits(extractDigits(e.target.value));
    },
    [setPhoneDigits],
  );

  const handlePhoneKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        setPhoneDigits(phoneDigits.slice(0, -1));
      }
    },
    [phoneDigits, setPhoneDigits],
  );

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex items-start justify-between px-[28px] pt-[28px] pb-[24px]">
        <div>
          <h2
            id="lead-modal-title"
            className="text-[22px] font-medium leading-[28px] tracking-[-0.3px] text-white"
          >
            Оставьте заявку
          </h2>
          <p className="mt-[6px] text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#8f8f8f]">
            Свяжемся в течение рабочего дня
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8f8f8f] transition-colors duration-150 hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-[16px] px-[28px] pb-[28px]">
        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor={nameId}
            className="text-[13px] font-light leading-[18px] tracking-[-0.07px] text-[#8f8f8f]"
          >
            Имя
          </label>
          <input
            ref={firstInputRef}
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван Иванов"
            autoComplete="name"
            required
            className="h-[46px] w-full rounded-[12px] border border-white/10 bg-white/[0.05] px-[14px] text-[15px] font-light leading-[22px] tracking-[-0.1px] text-white placeholder-[#4a4a4a] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#e37952]/60 focus:shadow-[0_0_0_3px_rgba(227,121,82,0.12)]"
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <span className="text-[13px] font-light leading-[18px] tracking-[-0.07px] text-[#8f8f8f]">
            Предпочитаемый способ связи
          </span>
          <div className="flex gap-[6px]">
            {CONTACT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setContactMethod(opt.id)}
                className={`flex flex-1 items-center justify-center gap-[7px] rounded-[10px] border py-[10px] text-[13px] font-medium leading-[18px] tracking-[-0.07px] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                  contactMethod === opt.id
                    ? "border-[#e37952]/40 bg-[#e37952]/12 text-[#e37952] shadow-[inset_0_0_0_1px_rgba(227,121,82,0.3)]"
                    : "border-white/8 bg-white/[0.04] text-[#8f8f8f] hover:border-white/16 hover:bg-white/8 hover:text-[#cfcfcf]"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label
            htmlFor={phoneId}
            className="text-[13px] font-light leading-[18px] tracking-[-0.07px] text-[#8f8f8f]"
          >
            Номер телефона
          </label>
          <input
            id={phoneId}
            type="tel"
            value={formatPhone(phoneDigits)}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            placeholder="+7 (999) 000-00-00"
            autoComplete="tel"
            required
            className="h-[46px] w-full rounded-[12px] border border-white/10 bg-white/[0.05] px-[14px] text-[15px] font-light leading-[22px] tracking-[-0.1px] text-white placeholder-[#4a4a4a] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[#e37952]/60 focus:shadow-[0_0_0_3px_rgba(227,121,82,0.12)]"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!isValid || status === "submitting"}
          className="mt-[4px] flex h-[48px] w-full items-center justify-center rounded-[14px] bg-white text-[15px] font-medium leading-[22px] tracking-[-0.1px] text-black transition-opacity duration-150 disabled:opacity-40"
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          {status === "submitting" ? (
            <span className="flex items-center gap-2">
              <Spinner />
              Отправляем…
            </span>
          ) : (
            "Отправить"
          )}
        </motion.button>
      </div>
    </form>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="flex flex-col items-center px-[28px] py-[48px] text-center"
    >
      <div className="mb-[20px] flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#e37952]/12 text-[#e37952]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 13L9 17L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-[22px] font-medium leading-[28px] tracking-[-0.3px] text-white">
        Заявка отправлена
      </h2>
      <p className="mt-[10px] max-w-[280px] text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#8f8f8f]">
        Свяжемся с вами в течение рабочего дня
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-[28px] h-[44px] rounded-[12px] bg-white/[0.06] px-[24px] text-[14px] font-medium text-white transition-colors duration-150 hover:bg-white/10"
      >
        Закрыть
      </button>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path
        d="M14 8A6 6 0 0 0 8 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
