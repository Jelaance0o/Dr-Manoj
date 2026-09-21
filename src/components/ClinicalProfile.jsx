import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { credentials, clinicInfo } from "../data/siteData";
import {
  AwardIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./ui/Icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * The doctor's credentials card — positioned directly after Hero. Its
 * entrance is the deliberate second half of the Hero-card -> Clinical
 * Profile 3D flip: Hero's card rotates away on the exact same scroll
 * range (see Hero.jsx) that this card rotates in on, with opposite
 * rotation direction and opacity curves that sum to ~1 throughout, so
 * there's never a "blank" moment where neither card is visible.
 */
const ClinicalProfile = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 1023px)" },
        (context) => {
          const { isMobile } = context.conditions;
          const rotateFrom = isMobile ? 55 : 110;
          const depthFrom = isMobile ? -180 : -180;

          gsap.fromTo(
            cardRef.current,
            { rotateY: rotateFrom, z: depthFrom, scale: 0.82, opacity: 0 },
            {
              rotateY: 0,
              z: 0,
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                // Mirrors Hero's exit (see Hero.jsx): the card only starts
                // entering once Hero's exit has run its first ~35% — a
                // spacer below the hero + this offset keep the two cards
                // from overlapping mid-flip. Both use explicit fromTo
                // values so a fast scroll up/down can never leave either
                // card stuck at opacity 0.
                start: "top 88%",
                end: "top 20%",
                scrub: 0.5,
              },
            }
          );
        }
      );

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-paper pb-4 pt-10 lg:pb-6 lg:pt-20">
      <div className="container-px">
        <div className="mx-auto max-w-2xl lg:max-w-3xl" style={{ perspective: 1400 }}>
          <div
            ref={cardRef}
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            className="rounded-2xl border border-border bg-white p-7 shadow-card sm:p-9"
          >
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary-dark">
              <AwardIcon className="h-5 w-5 text-accent" />
              Clinical Profile &amp; Credentials
            </h3>
            <div className="mt-3 h-px w-full bg-border" />

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {credentials.map((item) => (
                <div key={item.label} className="rounded-xl bg-primary/5 p-4">
                  <div className="text-[10px] font-semibold tracking-wide text-ink-soft">{item.label}</div>
                  <div className="mt-1 font-display text-lg font-semibold text-primary-dark">{item.value}</div>
                  <div className="mt-0.5 text-[11px] leading-snug text-ink-soft">{item.sub}</div>
                </div>
              ))}
            </div>



            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm text-ink-soft">Connect with <br /> Dr. Manoj:</span>
              <div className="flex items-center gap-2">
                <a href={`https://wa.me/${clinicInfo.phoneRaw}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform duration-200 hover:scale-110 active:scale-95">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
                <a href={clinicInfo.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-200 hover:scale-110 active:scale-95">
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a href={clinicInfo.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-50 text-pink-600 transition-transform duration-200 hover:scale-110 active:scale-95">
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a href={clinicInfo.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition-transform duration-200 hover:scale-110 active:scale-95">
                  <YoutubeIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalProfile;
