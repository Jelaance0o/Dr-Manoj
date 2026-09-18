import React, { useState } from "react";
import { clinicInfo } from "../data/siteData";
import Button from "./ui/Button";
import useReveal from "../hooks/useReveal";
import { CalendarIcon, SendIcon, WhatsAppIcon } from "./ui/Icons";

const initialState = {
  name: "",
  phone: "",
  age: "",
  gender: "Male",
  mode: "In-Clinic Visit (Badi Sarwan)",
  slot: "Morning Session (09:30 AM – 01:30 PM)",
  date: "",
  complaints: "",
};

const BookingForm = () => {
  const [cardRef, cardVisible] = useReveal();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Patient name is required.";
    if (!form.phone.trim() || !/^[0-9+\s-]{7,15}$/.test(form.phone.trim()))
      next.phone = "Enter a valid WhatsApp/mobile number.";
    if (!form.age.trim()) next.age = "Age is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildWhatsAppMessage = () =>
    encodeURIComponent(
      `Appointment Request\n` +
        `Patient Name: ${form.name}\n` +
        `Mobile: ${form.phone}\n` +
        `Age: ${form.age}${form.gender ? ` (${form.gender})` : ""}\n` +
        `Mode: ${form.mode}\n` +
        `Preferred Slot: ${form.slot}\n` +
        `Preferred Date: ${form.date || "Not specified"}\n` +
        `Complaints: ${form.complaints || "Not specified"}`
    );

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setConfirmed(true);
  };

  const handleWhatsAppBook = () => {
    if (!validate()) return;
    window.open(`https://wa.me/${clinicInfo.phoneRaw}?text=${buildWhatsAppMessage()}`, "_blank", "noreferrer");
  };

  return (
    <section id="booking" className="bg-paper py-14 lg:py-18">
      <div className="container-px">
        <div
          ref={cardRef}
          className={`mx-auto max-w-3xl rounded-2xl border border-border bg-white p-7 shadow-card sm:p-10 transition-all duration-700 ease-out ${
            cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mx-auto max-w-xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-1.5 text-xs font-semibold text-primary-dark">
              <CalendarIcon className="h-3.5 w-3.5 text-accent" />
              Book Consultation
            </span>
            <h2 className="mt-5 font-display text-2xl text-primary-dark sm:text-3xl">
              Schedule an Appointment with {clinicInfo.doctorName}
            </h2>
            <p className="mt-3 text-sm text-ink-soft">
              Fill in your details below. You can send this request directly to Dr. Bandwar via WhatsApp or lock
              your in-clinic slot.
            </p>
          </div>

          {confirmed && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
              Thank you, {form.name.split(" ")[0]}. Your appointment request has been noted — Dr. Bandwar's clinic
              will confirm your slot shortly on {form.phone}.
            </div>
          )}

          <form className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2" onSubmit={handleConfirm} noValidate>
            <Field label="Patient Name" required error={errors.name}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                className={inputClasses(errors.name)}
              />
            </Field>

            <Field label="WhatsApp / Mobile Number" required error={errors.phone}>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9826012345"
                className={inputClasses(errors.phone)}
              />
            </Field>

            <Field label="Age" required error={errors.age}>
              <input
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 34"
                className={inputClasses(errors.age)}
              />
            </Field>

            <Field label="Gender">
              <select name="gender" value={form.gender} onChange={handleChange} className={inputClasses()}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Consultation Mode" full>
              <select name="mode" value={form.mode} onChange={handleChange} className={inputClasses()}>
                <option>In-Clinic Visit (Badi Sarwan)</option>
                <option>Telephonic Consultation</option>
                <option>WhatsApp Consultation</option>
              </select>
            </Field>

            <Field label="Preferred Slot">
              <select name="slot" value={form.slot} onChange={handleChange} className={inputClasses()}>
                <option>Morning Session (09:30 AM – 01:30 PM)</option>
                <option>Evening Session (04:30 PM – 08:00 PM)</option>
                <option>Sunday Session (10:00 AM – 01:00 PM)</option>
              </select>
            </Field>

            <Field label="Preferred Date">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClasses()}
              />
            </Field>

            <Field label="Chief Complaints / Health Concerns (briefly describe)" full>
              <textarea
                name="complaints"
                value={form.complaints}
                onChange={handleChange}
                rows={4}
                placeholder="Describe symptoms (e.g. Skin allergy for 6 months, joint pain, migraine, digestive burning, etc.)"
                className={`${inputClasses()} resize-y`}
              />
            </Field>

            <div className="sm:col-span-2 mt-1 flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" icon={<SendIcon className="h-4 w-4" />} className="flex-1">
                Confirm Appointment
              </Button>
              <Button
                type="button"
                onClick={handleWhatsAppBook}
                variant="dark"
                icon={<WhatsAppIcon className="h-4 w-4" />}
                className="flex-1"
              >
                Book Instantly on WhatsApp
              </Button>
            </div>

            <p className="sm:col-span-2 text-center text-xs text-ink-soft">
              * All medical communications are confidential. By booking, you can receive quick appointment updates
              via WhatsApp or call.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

const inputClasses = (error) =>
  `w-full rounded-lg border ${
    error ? "border-red-400" : "border-border"
  } bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-primary`;

const Field = ({ label, children, required, error, full }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <label className="mb-1.5 block text-[11px] font-semibold tracking-wide text-ink-soft">
      {label.toUpperCase()} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default BookingForm;
