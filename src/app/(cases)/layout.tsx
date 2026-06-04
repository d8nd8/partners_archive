import Footer from "@/components/layout/Footer";

/**
 * Case study pages chrome — footer only, no site header.
 */
export default function CasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-1 flex-col bg-[#dedede]">
      <div className="relative z-10 overflow-hidden rounded-b-[36px] bg-[#f5f5f5]">
        {children}
      </div>

      <div className="relative z-0 -mt-[52px] bg-[#dedede] pt-[52px]">
        <Footer />
      </div>
    </div>
  );
}
