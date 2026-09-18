import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling for the whole app and keeps it in sync
 * with GSAP's ticker + ScrollTrigger, so scrubbed/pinned animations (the
 * card-stack effects, the Clinical Profile flip) read the exact same
 * scroll timing as the smooth-scroll engine instead of lagging behind it.
 *
 * IMPORTANT: ScrollTrigger measures each trigger's position once, up
 * front. If the page's layout height changes afterward — e.g. web fonts
 * swapping in late — every trigger further down the page ends up
 * pointing at a stale offset. We guard against that by explicitly
 * refreshing ScrollTrigger once fonts finish loading, once more on full
 * window load (images etc.), and once more on a short timeout as a final
 * safety net.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.1,
    });

    // Drive Lenis from GSAP's ticker instead of its own rAF loop, so Lenis
    // and every GSAP-driven animation stay on the same frame.
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger's internal scroll position in sync with Lenis's
    // eased position (not the raw native scroll position).
    lenis.on("scroll", ScrollTrigger.update);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh);
    const refreshTimeout = setTimeout(refresh, 1200);

    // Smooth anchor-link navigation (navbar links, "Book Appointment" etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimeout);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
}
