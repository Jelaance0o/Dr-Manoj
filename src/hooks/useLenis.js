import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      // Faster than your previous 1.1s,
      // while still keeping the scroll smooth.
      duration: prefersReducedMotion ? 0 : 0.75,

      // Smooth but responsive easing.
      easing: (t) =>
        1 - Math.pow(1 - t, 4),

      smoothWheel: !prefersReducedMotion,

      // Keep touch scrolling responsive.
      touchMultiplier: isTouchDevice ? 1 : 1.1,

      // GSAP will control requestAnimationFrame.
      autoRaf: false,

      // Prevent excessive smoothing.
      wheelMultiplier: 1,
    });

    // -----------------------------------
    // GSAP + Lenis synchronization
    // -----------------------------------

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Prevent GSAP from correcting large frame gaps.
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger whenever Lenis scrolls.
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    // -----------------------------------
    // ScrollTrigger refresh
    // -----------------------------------

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    // Fonts can change page height.
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }

    // Images and other assets.
    window.addEventListener("load", refresh);

    // Final safety refresh.
    const refreshTimeout = setTimeout(refresh, 1000);

    // -----------------------------------
    // Smooth anchor navigation
    // -----------------------------------

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');

      if (!anchor) return;

      const id = anchor.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      e.preventDefault();

      lenis.scrollTo(target, {
        offset: -88,
        duration: 0.9,
      });
    };

    document.addEventListener("click", handleAnchorClick);

    // -----------------------------------
    // Cleanup
    // -----------------------------------

    return () => {
      document.removeEventListener(
        "click",
        handleAnchorClick
      );

      window.removeEventListener("load", refresh);

      clearTimeout(refreshTimeout);

      lenis.off("scroll", handleScroll);

      gsap.ticker.remove(update);

      lenis.destroy();
    };
  }, []);
}
;
