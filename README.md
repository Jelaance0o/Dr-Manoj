# Dr. Manoj Bandwar — Classical Homeopathy Clinic Website

## Overview

A premium, production-quality React recreation of Dr. Manoj Bandwar's classical homeopathy clinic website
(Badi Sarwan, Ratlam, M.P.). The rebuild preserves every section, all original copy, navigation, and
functionality from the reference design, while upgrading typography, spacing, color system, motion, and overall
visual polish to an agency-quality standard.

Sections included: sticky navbar with clinic-status top bar, hero with doctor profile card, about/credentials,
6-card treatments grid, 3-tier fee structure, clinic timings + visit expectations, patient testimonials,
address + embedded Google Map, an appointment booking form (with WhatsApp deep-link submission), an FAQ
accordion, and a full footer — plus a floating WhatsApp chat button.

## Features

- Fully responsive layout (mobile, tablet, laptop, desktop, large desktop)
- Smooth inertia scrolling via Lenis, synced to GSAP's ticker
- Scroll-triggered GSAP reveal animations for every section, plus one orchestrated hero entrance sequence
- Animated mobile menu and FAQ accordion
- Working appointment form with client-side validation and a "Book Instantly on WhatsApp" deep link that
  pre-fills the patient's details as a WhatsApp message to the clinic
- Embedded Google Map (no API key required — public embed URL) plus an "Open Navigation" deep link
- Centralized CSS custom-property design system (colors, radii, container width)
- `prefers-reduced-motion` respected throughout (Lenis, GSAP, CSS)
- Semantic HTML, visible focus states, alt/aria labeling on icon-only controls

## Tech Stack

- React 18 + Vite (no Next.js, no TypeScript)
- Tailwind CSS (utility layout/responsiveness) + CSS custom properties (design tokens)
- GSAP + ScrollTrigger (scroll-triggered reveals, hero timeline)
- Lenis (smooth scrolling, synced with GSAP's ticker)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # One component per section (Navbar, Hero, About, Treatments,
│                         # FeeStructure, Timings, Testimonials, LocationMap, BookingForm,
│                         # FAQ, Footer, FloatingButtons) + ui/ (Button, SectionBadge, Icons)
├── data/
│   └── siteData.js      # All site copy/content in one place — edit here, not in JSX
├── hooks/
│   └── useLenis.js      # Smooth-scroll setup, GSAP ticker sync, anchor-link handling
├── pages/
│   └── Home.jsx          # Composes every section in order
├── App.jsx               # Initializes Lenis, renders Home
├── main.jsx               # React root
└── index.css               # Design tokens (:root variables), base styles, CSS animations
```

## Animation System

- **Lenis** provides the inertia/easing for all scrolling. It's initialized once in `useLenis.js` and driven
  by `gsap.ticker` (rather than its own `requestAnimationFrame` loop) so scroll position and GSAP-driven
  animations never fall out of sync. The hook also intercepts `<a href="#...">` clicks site-wide for smooth
  anchor navigation with a navbar-height offset.
- **GSAP + ScrollTrigger** power every section's reveal: content fades/slides in once it's ~75–85% into the
  viewport, using `gsap.context()` inside `useLayoutEffect` so triggers are automatically created and cleaned
  up per component (no duplicate ScrollTriggers on re-render, no leaks on unmount).
- The **hero** gets one deliberate, orchestrated load-in timeline (badge → heading lines → copy → stats →
  CTAs → trust points → profile card) rather than scroll triggers, since it's visible on first paint.
- **CSS animations** (`index.css`) handle small always-on decorative motion — the "clinic open" pulsing dot,
  the floating detail chip on the hero card, the WhatsApp button's pulse ring, background blur drift — since
  GSAP would be overkill for these.
- All motion respects `prefers-reduced-motion: reduce` (global CSS override + a check inside `useLenis`).

## Adding the Doctor's Real Photo

The hero photo is wired up to look for a real image at `public/doctor-hero.jpg`. Drop the actual photo
in as `public/doctor-hero.jpg` (any JPG works — it's referenced by the exact filename) and it will appear
automatically, cropped into the rounded portrait frame. If that file isn't present, the `<img>` fails to
load and an `onError` handler swaps in a brand-consistent illustrated placeholder instead of a broken-image
icon — so the hero never looks broken either way.

## Customization

- **Colors** — edit the CSS custom properties at the top of `src/index.css` (`--color-primary`,
  `--color-accent`, `--color-paper`, etc.). Tailwind's `primary`, `accent`, `ink`, `paper`, etc. utility
  classes read from these same variables (see `tailwind.config.js`), so a change in one place updates the
  whole site.
- **Typography** — display font is "Fraunces" (serif), body font is "Inter" (sans), loaded via Google Fonts
  in `index.html` and mapped in `tailwind.config.js` under `fontFamily.display` / `fontFamily.body`.
- **Spacing / radii** — `--radius-sm/md/lg/xl` in `index.css`; section vertical rhythm uses Tailwind's
  `py-20 lg:py-28` convention consistently across sections.
- **Content** — all clinic copy (treatments, fee plans, FAQs, testimonials, schedule, footer links, phone
  number) lives in `src/data/siteData.js`. Update the data there; no JSX edits needed for text changes.
- **Animations** — GSAP timelines and ScrollTrigger configs live at the top of each component file; CSS
  keyframes live in `index.css`.

## Responsive Design

Built mobile-first with Tailwind's `sm:` / `md:` / `lg:` breakpoints. Grids collapse from 3/2-column layouts
down to a single column on small screens, the navbar becomes a slide-down mobile menu below `lg:`, hero and
card typography scale down responsively, and every section uses the shared `.container-px` utility for
consistent left/right edges and container width (capped at `--container-width: 1280px`) across all screen
sizes. No fixed pixel widths are used for layout containers.

## Deployment

1. `npm run build` — outputs a static bundle to `dist/`.
2. Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, etc.).
3. No environment variables or backend are required — the booking form submits via a WhatsApp deep link
   (`wa.me`), and the map uses a public Google Maps embed URL.
