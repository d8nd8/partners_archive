type SectionHeadingProps = {
  children: React.ReactNode;
};

/**
 * Centers section titles with equal vertical spacing above and below.
 */
export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-center py-[60px] md:py-[75px]">
      {children}
    </div>
  );
}
