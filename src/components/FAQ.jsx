import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { faqs } from "../data/siteData";
import useReveal from "../hooks/useReveal";
import { ChevronDownIcon } from "./ui/Icons";

const FAQ = () => {
  const [headRef, headVisible] = useReveal();
  const [listRef, listVisible] = useReveal();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="bg-surface py-14 lg:py-20">
      <div className="container-px">
        <div
          ref={headRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            Clarity &amp; Answers
          </span>
          <h2 className="mt-5 font-display text-3xl text-primary-dark sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-ink-soft">
            Helpful answers for patients visiting Dr. Manoj Bandwar's clinic.
          </p>
        </div>

        <div
          ref={listRef}
          className={`mx-auto mt-8 max-w-3xl space-y-3 transition-all duration-700 ease-out ${
            listVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ faq, isOpen, onToggle }) => {
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.to(panelRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-semibold text-primary-dark">{faq.question}</span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div ref={panelRef} className="h-0 overflow-hidden opacity-0">
        <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{faq.answer}</p>
      </div>
    </div>
  );
};

export default FAQ;
