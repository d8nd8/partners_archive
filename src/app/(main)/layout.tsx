import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Site chrome for main pages — header, content shell, and footer.
 */
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="relative flex flex-1 flex-col bg-[#dedede]">
        <div className="relative z-10 overflow-hidden rounded-b-[36px] bg-[#f5f5f5]">
          {children}
        </div>

        <div className="relative z-0 -mt-[52px] bg-[#dedede] pt-[52px]">
          <Footer />
        </div>
      </div>
    </>
  );
}
