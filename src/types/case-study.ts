export type CaseStudyImage = {
  src: string;
  alt: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill";
  variant?: "flat" | "macbook" | "iphone";
  /** Base directory containing mockup layers (shadow, macbook-pro / iphone-pro, screen-mask PNGs). */
  mockupDir?: string;
  /** MacBook screen slot override when the screenshot matches the physical screen mask (1440×900). */
  screenArea?: MacbookScreenArea;
  /** Slide in from the right edge (like MacBook) instead of fading up; also disables scroll parallax. */
  slideFromRight?: boolean;
};

export type MacbookScreenArea = {
  left: string;
  top: string;
  width: string;
  height: string;
};

export type CaseStudyStep = {
  title: string;
  description: string;
};

export type CaseStudyChallengePair = {
  challenge: string;
  solution: string;
};

import type { TechIconId } from "@/lib/tech-icons";

export type CaseStudyTechLogo = {
  id: TechIconId;
};

export type CaseStudyTechCategory = {
  label: string;
  description: string;
  logos: CaseStudyTechLogo[];
};

export type CaseStudyWorkNote = {
  text: string;
  variant?: "solid" | "glass";
};

export type CaseStudyWorkHighlight = {
  accent: string;
  rest: string;
  align?: "left" | "right";
};

export type CaseStudyWorkImage = {
  src: string;
  alt: string;
  variant: "wide" | "compact" | "feature" | "tall" | "phone";
  /** Exact CSS aspect ratio (e.g. "45/32") to show the full image with no crop. */
  aspect?: string;
  /** Serve the original file untouched — skip Next.js image optimization. */
  unoptimized?: boolean;
};

export type CaseStudyProgress = {
  label: string;
  value: number;
};

export type CaseStudyAboutItem = {
  label: string;
  text: string;
};

export type CaseStudyAbout = {
  title?: string;
  items: CaseStudyAboutItem[];
  paragraphs: string[];
};

export type CaseStudyContent = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  metaDescription: string;
  heroImage: CaseStudyImage;
  about?: CaseStudyAbout;
  quote: string;
  steps: CaseStudyStep[];
  challenges: CaseStudyChallengePair[];
  techStack: CaseStudyTechCategory[];
  workDone: {
    notes: CaseStudyWorkNote[];
    images: CaseStudyWorkImage[];
    highlights?: CaseStudyWorkHighlight[];
  };
  progress?: CaseStudyProgress;
  statusMessage?: string;
};
