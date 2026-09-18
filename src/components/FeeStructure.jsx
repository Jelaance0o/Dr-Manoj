import React from "react";
import { feePlans, feeFootnote } from "../data/siteData";
import Button from "./ui/Button";
import StackCards from "./ui/StackCards";
import useReveal from "../hooks/useReveal";
import { CheckIcon } from "./ui/Icons";

const revealClasses = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

const PricingCard = ({ plan, className = "", style }) => (
  <div
    style={style}
    className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 shadow-card ${
      plan.highlighted ? "border-primary bg-white shadow-lifted lg:scale-[1.03]" : "border-border bg-white"
    } ${className}`}
  >
    {plan.badge && (
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-soft">
        {plan.badge}
      </span>
    )}

    <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary-dark">
      {plan.tag}
    </span>
    <h3 className="mt-4 font-display text-xl font-semibold text-primary-dark">{plan.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{plan.description}</p>

    <div className="mt-5 flex items-baseline gap-2 sm:mt-6">
      <span className="font-display text-3xl font-semibold text-primary-dark">{plan.price}</span>
      <span className="text-xs text-ink-soft">{plan.priceSuffix}</span>
    </div>

    <div className="mt-5 border-t border-border pt-4 sm:mt-6 sm:pt-5">
      <ul className="space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-ink-soft">
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>
    </div>

    <Button as="a" href="#booking" variant={plan.highlighted ? "primary" : "outline"} className="mt-6 w-full sm:mt-7">
      {plan.cta}
    </Button>
  </div>
);

const FeeStructure = () => {
  const [headRef, headVisible] = useReveal();
  const [gridRef, gridVisible] = useReveal(0.05);

  return (
    <section id="fees" className="bg-paper py-14 lg:py-18">
      <div className="container-px">
        <div ref={headRef} className={`mx-auto max-w-2xl text-center ${revealClasses(headVisible)}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            Honest &amp; Transparent Pricing
          </span>
          <h2 className="mt-5 font-display text-3xl text-primary-dark sm:text-4xl">
            Clear, Affordable Fee Structure
          </h2>
          <p className="mt-4 text-ink-soft">
            Quality holistic healthcare made accessible to families across Badi Sarwan and neighboring towns. No
            hidden diagnostic charges.
          </p>
        </div>

        {/* Desktop / tablet: normal 3-column grid, unchanged */}
        <div ref={gridRef} className="mt-12 hidden gap-7 sm:grid sm:grid-cols-3 sm:items-stretch lg:mt-14">
          {feePlans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              plan={plan}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : "0ms" }}
              className={`transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] ${revealClasses(gridVisible)}`}
            />
          ))}
        </div>

        {/* Mobile: gentle "lift from depth" reveal — kept lighter than
            Treatments/Testimonials since pricing needs to stay easy to
            read at a glance. */}
        <div className="mt-10 sm:hidden">
          <StackCards
            enterVars={{ y: 46, opacity: 0, scale: 0.88, rotateX: -10 }}
            outgoingVars={{ scale: 0.95, opacity: 0.72 }}
          >
            {feePlans.map((plan) => (
              <PricingCard key={plan.title} plan={plan} />
            ))}
          </StackCards>
        </div>

        <p className="mt-10 text-center text-xs text-ink-soft">{feeFootnote}</p>
      </div>
    </section>
  );
};

export default FeeStructure;
