import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { clinicInfo } from "../data/siteData";
import { WhatsAppIcon } from "./ui/Icons";

const FloatingButtons = () => {
  const rootRef = useRef(null);

  // Small delayed entrance so the floating widget doesn't compete with the
  // hero's own entrance sequence.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        delay: 1.4,
        ease: "back.out(1.6)",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
      <span className="hidden rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-primary-dark shadow-soft sm:inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-dot" />
        Chat with Dr. Manoj
      </span>
      <a
        href={`https://wa.me/${clinicInfo.phoneRaw}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lifted transition-transform duration-300 hover:scale-105"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
        <WhatsAppIcon className="relative h-6 w-6" />
      </a>
    </div>
  );
};

export default FloatingButtons;
