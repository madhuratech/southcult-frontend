
import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
import Logo from "../../assets/southcult.png";

const links = [
  { label: "Home", href: "/" },
  {
    label: "South Cult Label",
    href: "/artist-development-label",
  },
  {
    label: "Collaboration",
    href: "/independent-artist-collaboration",
  },
  { label: "Event", href: "/event" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Footer - Always Fixed */}
      <footer
        className="fixed bottom-0 left-0 z-40 hidden w-full
          border-t border-white/10 bg-[#050505]
          px-5 py-3 font-clash text-white
          md:block lg:px-8"
      >
        <div
          className="mx-auto flex max-w-[1600px]
            items-center justify-between gap-4"
        >
          {/* Logo and Tagline */}
          <div className="flex shrink-0 items-center gap-3">
            <a href="/" aria-label="South Cult Home">
              <img
                src={Logo}
                alt="South Cult"
                className="h-9 w-auto object-contain"
              />
            </a>

            <p
              className="hidden whitespace-nowrap
                text-[10px] text-white/40 xl:block"
            >
              Shaping the sound of the south.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex min-w-0 items-center
              justify-center gap-3 lg:gap-5 xl:gap-7"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-[9px]
                  uppercase tracking-[0.1em]
                  text-white/75 transition-colors
                  duration-300 hover:text-white
                  lg:text-[10px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright and Credits */}
          <div
            className="flex shrink-0 items-center
              gap-3 whitespace-nowrap
              text-[8px] uppercase tracking-[0.08em]
              text-white/30 xl:gap-5"
          >
            <p>
              © {new Date().getFullYear()} South Cult
            </p>

            <span className="hidden text-white/15 xl:inline">
              |
            </span>

            <p className="hidden xl:block">
              Composed by{" "}
              <a
                href="https://madhuratech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors
                  duration-300 hover:text-white"
              >
                Madhura Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Footer - Always Fixed */}
      <div
        className="fixed bottom-0 left-0 z-50 w-full
          font-clash text-white md:hidden"
      >
        <div
          className="border-t border-white/10
            bg-[#050505]"
        >
          {/* Expandable Content */}
          <div
            id="mobile-footer-menu"
            className={`overflow-hidden
              transition-[max-height,opacity]
              duration-300 ease-in-out
              ${
                open
                  ? "max-h-[min(420px,75dvh)] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
          >
            <div
              className="max-h-[75dvh] space-y-5
                overflow-y-auto px-5 py-5"
            >
              {/* Brand */}
              <div>
                <h3 className="text-lg font-medium">
                  South Cult
                </h3>

                <p className="mt-1 text-[10px] text-white/40">
                  South Indian stories, music & film.
                </p>
              </div>

              {/* Mobile Navigation */}
              <nav
                aria-label="Mobile footer navigation"
                className="flex flex-col gap-3"
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-[11px] uppercase
                      tracking-[0.15em] text-white/80
                      transition-colors duration-300
                      hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Copyright */}
              <div
                className="border-t border-white/10 pt-3
                  text-[9px] uppercase tracking-[0.12em]
                  text-white/30"
              >
                <p>
                  © {new Date().getFullYear()} South Cult
                </p>

                <p className="mt-2">
                  Made for stories worth telling.
                </p>

                <p className="mt-2">
                  Composed by{" "}
                  <a
                    href="https://madhuratech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    Madhura Technologies
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Sticky Bottom Bar */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-footer-menu"
            aria-label={
              open ? "Close footer menu" : "Open footer menu"
            }
            className="flex w-full items-center
              justify-between px-5 py-3"
          >
            {/* Logo */}
            <img
              src={Logo}
              alt="South Cult"
              className="h-7 w-auto object-contain"
            />

            {/* Toggle */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] uppercase
                  tracking-[0.15em] text-white/60"
              >
                {open ? "Close" : "Explore"}
              </span>

              <ChevronUp
                size={17}
                className={`transition-transform
                  duration-300
                  ${open ? "rotate-180" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
