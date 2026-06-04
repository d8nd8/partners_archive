/**
 * Horizontal arrow icon for case study buttons.
 */
export default function CaseArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-[17px] w-[16px] shrink-0"}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.471 13.305L14.276 8.5L9.471 3.695L8.529 4.638L11.724 7.833H2V9.167H11.724L8.529 12.362L9.471 13.305Z"
        fill="currentColor"
      />
    </svg>
  );
}
