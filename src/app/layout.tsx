import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./Providers";
import { COLORS, SITE_METADATA } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: "/",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: SITE_METADATA.ogImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: SITE_METADATA.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.ogImage],
  },
};

const pageChromeBackground = COLORS.color.primary.background;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: pageChromeBackground },
    { media: "(prefers-color-scheme: dark)", color: pageChromeBackground },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-[100dvh] flex-col bg-[#dedede] pb-[env(safe-area-inset-bottom)]">
        <Providers>
          <Header />
          <div className="relative flex flex-1 flex-col bg-[#dedede]">
            <div className="relative z-10 overflow-hidden rounded-b-[36px] bg-[#f5f5f5]">
              {children}
            </div>

            <div className="relative z-0 -mt-[52px] bg-[#dedede] pt-[52px]">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
