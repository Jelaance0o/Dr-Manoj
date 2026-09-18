import React from "react";
import { clinicAddress, clinicInfo } from "../data/siteData";
import Button from "./ui/Button";
import useReveal from "../hooks/useReveal";
import { MapPinIcon, PhoneIcon, WhatsAppIcon, ExternalLinkIcon } from "./ui/Icons";

const revealClasses = (visible) =>
  `transition-all duration-700 ease-out ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

const LocationMap = () => {
  const [headRef, headVisible] = useReveal();
  const [bodyRef, bodyVisible] = useReveal();

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Badi Sarwan, Sailana, Ratlam, Madhya Pradesh"
  )}`;

  return (
    <section id="location" className="bg-surface py-14 lg:py-18">
      <div className="container-px">
        <div ref={headRef} className={`mx-auto max-w-2xl text-center ${revealClasses(headVisible)}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-primary-dark">
            <MapPinIcon className="h-3.5 w-3.5 text-accent" />
            Visit the Clinic
          </span>
          <h2 className="mt-5 font-display text-3xl text-primary-dark sm:text-4xl">
            Clinic Address &amp; Location Map
          </h2>
          <p className="mt-4 text-ink-soft">
            Conveniently located in Badi Sarwan with easy connectivity from Sailana and Ratlam main road.
          </p>
        </div>

        <div ref={bodyRef} className={`mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[0.85fr_1.15fr] ${revealClasses(bodyVisible)}`}>
          {/* Address card */}
          <div className="rounded-2xl border border-border bg-white p-7">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPinIcon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">{clinicAddress.name}</h3>

            <div className="mt-3 text-sm leading-relaxed text-ink-soft">
              <div className="mb-1 text-xs font-semibold tracking-wide text-primary-dark">ADDRESS:</div>
              {clinicAddress.lines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 rounded-xl bg-primary/5 p-4">
              {clinicAddress.notes.map((n) => (
                <p key={n.label} className="text-[13px] leading-relaxed text-ink-soft">
                  <strong className="text-primary-dark">{n.label}</strong> {n.text}
                </p>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <a href={`tel:${clinicInfo.phoneRaw}`} className="flex items-center gap-2 text-ink-soft hover:text-primary-dark">
                <PhoneIcon className="h-4 w-4 text-primary" /> {clinicInfo.phone}
              </a>
              <a
                href={`https://wa.me/${clinicInfo.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ink-soft hover:text-primary-dark"
              >
                <WhatsAppIcon className="h-4 w-4 text-primary" /> {clinicInfo.phone}
              </a>
            </div>

            <Button
              as="a"
              href={mapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              icon={<ExternalLinkIcon className="h-4 w-4" />}
              className="mt-6 w-full"
            >
              Open Navigation in Google Maps
            </Button>
          </div>

          {/* Embedded map */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            <iframe
              title="Dr. Manoj Bandwar Clinic location map"
              src={clinicAddress.mapEmbedSrc}
              className="h-[420px] w-full lg:h-full"
              style={{ border: 0, minHeight: 380 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
