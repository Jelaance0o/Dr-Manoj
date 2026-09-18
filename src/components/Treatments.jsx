import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { treatments, clinicInfo } from "../data/siteData";
import Button from "./ui/Button";
import ScrollReveal from "./ui/ScrollReveal";
import {
  HeartIcon,
  ShieldIcon,
  BoneIcon,
  StomachIcon,
  LungsIcon,
  BrainIcon,
  LeafIcon,
  CheckIcon,
  WhatsAppIcon,
} from "./ui/Icons";

const treatmentIcons = {
  shield: ShieldIcon,
  bone: BoneIcon,
  stomach: StomachIcon,
  lungs: LungsIcon,
  brain: BrainIcon,
  leaf: LeafIcon,
};

// Shared card markup — same design as before, now laid out on a horizontal
// track instead of a grid/stack. Width is applied by the caller.
const TreatmentCard = ({ t, className = "", style }) => {
  const Icon = treatmentIcons[t.icon];
  return (
    <div
      style={style}
      className={`group rounded-2xl border border-border bg-white p-6 shadow-card sm:p-7 ${className}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">{t.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.description}</p>
      <div className="mt-4 border-t border-border pt-3.5">
        <ul className="space-y-2">
          {t.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-[13px] text-ink-soft">
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Treatments = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const trackWrapRef = useRef(null);

  // Sticky offset follows the real sticky navbar height so the pinned
  // content never slides underneath it.
  const [navH, setNavH] = useState(104);
  // Horizontal distance the track must travel to bring the last card fully
  // into view. Re-measured on resize/font-load so movement is dynamic.
  const [range, setRange] = useState(0);
  // Compression factor: mobile gets a shorter pin (faster horizontal speed)
  // so the section never feels like a scroll trap on touch devices.
  const [factor, setFactor] = useState(0.7);

  useEffect(() => {
    const measure = () => {
      const header = document.getElementById("site-header");
      if (header) setNavH(header.offsetHeight);

      const track = trackRef.current;
      const vp = viewportRef.current;
      const wrap = trackWrapRef.current;
      if (track && vp && wrap) {
        const padLeft = parseFloat(getComputedStyle(wrap).paddingLeft) || 0;
        setRange(Math.max(0, Math.round(track.scrollWidth - (vp.clientWidth - padLeft))));
      }
      setFactor(window.innerWidth < 1024 ? 0.65 : 0.8);
    };

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    const t = setTimeout(measure, 1200);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // Vertical scroll drives horizontal movement. The range starts exactly
  // when the sticky engages (section top reaching the navbar height) and
  // ends exactly when the sticky releases — no dead zones either side.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${navH}px`, "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const x = useSpring(rawX, { stiffness: 150, damping: 30, mass: 0.6 });
  const barScale = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.6 });
  const indexText = useTransform(scrollYProgress, (v) =>
    String(Math.min(treatments.length, Math.round(v * (treatments.length - 1)) + 1)).padStart(2, "0")
  );

  return (
    <>
      {/* Tall wrapper gives the sticky viewport its scroll distance; the
          extra height is exactly the horizontal travel (× factor), so
          normal vertical scrolling resumes right after the last card. */}
      <section
        id="treatments"
        ref={sectionRef}
        className="relative bg-surface"
        style={{ height: `calc(100vh + ${Math.round(range * factor)}px)` }}
      >
        <div
          ref={viewportRef}
          className="treatment-sticky sticky overflow-hidden"
          style={{ "--nav-h": `${navH}px` }}
        >
          {/* Soft right-edge fade so cards dissolve into the section edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent sm:w-16" />

          <div className="container-px flex h-full flex-col justify-center py-6 sm:py-8">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-1.5 text-xs font-semibold text-primary-dark">
                <HeartIcon className="h-3.5 w-3.5 text-accent" />
                Areas of Clinical Expertise
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl text-primary-dark sm:text-3xl lg:text-4xl">
                <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
                  Proven Relief for Chronic &amp; Recurrent Conditions
                </ScrollReveal>
              </h2>
              <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
                  Homeopathy operates deeply on your immune regulation. Explore our key clinical focus areas below.
                </ScrollReveal>
              </p>
            </div>

            {/* Horizontal track — full-bleed to the right, left-aligned with
                the container so the first card lines up with the heading. */}
            <div
              ref={trackWrapRef}
              className="mt-7 pl-5 sm:mt-9 sm:pl-8 lg:pl-10"
            >
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex w-max flex-nowrap items-stretch gap-5 will-change-transform sm:gap-6"
              >
                {treatments.map((t) => (
                  <TreatmentCard
                    key={t.title}
                    t={t}
                    className="w-[80vw] max-w-[400px] flex-shrink-0 sm:w-[380px] lg:w-[420px]"
                  />
                ))}
              </motion.div>
            </div>

            {/* Position indicator — genuinely useful while the pin is active */}
            <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
              <span className="text-xs font-semibold tracking-wide text-ink-soft">
                <motion.span className="text-primary-dark">{indexText}</motion.span>
                <span className="mx-1 text-border">/</span>
                {String(treatments.length).padStart(2, "0")}
              </span>
              <span className="h-1 w-40 overflow-hidden rounded-full bg-border sm:w-56">
                <motion.span style={{ scaleX: barScale }} className="block h-full w-full origin-left rounded-full bg-primary" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-12 pt-2 lg:pb-16">
        <div className="container-px">
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-primary/5 p-6 sm:flex-row sm:p-7">
            <div>
              <h3 className="font-display text-lg font-semibold text-primary-dark">
                Unsure if Homeopathy can cure your disease?
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Message {clinicInfo.doctorName} directly with your symptoms for initial medical feedback.
              </p>
            </div>
            <Button
              as="a"
              href={`https://wa.me/${clinicInfo.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              className="w-full flex-shrink-0 sm:w-auto"
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Treatments;
