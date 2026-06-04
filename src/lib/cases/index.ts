import type { CaseStudyContent, CaseStudyImage } from "@/types/case-study";
import { CASES_CONTENT } from "@/lib/constants";
import { alvaCase } from "@/lib/cases/alva";
import { ifeelgoodCase } from "@/lib/cases/ifeelgood";
import { ruqiCase } from "@/lib/cases/ruqi";
import { rzdCase } from "@/lib/cases/rzd";
import { MACBOOK_SCREEN_AREA_LANDSCAPE } from "@/components/case-study/CaseStudyHeroGallery";

const CASE_REGISTRY: Record<string, CaseStudyContent> = {
  alva: alvaCase,
  ifeelgood: ifeelgoodCase,
  ruqi: ruqiCase,
  rzd: rzdCase,
};

/**
 * Per-case hero image overrides used when generating stubs for cases without full content.
 * MacBook cases reuse the shared mockup layers from ruqi/mockup/.
 */
const CASE_HERO_OVERRIDES: Record<string, Omit<CaseStudyImage, "alt">> = {
  ifeelgood: {
    src: "/cases/ifeelgood/mockup/screen-content.png",
    variant: "iphone",
    mockupDir: "/cases/ifeelgood/mockup",
    objectFit: "cover",
    objectPosition: "top center",
  },
  rzd: {
    src: "/cases/rzd/mockup/screen-content.png",
    variant: "macbook",
    mockupDir: "/cases/rzd/mockup",
    screenArea: MACBOOK_SCREEN_AREA_LANDSCAPE,
    objectFit: "cover",
    objectPosition: "top center",
  },
  alva: {
    src: "/cases/alva/mockup/screen-content.png",
    variant: "macbook",
    mockupDir: "/cases/alva/mockup",
  },
  fino: {
    src: "/cases/fino.png",
    variant: "macbook",
    mockupDir: "/cases/fino/mockup",
    screenArea: MACBOOK_SCREEN_AREA_LANDSCAPE,
    objectPosition: "center",
  },
  astrakh: {
    src: "/cases/astrakh/mockup/screen-content.png",
    variant: "macbook",
    mockupDir: "/cases/astrakh/mockup",
  },
};

/**
 * Returns all case slugs known to the site for static generation.
 */
export function getAllCaseSlugs(): string[] {
  const homepageSlugs = CASES_CONTENT.items.map((item) => item.id);
  return [...new Set([...Object.keys(CASE_REGISTRY), ...homepageSlugs])];
}

/**
 * Resolves a case study by slug or returns undefined when not found.
 */
export function getCaseBySlug(slug: string): CaseStudyContent | undefined {
  return CASE_REGISTRY[slug];
}

/**
 * Builds a minimal case stub from homepage card data for cases without a full page yet.
 */
export function getCaseStub(slug: string): CaseStudyContent | undefined {
  const card = CASES_CONTENT.items.find((item) => item.id === slug);
  if (!card) return undefined;

  const heroOverride = CASE_HERO_OVERRIDES[slug];

  return {
    slug: card.id,
    title: card.title,
    description: card.description,
    metaDescription: `${card.title} — кейс АРХИВ`,
    heroImage: heroOverride
      ? { ...heroOverride, alt: card.title }
      : { src: `/cases/${card.id}.png`, alt: card.title },
    quote: card.description,
    steps: [],
    challenges: [],
    techStack: [],
    workDone: {
      notes: [],
      images: [],
    },
    statusMessage: "Страница кейса в подготовке",
  };
}

/**
 * Resolves full case content or falls back to a homepage stub.
 */
export function resolveCase(slug: string): CaseStudyContent | undefined {
  return getCaseBySlug(slug) ?? getCaseStub(slug);
}
