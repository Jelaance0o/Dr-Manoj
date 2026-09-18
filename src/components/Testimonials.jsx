import React from "react";
import { testimonials } from "../data/siteData";
import Marquee from "./ui/Marquee";
import ScrollReveal from "./ui/ScrollReveal";
import useReveal from "../hooks/useReveal";
import { StarIcon } from "./ui/Icons";

const reveal = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

// Same visual design as before — only the layout (one continuous marquee
// row) changed. Fixed width + flex-shrink-0 so each half of the duplicated
// marquee track is exactly 50%, which the seamless loop depends on.
const TestimonialCard = ({ t }) => (
  <figure className="flex h-full w-[78vw] max-w-[360px] flex-shrink-0 flex-col rounded-2xl border border-border bg-white p-6 shadow-card sm:w-[340px]">
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>
    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">"{t.quote}"</blockquote>
    <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary-dark">
        {t.initials}
      </span>
      <div>
        <div className="text-sm font-semibold text-primary-dark">{t.name}</div>
        <div className="text-xs text-ink-soft">{t.location}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials = () => {
  const [headRef, headVisible] = useReveal();

  return (
    <section className="overflow-hidden bg-paper py-12 sm:py-14 lg:py-16">
      <div className="container-px">
        <div ref={headRef} className={`mx-auto max-w-2xl text-center ${reveal(headVisible)}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            <StarIcon className="h-3.5 w-3.5 text-accent" />
            Patient Experiences
          </span>
          <h2 className="mt-4 font-display text-2xl text-primary-dark sm:text-3xl lg:text-4xl">
            <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
              Trusted by Families Across Ratlam
            </ScrollReveal>
          </h2>
          <p className="mt-2.5 text-sm text-ink-soft sm:text-base">
            Real feedback from patients treated at Dr. Manoj Bandwar's clinic.
          </p>
        </div>
      </div>

      {/* ONE continuous row — the duplicated copy loops seamlessly; cards
          never stack and the section clips overflow, so the page can never
          scroll horizontally. pauseOnHover is handled by .marquee-pausable
          CSS (animation-play-state) via the row's own class below. */}
      <div className="mt-8 sm:mt-10">
        <Marquee baseVelocity={4} pauseOnHover>
          {testimonials.map((t) => (
            <div key={t.name} className="px-2.5 sm:px-3">
              <TestimonialCard t={t} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
