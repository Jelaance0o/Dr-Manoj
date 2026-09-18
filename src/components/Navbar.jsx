import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { clinicInfo, navLinks } from "../data/siteData";
import Button from "./ui/Button";
import { WhatsAppIcon, CalendarIcon, MenuIcon, CloseIcon } from "./ui/Icons";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Subtle scroll-aware navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Animate mobile menu open
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="site-header" className="sticky top-0 z-50">
      {/* Main navigation */}
      <nav
        className={`bg-paper/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <div className="container-px flex items-center justify-between gap-4 py-3.5">
          {/* Logo */}
          <a
            href="#top"
            className="group flex min-w-0 flex-shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M11 20A7 7 0 0 1 4 13c0-6 6-11 15-11 0 9-5 15-11 15a7 7 0 0 1-3-1z" />
              </svg>
            </span>

            <span className="min-w-0">
              <span className="block whitespace-nowrap font-display text-base font-semibold leading-tight text-primary-dark sm:text-lg">
                {clinicInfo.doctorName}
              </span>

              <span className="block whitespace-nowrap text-[11px] font-medium leading-tight text-ink-soft">
                {clinicInfo.tagline}
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-ink-soft transition-colors hover:text-primary-dark"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop buttons */}
          <div className="hidden flex-shrink-0 items-center gap-3 xl:flex">
            <Button
              as="a"
              href={`https://wa.me/${clinicInfo.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              className="whitespace-nowrap"
            >
              WhatsApp
            </Button>

            <Button
              as="a"
              href="#booking"
              variant="dark"
              icon={<CalendarIcon className="h-4 w-4" />}
              className="whitespace-nowrap"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border text-primary-dark xl:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile / tablet menu */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="overflow-hidden border-t border-border bg-paper xl:hidden"
          >
            <div className="container-px flex flex-col gap-4 py-5">
              {/* Links */}
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-primary/5 hover:text-primary-dark"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Mobile buttons */}
              <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
                <Button
                  as="a"
                  href={`https://wa.me/${clinicInfo.phoneRaw}`}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                  onClick={closeMenu}
                  className="w-full"
                >
                  WhatsApp
                </Button>

                <Button
                  as="a"
                  href="#booking"
                  variant="dark"
                  icon={<CalendarIcon className="h-4 w-4" />}
                  onClick={closeMenu}
                  className="w-full"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
