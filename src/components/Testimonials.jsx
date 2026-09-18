import React, { useLayoutEffect, useRef } from "react";
import { testimonials } from "../data/siteData";
import ScrollReveal from "./ui/ScrollReveal";
import { StarIcon } from "./ui/Icons";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestimonialCard = ({ t }) => (
  <figure className="flex h-full w-[78vw] max-w-[360px] flex-shrink-0 flex-col rounded-2xl border border-border bg-white p-6 shadow-card sm:w-[340px]">
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" />
      ))}
    </div>

    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
      "{t.quote}"
    </blockquote>

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
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      /*
       * ==========================================
       * HEADING
       * ==========================================
       */

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /*
       * ==========================================
       * DESCRIPTION
       * ==========================================
       */

      gsap.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /*
       * ==========================================
       * INFINITE TESTIMONIAL SCROLL
       * ==========================================
       */

      const cards = track.querySelectorAll(".testimonial-item");

      if (!cards.length) return;

      /*
       * Duplicate the cards.
       *
       * Original:
       * [1][2][3][4]
       *
       * Becomes:
       * [1][2][3][4][1][2][3][4]
       *
       * When the first set finishes, GSAP jumps
       * back to the exact same visual position.
       */

      const originalItems = Array.from(cards);

      originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      /*
       * Calculate exactly half of the track width.
       *
       * This is the distance required to complete
       * one full loop.
       */

      const getLoopWidth = () => {
        return track.scrollWidth / 2;
      };

      /*
       * Create the infinite animation.
       */

      let animation;

      const createAnimation = () => {
        if (animation) {
          animation.kill();
        }

        const loopWidth = getLoopWidth();

        if (!loopWidth) return;

        animation = gsap.fromTo(
          track,
          {
            x: 0,
          },
          {
            x: -loopWidth,
            duration: 35,
            ease: "none",
            repeat: -1,
          },
        );
      };

      createAnimation();

      /*
       * Recalculate after resize.
       */

      const resizeHandler = () => {
        createAnimation();
      };

      window.addEventListener("resize", resizeHandler);

      /*
       * Pause on hover.
       */

      const marqueeContainer = track.parentElement;

      const pause = () => {
        if (animation) animation.pause();
      };

      const play = () => {
        if (animation) animation.play();
      };

      marqueeContainer.addEventListener("mouseenter", pause);
      marqueeContainer.addEventListener("mouseleave", play);

      /*
       * Cleanup
       */

      return () => {
        window.removeEventListener("resize", resizeHandler);

        marqueeContainer.removeEventListener("mouseenter", pause);
        marqueeContainer.removeEventListener("mouseleave", play);

        if (animation) {
          animation.kill();
        }
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-paper py-12 sm:py-14 lg:py-16"
    >
      {/* ==========================================
          HEADER
          ========================================== */}

      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            <StarIcon className="h-3.5 w-3.5 text-accent" />
            Patient Experiences
          </span>

          <div ref={headingRef}>
            <h2 className="mt-4 font-display text-2xl text-primary-dark sm:text-3xl lg:text-4xl">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur
                baseRotation={3}
                blurStrength={4}
              >
                Trusted by Families Across Ratlam
              </ScrollReveal>
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="mt-2.5 text-sm text-ink-soft sm:text-base"
          >
            Real feedback from patients treated at Dr. Manoj Bandwar's clinic.
          </p>
        </div>
      </div>

      {/* ==========================================
          TESTIMONIAL MARQUEE
          ========================================== */}

      <div className="mt-8 w-full overflow-hidden sm:mt-10">
        <div ref={trackRef} className="flex w-max items-stretch">
          {testimonials.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="testimonial-item flex-shrink-0 px-2.5 sm:px-3"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
