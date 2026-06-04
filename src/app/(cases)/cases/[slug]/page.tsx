import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import { getAllCaseSlugs, resolveCase } from "@/lib/cases";
import { SITE_METADATA } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Generates static params for all known case slugs.
 */
export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

/**
 * Builds SEO metadata for a case study page.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = resolveCase(slug);

  if (!content) {
    return { title: "Кейс не найден" };
  }

  const title = `${content.title} — кейс АРХИВ`;
  const description = content.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/cases/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/cases/${slug}`,
      type: "article",
      locale: "ru_RU",
      images: [
        {
          url: content.heroImage.src,
          alt: content.heroImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [content.heroImage.src],
    },
  };
}

/**
 * Dynamic case study route — renders unified template from content data.
 */
export default async function CaseRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const content = resolveCase(slug);

  if (!content) notFound();

  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: content.title,
    description: content.metaDescription,
    url: `${siteUrl}/cases/${slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_METADATA.title,
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CaseStudyPage content={content} />
    </>
  );
}
