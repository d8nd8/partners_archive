import type { CaseStudyContent } from "@/types/case-study";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyHeroGallery, {
  IPHONE_SCREEN_VIEWPORT_WIDTH,
  MACBOOK_SCREEN_VIEWPORT_WIDTH,
} from "@/components/case-study/CaseStudyHeroGallery";
import CaseStudyAbout from "@/components/case-study/CaseStudyAbout";
import CaseStudySteps from "@/components/case-study/CaseStudySteps";
import CaseStudyQuote from "@/components/case-study/CaseStudyQuote";
import CaseStudyChallenges from "@/components/case-study/CaseStudyChallenges";
import CaseStudyTechStack from "@/components/case-study/CaseStudyTechStack";
import CaseStudyWorkDone from "@/components/case-study/CaseStudyWorkDone";
import CaseStudyProgressSection from "@/components/case-study/CaseStudyProgressSection";
import CaseStudyCta from "@/components/case-study/CaseStudyCta";

type CaseStudyPageProps = {
  content: CaseStudyContent;
};

/**
 * Unified case study page template driven by content data.
 */
export default function CaseStudyPage({ content }: CaseStudyPageProps) {
  const hasFullContent =
    content.steps.length > 0 ||
    content.challenges.length > 0 ||
    content.techStack.length > 0 ||
    content.workDone.images.length > 0;

  const descriptionMaxWidth =
    content.heroImage.variant === "iphone"
      ? IPHONE_SCREEN_VIEWPORT_WIDTH
      : content.heroImage.variant === "macbook"
        ? MACBOOK_SCREEN_VIEWPORT_WIDTH
        : undefined;

  return (
    <main className="flex flex-1 flex-col bg-[#f5f5f4]">
      <CaseStudyHero
        title={content.title}
        description={content.description}
        descriptionMaxWidth={descriptionMaxWidth}
      />
      <CaseStudyHeroGallery image={content.heroImage} />
      {content.about && <CaseStudyAbout about={content.about} />}

      {hasFullContent ? (
        <>
          <CaseStudySteps steps={content.steps} />
          <CaseStudyQuote quote={content.quote} />
          <CaseStudyTechStack categories={content.techStack} />
          <CaseStudyChallenges pairs={content.challenges} />
          <CaseStudyWorkDone workDone={content.workDone} />
          {content.progress && (
            <CaseStudyProgressSection
              progress={content.progress}
              statusMessage={content.statusMessage}
            />
          )}
        </>
      ) : (
        content.statusMessage && (
          <section className="px-4 py-16 text-center md:px-5 min-[1440px]:px-[120px]">
            <p className="mx-auto max-w-[1200px] text-[24px] font-light leading-[32px] tracking-[-0.64px] text-black md:text-[45px] md:leading-[50px]">
              {content.statusMessage}
            </p>
          </section>
        )
      )}

      <CaseStudyCta />
    </main>
  );
}
