import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClinicalProfile from "../components/ClinicalProfile";
import Stats from "../components/Stats";
import About from "../components/About";
import Treatments from "../components/Treatments";
import Testimonials from "../components/Testimonials";
import FeeStructure from "../components/FeeStructure";
import Timings from "../components/Timings";
import LocationMap from "../components/LocationMap";
import BookingForm from "../components/BookingForm";
import FAQ from "../components/FAQ";
import Connect from "../components/Connect";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";
import StatusPill from "../components/ui/StatusPill"

// Section order follows the requested mobile flow:
// Hero -> Clinical Profile (flip-in, right after Hero) -> Stats (compact on
// mobile) -> About (single paragraph) -> Treatments/Testimonials/Pricing
// (stacking cards on mobile) -> Timings -> Location -> Booking -> FAQ ->
// Connect (WhatsApp/Facebook/Instagram) -> Footer.
const Home = () => {
  return (
    <>
      <StatusPill/>
      <Navbar />
      <main>
        <Hero />
        <ClinicalProfile />
        <Stats />
        <About />
        <Treatments />
        <Testimonials />
        <FeeStructure />
        <Timings />
        <LocationMap />
        <BookingForm />
        <FAQ />
        <Connect />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
};

export default Home;
