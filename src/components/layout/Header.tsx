import NavigationPill from "@/components/layout/NavigationPill";

type HeaderProps = {
  className?: string;
};

/**
 * Top navigation header — renders the floating NavigationPill.
 */
export default function Header({ className }: HeaderProps) {
  return (
    <header className={className}>
      <NavigationPill />
    </header>
  );
}
