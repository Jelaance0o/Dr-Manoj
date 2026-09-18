import React from "react";
import { clinicSchedule, visitExpectations, clinicInfo } from "../data/siteData";
import Button from "./ui/Button";
import useReveal from "../hooks/useReveal";
import { ClockIcon, BellIcon, PhoneIcon } from "./ui/Icons";

const statusDot = {
  open: "bg-emerald-500",
  limited: "bg-amber-500",
};

const reveal = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

const Timings = () => {
  const [introRef, introVisible] = useReveal();
  const [scheduleRef, scheduleVisible] = useReveal(0.05);
  const [expectRef, expectVisible] = useReveal(0.05);
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <section id="timings" className="bg-surface py-14 lg:py-18">
      <div className="container-px grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: schedule table */}
        <div>
          <div ref={introRef} className={reveal(introVisible)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
              <ClockIcon className="h-3.5 w-3.5 text-accent" />
              Visiting Hours
            </span>
            <h2 className="mt-5 font-display text-3xl text-primary-dark sm:text-4xl">
              Clinic Timings &amp; Consultation Hours
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft">
              {clinicInfo.doctorName} is available for in-clinic checkups six days a week at Badi Sarwan. Please
              note our morning and evening session slots below:
            </p>
          </div>

          <div ref={scheduleRef} className="mt-6 overflow-hidden rounded-2xl border border-border bg-paper">
            {clinicSchedule.map((row, i) => (
              <div
                key={row.day}
                style={{ transitionDelay: scheduleVisible ? `${i * 90}ms` : "0ms" }}
                className={`flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-center sm:justify-between ${reveal(
                  scheduleVisible
                )} ${i !== clinicSchedule.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="flex items-center gap-2.5 font-medium text-primary-dark">
                  <span className={`h-2 w-2 rounded-full ${statusDot[row.status]}`} />
                  {row.day}
                </span>
                <div className="text-right">
                  {row.slots.map((slot) => (
                    <div key={slot} className="text-sm text-ink-soft">
                      {slot}
                    </div>
                  ))}
                  {row.note && <div className="text-xs font-medium text-amber-600">{row.note}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-4 flex gap-3 rounded-xl bg-primary/5 p-4 ${reveal(scheduleVisible)}`}>
            <BellIcon className="h-4 w-4 flex-shrink-0 text-primary-dark mt-0.5" />
            <p className="text-sm text-ink-soft">
              <strong className="text-primary-dark">Tip:</strong> Patients traveling from afar (Sailana, Bajna,
              Jaora, or Ratlam City) are recommended to call or WhatsApp in advance to confirm queue availability.
            </p>
          </div>
        </div>

        {/* Right: what to expect + urgent CTA */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-white p-7 shadow-card">
            <h3 className="font-display text-lg font-semibold text-primary-dark">
              What to Expect During Your Clinic Visit
            </h3>
            <ol ref={expectRef} className="mt-5 space-y-5">
              {visitExpectations.map((item, idx) => (
                <li
                  key={item.title}
                  style={{ transitionDelay: expectVisible ? `${idx * 100}ms` : "0ms" }}
                  className={`flex gap-4 ${reveal(expectVisible)}`}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-dark">{item.title}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div
            ref={ctaRef}
            className={`flex flex-col items-start justify-between gap-4 rounded-2xl bg-primary-dark p-7 text-white sm:flex-row sm:items-center ${reveal(
              ctaVisible
            )}`}
          >
            <div>
              <p className="text-sm text-white/70">Need urgent medical advice?</p>
              <p className="font-display text-lg font-semibold">Call {clinicInfo.doctorName} directly</p>
            </div>
            <Button as="a" href={`tel:${clinicInfo.phoneRaw}`} variant="primary" icon={<PhoneIcon className="h-4 w-4" />} className="bg-white text-primary-dark hover:bg-white/90">
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timings;
