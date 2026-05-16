import Image from "next/image";
import Link from "next/link";
import { FOOTER_CONTENT, HEADER_CONTENT } from "@/lib/constants";

/**
 * Site-wide footer with logo, navigation, and contacts.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#dedede] px-5 pb-10 pt-9 font-sans md:px-[40px] md:py-[28px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:flex-row md:flex-nowrap md:items-start md:justify-between md:gap-10">
        <div className="flex shrink-0 flex-col md:w-[240px]">
          <Link href="/" aria-label="На главную">
            <Image
              src="/Logo_dark.svg"
              alt={`${HEADER_CONTENT.logo.left}${HEADER_CONTENT.logo.star}${HEADER_CONTENT.logo.right}`}
              width={153}
              height={44}
              className="h-11 w-auto md:h-[44px]"
            />
          </Link>
        </div>

        <nav
          aria-label="Footer navigation"
          className="shrink-0 md:pt-[1px]"
        >
          <ul className="flex flex-col gap-5 md:gap-[8px]">
            {FOOTER_CONTENT.nav.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#303030]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul
          id="contacts"
          className="flex shrink-0 flex-col gap-3 md:gap-[8px] md:pt-[1px]"
        >
          {FOOTER_CONTENT.contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                className="text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#303030]"
              >
                {contact.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 flex-col gap-3 md:gap-[8px] md:pt-[1px]">
          {FOOTER_CONTENT.companyInfo.map((line) => (
            <p
              key={line}
              className="text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#303030]"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="flex shrink-0 flex-col gap-3 md:gap-[8px] md:pt-[1px]">
          <a
            href={FOOTER_CONTENT.privacyPolicy.href}
            className="text-[16px] font-light leading-[23px] tracking-[-0.17px] text-[#303030] md:whitespace-nowrap"
          >
            {FOOTER_CONTENT.privacyPolicy.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
