import Link from "next/link";
import QRHover from "../shared/QRHover";
import FooterLogo from "./FooterLogo";
import { RESTAURANT } from "@/data/restaurant";
import pkg from "../../../package.json";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
  { href: "/specialties/", label: "Specialties" },
  { href: "/our-story/", label: "Our Story" },
  { href: "/iraqi-cuisine/", label: "Iraqi Cuisine" },
  { href: "/bakery/", label: "Bakery" },
  { href: "/catering/", label: "Catering" },
  { href: "/near/", label: "Service Areas" },
  { href: "/?review=open", label: "Leave a Review" },
  { href: "/return-policy/", label: "Return Policy" },
];

export default function Footer() {
  return (
    <footer
      className="w-full px-[10px] md:px-[50px] lg:px-[70px] pt-12 md:pt-16 pb-[20px] sm:pb-[10px] mt-12"
      style={{ background: "var(--color-text)", color: "rgba(255,255,255,0.78)" }}
    >
      <div
        className="text-4xl sm:text-5xl md:text-6xl w-full text-white leading-none text-center"
        style={{ letterSpacing: "-0.04em", fontWeight: 700 }}
      >
        Al-Baghdady
      </div>
      <div className="mt-3 mb-10 max-w-4xl mx-auto text-sm md:text-base leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.62)" }}>
        {RESTAURANT.footerDescription}
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[100px] lg:grid-cols-3 gap-[10px] lg:gap-8">
          <div className="col-span-2 lg:col-span-1 mx-auto flex flex-row items-center lg:items-start gap-4">
            <FooterLogo version={pkg.version} />
            <div className="flex h-[120px] justify-evenly gap-[10px] flex-col my-auto max-w-100">
              <a
                href={RESTAURANT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Al-Baghdady on Instagram"
                className="min-w-[100px] p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-colors duration-300 bg-white/5 hover:bg-[var(--color-primary)]/85"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  <defs>
                    <linearGradient id="insta-gradient" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#f9ce34" />
                      <stop offset="50%" stopColor="#ee2a7b" />
                      <stop offset="100%" stopColor="#6228d7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M15.9287 0H6.07107C2.72349 0 0 2.72362 0 6.07121V15.9288C0 19.2765 2.72349 22 6.07107 22H15.9287C19.2765 22 22 19.2764 22 15.9288V6.07121C22.0001 2.72362 19.2765 0 15.9287 0ZM20.0482 15.9288C20.0482 18.2002 18.2002 20.0481 15.9288 20.0481H6.07107C3.79979 20.0482 1.95195 18.2002 1.95195 15.9288V6.07121C1.95195 3.79992 3.79979 1.95195 6.07107 1.95195H15.9287C18.2001 1.95195 20.0481 3.79992 20.0481 6.07121V15.9288H20.0482Z"
                    fill="currentColor"
                    className="fill-opacity-70 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                  />
                  <path
                    d="M10.9999 5.33008C7.87405 5.33008 5.33105 7.87307 5.33105 10.9989C5.33105 14.1246 7.87405 16.6675 10.9999 16.6675C14.1257 16.6675 16.6687 14.1246 16.6687 10.9989C16.6687 7.87307 14.1257 5.33008 10.9999 5.33008ZM10.9999 14.7154C8.95048 14.7154 7.283 13.0482 7.283 10.9988C7.283 8.94925 8.95035 7.28189 10.9999 7.28189C13.0494 7.28189 14.7168 8.94925 14.7168 10.9988C14.7168 13.0482 13.0493 14.7154 10.9999 14.7154Z"
                    fill="currentColor"
                    className="fill-opacity-70 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                  />
                  <path
                    d="M16.9065 3.67773C16.5305 3.67773 16.161 3.82999 15.8954 4.09675C15.6285 4.36222 15.4751 4.73179 15.4751 5.10916C15.4751 5.48537 15.6287 5.85481 15.8954 6.12157C16.1609 6.38704 16.5305 6.54059 16.9065 6.54059C17.2839 6.54059 17.6522 6.38704 17.9189 6.12157C18.1857 5.85481 18.338 5.48524 18.338 5.10916C18.338 4.73179 18.1857 4.36222 17.9189 4.09675C17.6535 3.82999 17.2839 3.67773 16.9065 3.67773Z"
                    fill="currentColor"
                    className="fill-opacity-70 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                  />
                </svg>
              </a>
              <a
                href={RESTAURANT.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Al-Baghdady on Facebook"
                className="p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-colors duration-300 bg-white/5 hover:bg-[var(--color-primary)]/85"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                  className="group-hover:text-white transition-colors"
                >
                  <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.493-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex flex-row justify-evenly w-full mb-8 lg:mb-0">
            <div className="col-span-1 text-center h-full lg:mr-10 mr-0">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="text-base font-semibold mb-[22px] text-white tracking-tight">Contact Us</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.62)" }}>
                  <div className="flex flex-col items-center gap-[10px]">
                    <QRHover value={`tel:${RESTAURANT.phoneRaw}`}>
                      <a
                        href={`tel:${RESTAURANT.phoneRaw}`}
                        className="hover:text-[var(--color-gold)] hover:underline cursor-pointer transition-colors"
                      >
                        {RESTAURANT.phone}
                      </a>
                    </QRHover>
                    <QRHover value={`mailto:${RESTAURANT.email}`}>
                      <a
                        href={`mailto:${RESTAURANT.email}`}
                        className="hover:text-[var(--color-gold)] hover:underline cursor-pointer transition-colors"
                      >
                        {RESTAURANT.email}
                      </a>
                    </QRHover>
                    <span className="max-w-[220px] leading-snug">{RESTAURANT.address.full}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 text-center h-full">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="text-base text-white font-semibold mb-[22px] tracking-tight">Quick Links</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.62)" }}>
                  <div className="text-center grid grid-cols-2 gap-x-6 gap-y-[10px]">
                    {QUICK_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        scroll={l.href === "/?review=open" ? false : undefined}
                        className="hover:text-[var(--color-gold)] transition-colors cursor-pointer"
                      >
                        <span className="hover:underline">{l.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[60px]" />

      <div
        className="rounded-full text-white w-[90%] mx-auto min-h-[37px] py-[10px] sm:px-[50px] md:px-[100px]"
        style={{ background: "var(--color-primary-dark)" }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center text-xs gap-[20px]" style={{ color: "rgba(255,255,255,0.9)" }}>
          <p className="hidden sm:block" style={{ color: "rgba(255,255,255,0.9)" }}>
            Al-Baghdady Restaurant &amp; Bakery © {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <p className="text-nowrap" style={{ color: "rgba(255,255,255,0.9)" }}>
            Made with{" "}
            <a target="_blank" href="http://tableturnerr.com" rel="noopener noreferrer" className="hover:underline cursor-pointer" style={{ color: "rgba(255,255,255,0.9)" }}>
              <u>TableTurnerr.com</u>
            </a>
          </p>
        </div>
      </div>
      <div className="block sm:hidden w-full text-center text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.9)" }}>
        Al-Baghdady Restaurant &amp; Bakery © {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </footer>
  );
}
