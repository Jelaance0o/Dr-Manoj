import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { clinicInfo, heroTrustPoints } from "../data/siteData";
import Button from "./ui/Button";
import {
  CalendarIcon,
  WhatsAppIcon,
  PhoneIcon,
  CheckIcon,
  ShieldIcon,
} from "./ui/Icons";

gsap.registerPlugin(ScrollTrigger);


// ======================================================
// DOCTOR PHOTO
// ======================================================

const DoctorPhoto = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="hero-photo relative mx-auto w-full max-w-[220px] sm:max-w-xs lg:max-w-sm">

      {/* Decorative leaf - top */}
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 text-primary/25 sm:h-36 sm:w-36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M100 10 C60 40 40 90 60 150 C90 130 120 90 100 10 Z" />
        <path d="M100 60 C130 90 150 130 130 170" />
      </svg>

      {/* Decorative leaf - bottom */}
      <svg
        viewBox="0 0 160 160"
        className="pointer-events-none absolute -bottom-6 -left-8 h-24 w-24 text-accent/20 sm:h-28 sm:w-28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 140 C20 90 50 50 100 30" />
        <path d="M40 120 C70 110 90 90 95 60" />
      </svg>

      {/* Tagline */}
      <span
        className="absolute -right-3 top-6 hidden -rotate-6 font-display text-[13px] italic text-primary-light sm:block sm:-right-8 sm:text-sm"
        style={{ writingMode: "horizontal-tb" }}
      >
        Gentle · Natural
        <br />
        Lasting Relief
      </span>

      {/* Photo frame */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] border border-border bg-primary/5 shadow-lifted"
        style={{ aspectRatio: "3 / 4" }}
      >

        {!imgFailed ? (
          <img
            src="https://i.pinimg.com/736x/36/e9/a9/36e9a92a71fb6e9ba98880d133862a27.jpg"
            alt={`${clinicInfo.doctorName}, Classical Homeopath`}
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="relative h-full w-full">

            <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/8 to-primary/[0.03]" />

            <svg
              viewBox="0 0 200 260"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMax meet"
              aria-hidden="true"
            >
              <path
                d="M20 260 C20 175 60 145 100 145 C140 145 180 175 180 260 Z"
                fill="#ffffff"
                stroke="var(--color-border)"
                strokeWidth="2"
              />

              <path
                d="M80 154 L100 200 L120 154 L108 143 L92 143 Z"
                fill="var(--color-primary)"
                opacity="0.85"
              />

              <path
                d="M64 158 Q64 198 100 203 Q136 198 136 158"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.4"
              />

              <circle
                cx="100"
                cy="205"
                r="6"
                fill="var(--color-primary)"
                opacity="0.4"
              />

              <circle
                cx="100"
                cy="92"
                r="56"
                fill="var(--color-primary)"
                opacity="0.12"
              />

              <circle
                cx="100"
                cy="92"
                r="56"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3"
                opacity="0.28"
              />

              <circle
                cx="80"
                cy="90"
                r="4.5"
                fill="var(--color-primary)"
                opacity="0.5"
              />

              <circle
                cx="120"
                cy="90"
                r="4.5"
                fill="var(--color-primary)"
                opacity="0.5"
              />

              <path
                d="M80 112 Q100 123 120 112"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
        )}

        {/* Name */}
        <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/90 px-3 py-2 shadow-soft backdrop-blur-sm">

          <div className="truncate text-xs font-semibold text-primary-dark">
            {clinicInfo.doctorName}
          </div>

          <div className="truncate text-[10px] text-ink-soft">
            Classical Homeopath
          </div>

        </div>
      </div>
    </div>
  );
};


// ======================================================
// CONSULTANT CARD
// ======================================================

