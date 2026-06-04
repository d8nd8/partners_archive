import { CASES_CONTENT } from "@/lib/constants";

/**
 * Orange badge used across case cards and case study pages.
 */
export default function CaseBadge({ label = CASES_CONTENT.badge }: { label?: string }) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center rounded-[4px] border border-[#f4bda9] bg-[#ffded2] pb-[1.19px] pl-[4px] pr-[4.67px] pt-[2px] text-[14px] font-light uppercase leading-[18.2px] tracking-[-0.07px] text-[#e37952]">
      {label}
    </span>
  );
}
