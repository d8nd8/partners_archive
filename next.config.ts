import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF убран намеренно: на iOS Safari < 16 он не поддерживается, а в iOS 16.0–16.3
    // есть баг рендеринга, из-за которого валидный AVIF показывается как «битая картинка».
    // WebP поддерживается на всех iOS 14+ и таких проблем не имеет.
    formats: ["image/webp"],
  },
};

export default nextConfig;
