import { useEffect, useRef, useState } from "react";

/**
 * Simple scroll reveal: uses the browser's native IntersectionObserver
 * instead of GSAP ScrollTrigger, so it can never be thrown off by Lenis's
 * smooth-scroll easing or by web-font layout shifts moving trigger
 * positions after they were first calculated (the bug that was leaving
 * whole sections stuck at opacity: 0).
 *
 * Usage:
 *   const [ref, visible] = useReveal();
 *   <div ref={ref} className={visible ? "opacity-100 ..." : "opacity-0 ..."}>
 *
 * The element is revealed once (it never re-hides on scroll-out), and a
 * timeout safety net guarantees it becomes visible even in the unlikely
 * case the observer never fires.
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion: skip the animation, just show the content.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);

    // Safety net: force-reveal shortly after mount no matter what, so
    // content can never get permanently stuck hidden.
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return [ref, visible];
}
