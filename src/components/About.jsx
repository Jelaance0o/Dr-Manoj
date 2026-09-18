import React from "react";
import { aboutParagraph, aboutFeatures, clinicInfo } from "../data/siteData";
import useReveal from "../hooks/useReveal";
import { UserIcon, FlaskIcon, HeartIcon } from "./ui/Icons";

const featureIcons = { case: UserIcon, flask: FlaskIcon, heart: HeartIcon };

const reveal = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

// Single-paragraph, single-column About section — kept intentionally
// compact per the brief ("do not make About unnecessarily tall").
const About = () => {
  const [introRef, introVisible] = useReveal();
  const [featuresRef, featuresVisible] = useReveal(0.05);

  return (
    <section id="about" className="bg-paper py-12 lg:py-14">
      <div className="container-px mx-auto max-w-3xl">
        <div ref={introRef} className={`text-center ${reveal(introVisible)}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            <UserIcon className="h-3.5 w-3.5 text-accent" />
            About Dr. Manoj Bandwar
          </span>

          <h2 className="mt-5 font-display text-3xl leading-[1.15] text-primary-dark sm:text-4xl">
            A Compassionate Healer Dedicated to Lifelong Wellness in Malwa &amp; Beyond.
          </h2>

          <p className="mt-5 leading-relaxed text-ink-soft">{aboutParagraph}</p>
        </div>

        <div ref={featuresRef} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {aboutFeatures.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <div
                key={feature.title}
                style={{ transitionDelay: featuresVisible ? `${index * 100}ms` : "0ms" }}
                className={`rounded-xl border border-border bg-white p-5 text-center sm:text-left ${reveal(
                  featuresVisible
                )}`}
              >
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mx-0">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-primary-dark">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
