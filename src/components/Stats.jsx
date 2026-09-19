import React from "react";
import CountUp from "react-countup";
import { heroStats } from "../data/siteData";
import useReveal from "../hooks/useReveal";

const Stats = () => {
  const [ref, visible] = useReveal();

  return (
    <section className="bg-paper py-4 lg:py-6">
      <div className="container-px">
        <div
          ref={ref}
          className={`mx-auto max-w-3xl transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Mobile */}
          <div className="flex items-center justify-between divide-x divide-border rounded-2xl border border-border bg-white px-2 py-4 sm:hidden">
            {heroStats.map((stat) => {
              // Remove comma, then extract the number
              const number = Number(
                stat.value.replace(/,/g, "").replace(/[^0-9.]/g, ""),
              );

              // Keep +, %, etc.
              const suffix = stat.value.replace(/[0-9.,]/g, "");

              return (
                <div key={stat.label} className="flex-1 px-2 text-center">
                  <div className="font-display text-lg font-semibold leading-tight text-primary-dark">
                    <CountUp
                      start={0}
                      end={number}
                      duration={4}
                      separator=","
                      suffix={suffix}
                    />
                  </div>

                  <div className="mt-0.5 text-[10px] leading-tight text-ink-soft">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet / Desktop */}
          <div className="hidden grid-cols-3 gap-4 sm:grid">
            {heroStats.map((stat) => {
              const number = Number(
                stat.value.replace(/,/g, "").replace(/[^0-9.]/g, ""),
              );

              const suffix = stat.value.replace(/[0-9.,]/g, "");

              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-white px-5 py-5 text-center"
                >
                  <div className="font-display text-2xl font-semibold text-primary-dark sm:text-3xl">
                    <CountUp
                      start={0}
                      end={number}
                      duration={4}
                      separator=","
                      suffix={suffix}
                    />
                  </div>

                  <div className="mt-1 text-xs leading-snug text-ink-soft">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
