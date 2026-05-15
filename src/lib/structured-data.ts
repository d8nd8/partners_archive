import { FOOTER_CONTENT, HEADER_CONTENT, SITE_METADATA } from "@/lib/constants";

const ORGANIZATION_ID_SUFFIX = "#organization";
const WEBSITE_ID_SUFFIX = "#website";

/**
 * Builds Schema.org JSON-LD graph (Organization + WebSite) for the site root.
 */
export function buildStructuredDataGraph(siteUrl: string): Record<string, unknown> {
  const organizationId = `${siteUrl}${ORGANIZATION_ID_SUFFIX}`;
  const websiteId = `${siteUrl}${WEBSITE_ID_SUFFIX}`;
  const logoUrl = `${siteUrl}/Logo_dark.svg`;
  const legalName = FOOTER_CONTENT.companyInfo[0];
  const taxIdLine = FOOTER_CONTENT.companyInfo[1] ?? "";
  const taxId = taxIdLine.replace(/\D/g, "") || undefined;
  const emailContact = FOOTER_CONTENT.contacts.find((c) =>
    c.href.startsWith("mailto:"),
  );
  const phoneContact = FOOTER_CONTENT.contacts.find((c) =>
    c.href.startsWith("tel:"),
  );

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": organizationId,
    name: "АРХИВ",
    legalName,
    url: siteUrl,
    logo: logoUrl,
    description: SITE_METADATA.description,
    sameAs: [HEADER_CONTENT.ctaHref],
  };

  if (emailContact) {
    organization.email = emailContact.href.replace(/^mailto:/i, "");
  }
  if (phoneContact) {
    organization.telephone = phoneContact.href.replace(/^tel:/i, "");
  }
  if (taxId) {
    organization.taxID = taxId;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "АРХИВ",
    description: SITE_METADATA.description,
    inLanguage: "ru-RU",
    publisher: { "@id": organizationId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
}

/**
 * Serializes JSON-LD for safe embedding in a script tag.
 */
export function serializeStructuredData(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
