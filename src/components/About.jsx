import React, { useLayoutEffect, useMemo, useRef } from "react";
import { aboutParagraph, aboutFeatures, clinicInfo } from "../data/siteData";

import { UserIcon, FlaskIcon, HeartIcon } from "./ui/Icons";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = {
  case: UserIcon,
  flask: FlaskIcon,
  heart: HeartIcon,
};

const About = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const featuresRef = useRef(null);

  /*
   * Split heading into words
   */
  const headingWords = useMemo(() => {
    const text =
      "A Compassionate Healer Dedicated to Lifelong Wellness in Malwa & Beyond.";

    return text.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) {
        return word;
      }

      return (
        <span key={index} className="about-heading-word inline-block">
          {word}
        </span>
      );
    });
  }, []);

  /*
   * Split paragraph into words
   */
  const paragraphWords = useMemo(() => {
    return aboutParagraph.split(/(\s+)/).map((word, index) => {
      if (/^\s+$/.test(word)) {
        return word;
      }

      return (
        <span key={index} className="about-paragraph-word inline-block">
          {word}
        </span>
      );
    });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const badge = badgeRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const features = featuresRef.current;

    if (!section || !badge || !heading || !paragraph || !features) {
      return;
    }

    const ctx = gsap.context(() => {
      const headingWordsElements = heading.querySelectorAll(
        ".about-heading-word",
      );

      const paragraphWordsElements = paragraph.querySelectorAll(
        ".about-paragraph-word",
      );

      const featureCards = features.querySelectorAll(".about-feature-card");

      /*
       * ============================================================
       * BADGE
       * ============================================================
       *
       * Simple entrance animation.
       * Does NOT use scrub so it doesn't fight with the text animation.
       */

      gsap.fromTo(
        badge,
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
            trigger: badge,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      /*
       * ============================================================
       * HEADING
       * ============================================================
       *
       * Previous heading animation:
       *
       * 3deg rotation  -> 0deg
       * opacity         0.1 -> 1
       * blur            4px -> 0px
       * word stagger    0.05
       *
       * Everything is tied to the same ScrollTrigger progress.
       */

      // Initial heading state
      gsap.set(heading, {
        transformOrigin: "0% 50%",
        rotate: 3,
      });

      gsap.set(headingWordsElements, {
        opacity: 0.1,
        filter: "blur(4px)",
      });

      // Heading rotation
      gsap.to(heading, {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          end: "bottom 55%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Heading opacity + blur together
      gsap.to(headingWordsElements, {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          end: "bottom 55%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      /*
       * ============================================================
       * PARAGRAPH
       * ============================================================
       *
       * Current paragraph style:
       *
       * 2deg rotation  -> 0deg
       * opacity        0.1 -> 1
       * blur           3px -> 0px
       */

      // Initial paragraph state
      gsap.set(paragraph, {
        transformOrigin: "0% 50%",
        rotate: 2,
      });

      gsap.set(paragraphWordsElements, {
        opacity: 0.1,
        filter: "blur(3px)",
      });

      // Paragraph rotation
      gsap.to(paragraph, {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: paragraph,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Paragraph opacity + blur
      gsap.to(paragraphWordsElements, {
        opacity: 1,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
          end: "bottom 60%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      /*
       * ============================================================
       * FEATURE CARDS
       * ============================================================
       *
       * Cards animate one after another.
       *
       * No CSS transition is used here, so GSAP has full control.
       */

      gsap.fromTo(
        featureCards,
        {
          opacity: 0,
          y: 35,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: features,
            start: "top 82%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        },
      );

      /*
       * Refresh after everything has been created.
       * Helps when fonts/images change the layout height.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    /*
     * IMPORTANT:
     * Only animations created inside this context are reverted.
     * Other sections of your website are untouched.
     */
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-paper py-12 lg:py-14">
      <div className="container-px mx-auto max-w-3xl">
        {/* INTRO */}
        <div className="text-center">
          {/* Badge */}
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark"
          >
            <UserIcon className="h-3.5 w-3.5 text-accent" />
            About Dr. Manoj Bandwar
          </span>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="mt-5 font-display text-3xl leading-[1.15] text-primary-dark sm:text-4xl"
          >
            {headingWords}
          </h2>

          {/* Paragraph */}
          <p ref={paragraphRef} className="mt-5 leading-relaxed text-ink-soft">
            {paragraphWords}
          </p>
        </div>

        {/* FEATURES */}
        <div
          ref={featuresRef}
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {aboutFeatures.map((feature) => {
            const Icon = featureIcons[feature.icon];

            return (
              <div
                key={feature.title}
                className="about-feature-card rounded-xl border border-border bg-white p-5 text-center sm:text-left"
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mx-0">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-3 text-[15px] font-semibold text-primary-dark">
                  {feature.title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
