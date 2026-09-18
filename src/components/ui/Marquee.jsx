import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react";

// Minimal re-implementation of @motionone/utils' wrap() so the component
// needs no extra dependency.
const wrap = (min, max, value) => {
  const range = max - min;
  const mod = (((value - min) % range) + range) % range;
  return min + mod;
};

/**
 * ONE continuous, infinite marquee row (Magic UI pattern) with
 * pauseOnHover, optional scroll-velocity reaction, and edge fade masks.
 *
 * Mechanics: a duplicated copy of the children sits side-by-side and the
 * shared `baseX` motion value is animated every frame with wrap([-50, 0]),
 * so the row never visually jumps — when the copy reaches -50% the original
 * is seamlessly back at 0. Each child MUST be wrapped in a width container
 * (the caller handles that) and the outer element must clip overflow so
 * nothing can leak into the page and cause horizontal scroll.
 *
 * Scrolling the page skews the marquee speed slightly (velocity factor),
 * which is the Magic UI ParallaxMarquee behavior — purely cosmetic and
 * safe: the row keeps looping in one direction regardless.
 */
const MarqueeRow = ({ baseVelocity = 3, skewVelocity = 2, pausedRef, children }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-skewVelocity, skewVelocity]);

  const directionRef = useRef(1);
  useAnimationFrame((t, delta) => {
    // pauseOnHover: freeze the track while the pointer is over the row.
    // The velocity reaction (skew) keeps working; only translation stops.
    if (pausedRef && pausedRef.current) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();

    if (vf < 0) directionRef.current = -1;
    else if (vf > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * Math.abs(vf);
    baseX.set(wrap(-50, 0, baseX.get() + moveBy));
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const skewXRaw = useTransform(skew, (v) => `skewX(${v}deg)`);
  const skewX = useSpring(skewXRaw, { damping: 50, stiffness: 400 });

  return (
    <div className="flex overflow-hidden">
      <motion.div style={{ x, skewX }} className="flex w-max flex-nowrap items-stretch will-change-transform">
        {/* Original copy + its duplicate: both flex-shrink-0 so each half is
            exactly 50% of the track — the wrap(-50, 0) loop assumes this. */}
        <div className="flex flex-shrink-0 flex-nowrap items-stretch">{children}</div>
        <div className="flex flex-shrink-0 flex-nowrap items-stretch" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const Marquee = ({ children, baseVelocity = 3, className = "", edgeFade = true, pauseOnHover = false }) => {
  const reducedMotion = useReducedMotion();
  const pausedRef = useRef(false);

  // Hover pause is pointer-only — touch devices scroll past the row
  // instead of pausing it, which keeps mobile scrolling smooth.

  if (reducedMotion) {
    // Static single row for reduced-motion users — content always visible,
    // no animation, no overflow (wraps instead of scrolling).
    return <div className={`flex flex-wrap justify-center gap-5 ${className}`}>{children}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {edgeFade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-paper to-transparent sm:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-paper to-transparent sm:w-14" />
        </>
      )}
      <div
        onMouseEnter={pauseOnHover ? () => (pausedRef.current = true) : undefined}
        onMouseLeave={pauseOnHover ? () => (pausedRef.current = false) : undefined}
      >
        <MarqueeRow baseVelocity={baseVelocity} pausedRef={pauseOnHover ? pausedRef : undefined}>
          {children}
        </MarqueeRow>
      </div>
    </div>
  );
};

export default Marquee;
