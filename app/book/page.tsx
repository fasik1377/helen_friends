"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  Clock3,
  MapPin,
  Phone,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { addAppointment, services, timeSlots } from "@/lib/appointments";

type Confirmation = {
  id: string;
  name: string;
  date: string;
  time: string;
  service: string;
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  notes: "",
};

export default function BookPage() {
  const [form, setForm] = useState(initialForm);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const minimumDate = useMemo(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    return new Date(now.getTime() - offset * 60_000).toISOString().split("T")[0];
  }, []);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const appointment = addAppointment(form);
    setConfirmation({
      id: appointment.id,
      name: appointment.name,
      date: appointment.date,
      time: appointment.time,
      service: appointment.service,
    });
    setForm(initialForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#fbf8f1]">
      <SiteHeader dark />

      <section className="bg-[#2b1d17] text-white">
        <div className="mx-auto grid max-w-[1440px] items-stretch lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <Link
              href="/"
              className="mb-10 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c2b280]"
            >
              <ArrowLeft size={15} /> Back to salon
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c2b280]">
              Reserve your time
            </p>
            <h1 className="display-font mt-4 max-w-xl text-5xl leading-[0.98] sm:text-6xl">
              Let’s plan your next look.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
              Tell us what you have in mind and choose your preferred time. We
              will confirm your appointment by phone or email.
            </p>

            <div className="mt-10 grid gap-5 border-t border-white/15 pt-7 text-sm text-white/72">
              <a href="tel:+17203155051" className="flex items-center gap-3">
                <Phone size={18} className="text-[#c2b280]" />
                (720)-315-5051
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-[#c2b280]" />
                1074 South Ironton St, Aurora, CO 80012
              </p>
              <p className="flex items-center gap-3">
                <Clock3 size={18} className="text-[#c2b280]" />
                Monday - Saturday, 9:00 AM - 7:00 PM
              </p>
            </div>
          </div>
          <div className="relative min-h-[340px] lg:min-h-[690px]">
            <Image
              src="/images/hair4.jpg"
              alt="Bridal styling by Helen Friends Hair Salon"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b1d17]/30 to-transparent lg:from-[#2b1d17]/55" />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {confirmation ? (
            <div className="border border-[#5c4033]/18 bg-white p-7 shadow-[0_22px_60px_rgba(92,64,51,0.1)] sm:p-12">
              <div className="grid h-14 w-14 place-items-center bg-[#5c4033] text-white">
                <CalendarCheck size={25} />
              </div>
              <p className="eyebrow mt-8">Request received</p>
              <h2 className="display-font mt-3 text-4xl text-[#2b1d17] sm:text-5xl">
                Thank you, {confirmation.name}.
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-[#6d6058]">
                Your request for <strong>{confirmation.service}</strong> on{" "}
                <strong>
                  {new Date(`${confirmation.date}T12:00:00`).toLocaleDateString(
                    "en-US",
                    { weekday: "long", month: "long", day: "numeric", year: "numeric" },
                  )}
                </strong>{" "}
                at <strong>{confirmation.time}</strong> has been saved. We will
                contact you to confirm.
              </p>
              <p className="mt-5 inline-block bg-[#f3ede3] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#5c4033]">
                Reference {confirmation.id}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  className="h-12 bg-[#5c4033] px-6 text-sm font-bold text-white transition hover:bg-[#3f2b22]"
                >
                  Book another appointment
                </button>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center border border-[#5c4033]/25 px-6 text-sm font-bold text-[#5c4033]"
                >
                  Return home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="eyebrow">Appointment details</p>
                <h2 className="display-font mt-3 text-4xl text-[#2b1d17] sm:text-5xl">
                  Find your time.
                </h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-x-6 gap-y-5 border border-[#5c4033]/18 bg-white p-6 shadow-[0_22px_60px_rgba(92,64,51,0.08)] sm:grid-cols-2 sm:p-10"
              >
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="field"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
                  Phone number
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="field"
                    placeholder="(720) 555-0123"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35] sm:col-span-2">
                  Email address
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="field"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35] sm:col-span-2">
                  Service
                  <select
                    required
                    value={form.service}
                    onChange={(event) => updateField("service", event.target.value)}
                    className="field"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
                  Preferred date
                  <input
                    required
                    type="date"
                    min={minimumDate}
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    className="field"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35]">
                  Preferred time
                  <select
                    required
                    value={form.time}
                    onChange={(event) => updateField("time", event.target.value)}
                    className="field"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-bold text-[#4c3d35] sm:col-span-2">
                  Notes <span className="font-normal text-[#81736b]">(optional)</span>
                  <textarea
                    value={form.notes}
                    onChange={(event) => updateField("notes", event.target.value)}
                    className="field min-h-32 resize-y"
                    placeholder="Tell us about your current hair, desired look, or anything we should know."
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex h-13 w-full items-center justify-center gap-3 bg-[#5c4033] px-6 text-sm font-bold text-white transition hover:bg-[#3f2b22]"
                  >
                    Request appointment <Check size={17} />
                  </button>
                  <p className="mt-4 text-center text-xs leading-5 text-[#81736b]">
                    Your appointment is pending until confirmed by the salon.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