const ConsultantCard = ({ innerRef, className = "" }) => {
  return (
    <div
      style={{ perspective: "1400px" }}
      className={className}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: "preserve-3d",

          // IMPORTANT:
          // Do NOT hide the back face here.
          // This prevents the card from disappearing
          // when GSAP rotates it.
          backfaceVisibility: "visible",

          // Helps GSAP render the animation smoothly.
          willChange: "transform, opacity",
        }}
        className="
          hero-consultant-card
          rounded-2xl
          border
          border-border
          bg-white
          p-5
          shadow-card
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between gap-2">

          <span
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-primary/10
              px-3
              py-1
              text-[11px]
              font-semibold
              text-primary-dark
            "
          >
            <ShieldIcon className="h-3 w-3" />

            Senior Consultant
          </span>


          <span
            className="
              flex
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-emerald-600
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-500
                pulse-dot
              "
            />

            Clinic Open
          </span>

        </div>


        {/* Timings */}
        <div className="mt-3 grid grid-cols-2 gap-3">

          {/* Morning */}
          <div className="rounded-xl border border-border px-3 py-2.5">

            <div className="text-[11px] text-ink-soft">
              Morning
            </div>

            <div className="text-[13px] font-semibold text-primary-dark">
              09:30–01:30
            </div>

          </div>


          {/* Evening */}
          <div className="rounded-xl border border-border px-3 py-2.5">

            <div className="text-[11px] text-ink-soft">
              Evening
            </div>

            <div className="text-[13px] font-semibold text-primary-dark">
              04:30–08:00
            </div>

          </div>

        </div>


        {/* Phone */}
        <a
          href={`tel:${clinicInfo.phoneRaw}`}
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-border
            py-2.5
            text-sm
            font-semibold
            text-primary-dark
            transition-all
            duration-300
            hover:border-primary
            hover:bg-primary/5
          "
        >

          <PhoneIcon className="h-4 w-4 flex-shrink-0" />

          <span className="truncate">
            {clinicInfo.phone}
          </span>

        </a>

      </div>
    </div>
  );
};


// ======================================================
// HERO
// ======================================================

