import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mobile-only "stacking cards" scroll effect. Plain CSS `position: sticky`
 * handles the physical overlap (cheap, reliable, no pinning — pinning is
 * exactly what the brief asked us to avoid on mobile). GSAP drives a
 * single, continuous, SCRUBBED timeline per card:
 *
 *   enter (card's own "from" transform) -> settle (identity) -> recede
 *   (dimmed/scaled down once the *next* card arrives)
 *
 * Deliberately ONE ScrollTrigger per card (not two competing ones) so
 * nothing fights over the same transform/opacity values — that dual-
 * trigger setup is what causes the classic "jittery stacking cards" bug.
 *
 * `enterVars` / `outgoingVars` let each section (Treatments, Testimonials,
 * Pricing) give its cards a distinct personality while sharing the same
 * mechanism — see each section's own file for its specific values.
 */
const StackCards = ({
  children,
  topOffset = 80,
  gap = 16,
  enterVars = { y: 60, opacity: 0, scale: 0.92, rotate: 0, rotateX: 0 },
  outgoingVars = { scale: 0.95, opacity: 0.6 },
  rotateAlternate = 0,
}) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Only ever runs below `lg` — this component is also only mounted
    // inside a `sm:hidden` wrapper by its parent, so this is a second,
    // independent safety net rather than the only guard.
    mm.add("(max-width: 1023px)", () => {
      const cards = Array.from(containerRef.current.querySelectorAll(".stack-card"));
      const triggers = [];

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        const rotateFrom =
          enterVars.rotate !== undefined
            ? (rotateAlternate && i % 2 === 1 ? -1 : 1) * enterVars.rotate
            : 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            // Each card gets roughly one viewport-height of scroll to
            // play its whole enter -> settle -> recede sequence.
            end: () => "+=" + Math.round(window.innerHeight * (isLast ? 0.55 : 1.05)),
            scrub: 0.4,
          },
        });

        tl.fromTo(
          card,
          { ...enterVars, rotate: rotateFrom },
          { y: 0, opacity: 1, scale: 1, rotate: 0, rotateX: 0, duration: 0.45, ease: "none" }
        );

        if (!isLast) {
          tl.to(card, { ...outgoingVars, duration: 0.55, ease: "none" }, 0.45);
        }

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      });

      return () => triggers.forEach((st) => st.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col" style={{ gap, perspective: 1000 }}>
      {React.Children.map(children, (child, i) => (
        <div
          className="stack-card"
          style={{
            position: "sticky",
            top: topOffset + i * 10,
            zIndex: i + 1,
            willChange: "transform, opacity",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StackCards;
