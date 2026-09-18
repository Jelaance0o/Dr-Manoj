import React from "react";
import { clinicInfo, footerLinks } from "../data/siteData";
import Button from "./ui/Button";
import useReveal from "../hooks/useReveal";
import {
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  CalendarIcon,
} from "./ui/Icons";

const Footer = () => {
  const year = new Date().getFullYear();
  const [ref, visible] = useReveal(0.05);

  return (
    <footer className="bg-primary-dark text-white">
      <div ref={ref} className="container-px py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.9fr_1fr]">
          {/* Brand */}
          <div
            style={{ transitionDelay: visible ? "0ms" : "0ms" }}
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 20A7 7 0 0 1 4 13c0-6 6-11 15-11 0 9-5 15-11 15a7 7 0 0 1-3-1z" />
                </svg>
              </span>
              <div>
                <div className="font-display text-lg font-semibold">{clinicInfo.doctorName}</div>
                <div className="text-[11px] tracking-wide text-white/60">CLASSICAL HOMEOPATHY</div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Committed to holistic, constitutional, and gentle healing. Serving patients across Badi Sarwan,
              Sailana, and Ratlam district with authentic care for over 15+ years.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a href={`https://wa.me/${clinicInfo.phoneRaw}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a href={clinicInfo.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href={clinicInfo.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={clinicInfo.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a href="#location" aria-label="Location" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <MapPinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div
            style={{ transitionDelay: visible ? "80ms" : "0ms" }}
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-xs font-semibold tracking-wide text-white/60">QUICK LINKS</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/80 transition-colors hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key treatments */}
          <div
            style={{ transitionDelay: visible ? "160ms" : "0ms" }}
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-xs font-semibold tracking-wide text-white/60">KEY TREATMENTS</h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.keyTreatments.map((t) => (
                <li key={t} className="flex items-start gap-1.5 text-sm text-white/80">
                  <span className="mt-1.5 text-accent">›</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic info */}
          <div
            style={{ transitionDelay: visible ? "240ms" : "0ms" }}
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h4 className="text-xs font-semibold tracking-wide text-white/60">CLINIC INFO</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                Badi Sarwan, Tehsil Sailana, Ratlam, M.P. 457550
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                {clinicInfo.phone}
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                {clinicInfo.phone} (Direct Chat)
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 flex-shrink-0 text-accent" />
                {clinicInfo.hoursShort}
              </li>
            </ul>
            <Button as="a" href="#booking" variant="primary" icon={<CalendarIcon className="h-4 w-4" />} className="mt-5">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-px flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <span>© {year} Dr. Manoj Bandwar Homeopathic Clinic. All rights reserved.</span>
          <span>Classical Homoeopathic Practice • Badi Sarwan, Ratlam (M.P.)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