const Hero = () => {

  const rootRef = useRef(null);
  const cardRef = useRef(null);


useLayoutEffect(() => {
  const root = rootRef.current;
  const card = cardRef.current;

  if (!root || !card) return;

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isMobile } = context.conditions;

        // ================================================
        // INITIAL HERO ANIMATION
        // ================================================

        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
            duration: 0.6,
          },
        });

        tl.from(".hero-badge", {
          opacity: 0,
          y: 16,
        })

          .from(
            ".hero-photo",
            {
              opacity: 0,
              x: isMobile ? 34 : 60,
              scale: isMobile ? 0.94 : 0.9,
              duration: isMobile ? 0.7 : 0.95,
              ease: "power2.out",
            },
            "-=0.35",
          )

          .from(
            ".hero-heading-line",
            {
              opacity: 0,
              y: 24,
              stagger: 0.1,
            },
            "-=0.5",
          )

          .from(
            ".hero-copy",
            {
              opacity: 0,
              y: 14,
            },
            "-=0.3",
          )

          .from(
            ".hero-consultant-card",
            {
              opacity: 0,
              y: 18,
              duration: 0.6,
            },
            "-=0.25",
          )

          .from(
            ".hero-cta",
            {
              opacity: 0,
              y: 14,
              stagger: 0.08,
              clearProps: "all",
            },
            "-=0.15",
          )

          .from(
            ".hero-trust",
            {
              opacity: 0,
              stagger: 0.06,
            },
            "-=0.2",
          );

        // ================================================
        // CONSULTANT CARD SCROLL ANIMATION
        // ================================================

        const rotateOut = isMobile ? -35 : -55;
        const depthOut = isMobile ? -40 : -80;

        /*
          Set a clean initial state.

          IMPORTANT:
          We don't set opacity to 0 here.
          The card must remain visible after refresh.
        */

        gsap.set(card, {
          opacity: 1,
          rotateY: 0,
          z: 0,
          scale: 1,
          y: 0,
        });

        // ================================================
        // SCROLLTRIGGER
        // ================================================

        gsap.to(card, {
          rotateY: rotateOut,
          z: depthOut,
          scale: isMobile ? 0.95 : 0.96,
          opacity: 0.35,

          ease: "none",

          scrollTrigger: {
            trigger: root,

            start: "bottom bottom",
            end: "bottom top",

            scrub: 1,

            invalidateOnRefresh: true,

            // Don't manually change opacity/transform here.
            // ScrollTrigger + scrub handles everything.
          },
        });

        /*
          IMPORTANT:
          DO NOT return mm.revert() from here.
          
          GSAP MatchMedia handles the callback lifecycle.
        */
      },
    );

    /*
      Refresh AFTER all ScrollTriggers have been created.
    */
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, root);

  // ================================================
  // CLEANUP
  // ================================================

  return () => {
    ctx.revert();
  };
}, []);


  return (
    <section
      id="top"
      ref={rootRef}
      className="
        relative
        overflow-hidden
        bg-paper
        pt-14
        pb-16
        lg:pt-20
        lg:pb-24
      "
    >

      {/* Background decoration */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          -right-24
          h-96
          w-96
          rounded-full
          bg-primary/5
          blur-3xl
          bg-drift
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-72
          w-72
          rounded-full
          bg-accent/5
        "
      />


      <div className="container-px relative">

        {/* Hero content */}
        <div
          className="
            grid
            grid-cols-[1.15fr_0.95fr]
            items-start
            gap-4
            sm:gap-7
            lg:grid-cols-2
            lg:items-center
            lg:gap-14
          "
        >

          {/* Text */}
          <div className="min-w-0">

            <span
              className="
                hero-badge
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-border
                bg-white
                px-3
                py-1.5
                text-[11px]
                font-semibold
                text-primary-dark
                sm:gap-2
                sm:px-4
                sm:text-xs
              "
            >

              <ShieldIcon
                className="
                  h-3.5
                  w-3.5
                  flex-shrink-0
                  text-accent
                "
              />

              <span className="leading-tight">
                Pure Classical Homeopathy • Gentle &amp; Long-Lasting Cure
              </span>

            </span>


            {/* Heading */}
            <h1
              className="
                mt-5
                font-display
                text-[1.9rem]
                leading-[1.12]
                text-primary-dark
                sm:mt-6
                sm:text-5xl
                lg:text-[3.4rem]
                lg:leading-[1.08]
              "
            >

              <span className="hero-heading-line block">
                Root-Cause Healing
              </span>

              <span className="hero-heading-line block italic text-primary-light">
                for Chronic &amp; Recurrent
              </span>

              <span className="hero-heading-line block">
                Ailments.
              </span>

            </h1>


            {/* Description */}
            <p
              className="
                hero-copy
                mt-4
                max-w-xl
                text-sm
                leading-relaxed
                text-ink-soft
                sm:mt-5
                sm:text-base
                lg:text-lg
              "
            >
              Welcome to the trusted practice of{" "}
              <strong className="text-ink">
                {clinicInfo.doctorName}
              </strong>{" "}
              in Badi Sarwan, Ratlam. Offering individualized, gentle,
              and constitutional therapies for lasting relief without
              harmful side effects.
            </p>

          </div>


          {/* Doctor photo */}
          <div className="flex flex-col items-center gap-4">
            <DoctorPhoto />
          </div>

        </div>


        {/* Consultant card */}
        <div
          className="
            mt-5
            grid
            grid-cols-1
            lg:grid-cols-2
            lg:gap-14
          "
        >

          <div
            className="hidden lg:block"
            aria-hidden="true"
          />

          <ConsultantCard
            innerRef={cardRef}
            className="w-full"
          />

        </div>


        {/* CTA */}
        <div
          className="
            mt-7
            flex
            flex-col
            gap-3
            sm:flex-row
            lg:max-w-xl
          "
        >

          <Button
            as="a"
            href="#booking"
            variant="primary"
            icon={<CalendarIcon className="h-4 w-4" />}
            className="hero-cta "
            
          >
            Book Doctor Consultation
          </Button>


          <Button
            as="a"
            href={`https://wa.me/${clinicInfo.phoneRaw}`}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            icon={<WhatsAppIcon className="h-4 w-4 text-primary" />}
            className="hero-cta "
          >
            Instant WhatsApp Chat
          </Button>

        </div>


        {/* Trust points */}
        <ul
          className="
            mt-6
            flex
            flex-wrap
            gap-x-6
            gap-y-2
            text-sm
            text-ink-soft
          "
        >

          {heroTrustPoints.map((point) => (
            <li
              key={point}
              className="hero-trust flex items-center gap-1.5"
            >

              <CheckIcon className="h-3.5 w-3.5 text-primary" />

              {point}

            </li>
          ))}

        </ul>

      </div>
    </section>
  );
};


export default Hero;