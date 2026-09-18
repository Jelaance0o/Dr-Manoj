import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Word-by-word scroll-linked reveal (opacity + optional blur + optional
 * rotation), driven by the element's own position in the viewport — same
 * pattern as motion.dev's scroll-linked text reveals.
 *
 * The reveal always COMPLETES before the element reaches the top of the
 * viewport (offset ["start 0.95", "start 0.5"]), which matters because this
 * component is also used inside the sticky Treatments viewport: by the time
 * that section pins, the heading/description are already fully revealed, so
 * the pin can never freeze them half-hidden.
 *
 * Usage:
 *   <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
 *     Some heading text
 *   </ScrollReveal>
 *
 * Non-string children are revealed as a single block. Reduced-motion users
 * get the plain, fully visible content.
 */
const Word = ({ progress, range, baseOpacity, enableBlur, blurStrength, baseRotation, children }) => {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const rotate = useTransform(progress, range, [baseRotation, 0]);
  const blurPx = useTransform(progress, range, [blurStrength, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  return (
    <motion.span
      style={{
        opacity,
        rotate,
        ...(enableBlur ? { filter } : {}),
      }}
      className="inline-block will-change-[transform,opacity,filter]"
    >
      {children}
    </motion.span>
  );
};

const ScrollReveal = ({
  children,
  baseOpacity = 0.15,
  enableBlur = false,
  baseRotation = 3,
  blurStrength = 4,
  className = "",
}) => {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
  });

  // Strings reveal word-by-word; anything else reveals as one block.
  const words = typeof children === "string" ? children.split(" ").filter(Boolean) : [children];
  const total = Math.max(words.length, 1);

  if (reducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <Word
            progress={scrollYProgress}
            range={[i / total, Math.min((i + 1) / total, 1)]}
            baseOpacity={baseOpacity}
            enableBlur={enableBlur}
            blurStrength={blurStrength}
            baseRotation={baseRotation}
          >
            {word}
          </Word>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
};

export default ScrollReveal;
