
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/southcult.png";
import MadhuraLogo from "../../assets/madhura.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50
        flex items-center justify-center
        rounded-full
        bg-white/90
        backdrop-blur-md
        border border-white/40
        shadow-lg shadow-black/5
        transition-all duration-500 ease-in-out
        ${scrolled
          ? "px-4 py-2 sm:px-6 sm:py-2"
          : "px-5 py-3 sm:px-8 sm:py-3"
        }
      `}
    >
      <div className="flex items-center gap-4 sm:gap-6">

        {/* South Cult Logo */}
        <Link to="/" aria-label="South Cult">
          <img
            src={Logo}
            alt="South Cult"
            className={`
              w-auto object-contain
              transition-all duration-500
              ${scrolled ? "h-10 sm:h-12" : "h-12 sm:h-16"}
            `}
          />
        </Link>

        {/* Divider */}
        <div className="w-px h-8 sm:h-10 bg-black/15" />

        {/* Madhura Logo */}
        <a
          href="https://madhuratech.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Madhura Technologies"
        >
          <img
            src={MadhuraLogo}
            alt="Madhura"
            className={`
      w-auto object-contain
      transition-all duration-500
      hover:scale-105
      ${scrolled ? "h-9 sm:h-11" : "h-11 sm:h-14"}
    `}
          />
        </a>

      </div>
    </nav>
  );
}
