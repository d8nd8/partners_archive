/**
 * Diagonal up-right arrow icon for case cards and CTAs.
 */
export default function CaseArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="8.8275 8.315 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ?? "h-[12px] w-[12px] shrink-0"}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.547 17.088V8.595H12.054V10.261H17.702L9.108 18.856L10.286 20.035L18.881 11.44V17.088H20.547Z"
        fill="currentColor"
      />
    </svg>
  );
}
