import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Partners Archive",
  description: "Partners Archive landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#dedede]">
        <Header />
        <div className="relative flex flex-1 flex-col bg-[#dedede]">
          <div className="relative z-10 overflow-hidden rounded-b-[36px] bg-[#f5f5f5]">
            {children}
          </div>

          <div className="-mt-[52px] pt-[52px] relative z-0 bg-[#dedede]">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
