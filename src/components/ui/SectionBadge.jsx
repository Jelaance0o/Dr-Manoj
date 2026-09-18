import React from "react";

/**
 * Small pill label used above section headings across the site
 * (e.g. "AREAS OF CLINICAL EXPERTISE", "VISITING HOURS").
 * Kept as one shared component so its style only needs to change once.
 */
const SectionBadge = ({ icon, children, tone = "light" }) => {
  const toneClasses =
    tone === "light"
      ? "bg-white text-primary-dark border-border"
      : "bg-white/10 text-white border-white/20";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${toneClasses}`}
    >
      {icon && <span className="text-accent">{icon}</span>}
      {children}
    </span>
  );
};

export default SectionBadge;
