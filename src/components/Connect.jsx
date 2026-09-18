import React from "react";
import { clinicInfo } from "../data/siteData";
import useReveal from "../hooks/useReveal";
import { WhatsAppIcon, FacebookIcon, InstagramIcon } from "./ui/Icons";

const Connect = () => {
  const [ref, visible] = useReveal();

  return (
    <section className="bg-surface py-12 lg:py-16">
      <div className="container-px">
        <div
          ref={ref}
          className={`mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-border bg-white px-6 py-8 text-center transition-all duration-700 ease-out sm:flex-row sm:justify-between sm:text-left ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <h3 className="font-display text-lg font-semibold text-primary-dark">Stay Connected</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Reach out on WhatsApp for the fastest response, or follow along for health tips.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${clinicInfo.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-soft transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={clinicInfo.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow on Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-soft transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={clinicInfo.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow on Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-white shadow-soft transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
