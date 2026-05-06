import { HEADER_CONTENT } from "@/lib/constants";
import Image from "next/image";

type HeaderProps = {
  className?: string;
};

/**
 * Top navigation header for the landing page.
 */
export default function Header({ className }: HeaderProps) {
  return (
    <header className={className}>
      <nav
        aria-label="Primary"
        className="fixed top-5 left-1/2 z-50 h-[46px] w-[min(700px,calc(100vw-24px))] -translate-x-1/2 rounded-2xl border border-[#505050] bg-[#1C1C1C] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
      >
        <div className="flex h-full items-center gap-4 px-[15px]">
          <a
            href="#"
            className="inline-flex items-center px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Image
              src="/logo.svg"
              alt={`${HEADER_CONTENT.logo.left}${HEADER_CONTENT.logo.star}${HEADER_CONTENT.logo.right}`}
              width={92}
              height={24}
              priority
              className="h-7 w-auto"
            />
          </a>

          <div className="flex flex-1 items-center justify-center gap-5 text-[14px] font-light tracking-[-0.07px] text-[#CECECE]">
            <a
              href="#"
              className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {HEADER_CONTENT.nav.about}
            </a>

            <div className="group relative">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <span>{HEADER_CONTENT.nav.cases}</span>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-[15px] text-[#CECECE]"
                  aria-hidden="true"
                >
                  <path
                    d="M4.25 6.25L7.5 9.75L10.75 6.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#151515] p-2 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.45)] group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                {HEADER_CONTENT.casesDropdown.length > 0 ? (
                  <ul role="menu" className="flex flex-col">
                    {HEADER_CONTENT.casesDropdown.map((item) => (
                      <li role="none" key={`${item.href}-${item.label}`}>
                        <a
                          role="menuitem"
                          href={item.href}
                          className="block rounded-xl px-3 py-2 text-[14px] font-light tracking-[-0.07px] text-[#CECECE] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-10" aria-hidden="true" />
                )}
              </div>
            </div>

            <a
              href="#"
              className="rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              {HEADER_CONTENT.nav.contacts}
            </a>
          </div>

          <a
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-white px-3 text-[13px] font-medium tracking-[-0.07px] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {HEADER_CONTENT.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}

