"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LogOut,
  Phone,
  Search,
  Trash2,
  UserRound,
  XCircle,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import {
  Appointment,
  AppointmentStatus,
  appointmentStorageKey,
  getAppointments,
  saveAppointments,
} from "@/lib/appointments";
import { isAdminAuthenticated, logoutAdmin } from "@/lib/admin-auth";

const statusOptions: { value: AppointmentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const statusStyles: Record<AppointmentStatus, string> = {
  pending: "bg-[#f1ead7] text-[#705d26]",
  confirmed: "bg-[#e2eee7] text-[#285d40]",
  completed: "bg-[#e4e7ed] text-[#3e4c64]",
  cancelled: "bg-[#f3e1df] text-[#7b3933]",
};

export default function AdminPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");
  const [loaded, setLoaded] = useState(false);
  const authorized = useSyncExternalStore(
    () => () => {},
    isAdminAuthenticated,
    () => false,
  );

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.replace("/login");
      return;
    }

    const refresh = () => {
      setAppointments(getAppointments());
      setLoaded(true);
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("appointments-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("appointments-updated", refresh);
    };
  }, [authorized, router]);

  const filteredAppointments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const matchesFilter = filter === "all" || appointment.status === filter;
      const matchesQuery =
        !normalizedQuery ||
        [appointment.name, appointment.phone, appointment.email, appointment.service]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [appointments, filter, query]);

  const counts = useMemo(
    () => ({
      total: appointments.length,
      pending: appointments.filter((item) => item.status === "pending").length,
      confirmed: appointments.filter((item) => item.status === "confirmed").length,
      completed: appointments.filter((item) => item.status === "completed").length,
    }),
    [appointments],
  );

  function updateStatus(id: string, status: AppointmentStatus) {
    const next = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status } : appointment,
    );
    setAppointments(next);
    saveAppointments(next);
  }

  function removeAppointment(id: string) {
    const appointment = appointments.find((item) => item.id === id);
    if (!appointment || !window.confirm(`Delete ${appointment.name}'s appointment?`)) return;

    const next = appointments.filter((item) => item.id !== id);
    setAppointments(next);
    saveAppointments(next);
  }

  function handleLogout() {
    logoutAdmin();
    router.replace("/login");
  }

  if (!authorized) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#2b1d17] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin border-2 border-[#c2b280] border-t-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
            Checking access
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3ede3]">
      <SiteHeader dark />

      <section className="border-b border-[#5c4033]/15 bg-[#fbf8f1]">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5c4033]">
              <ArrowLeft size={15} /> Website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center gap-2 border border-[#5c4033]/20 px-3 text-xs font-bold text-[#5c4033] transition hover:border-[#5c4033]"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Salon workspace</p>
              <h1 className="display-font mt-3 text-4xl text-[#2b1d17] sm:text-5xl">
                Appointment admin
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#75685f]">
              Review requests, confirm clients and keep each appointment moving.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "All appointments", value: counts.total, icon: CalendarDays },
            { label: "Awaiting reply", value: counts.pending, icon: Clock3 },
            { label: "Confirmed", value: counts.confirmed, icon: CheckCircle2 },
            { label: "Completed", value: counts.completed, icon: UserRound },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="border border-[#5c4033]/15 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#81736b]">{stat.label}</p>
                    <p className="display-font mt-3 text-4xl text-[#2b1d17]">{stat.value}</p>
                  </div>
                  <div className="grid h-10 w-10 place-items-center bg-[#f3ede3] text-[#5c4033]">
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-7 border border-[#5c4033]/15 bg-white">
          <div className="flex flex-col gap-4 border-b border-[#5c4033]/15 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#887a72]" size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search client, phone or service"
                className="field min-h-11 pl-10 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`h-10 px-3 text-xs font-bold capitalize transition ${
                    filter === value
                      ? "bg-[#5c4033] text-white"
                      : "border border-[#5c4033]/15 text-[#65564e] hover:border-[#5c4033]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {!loaded ? (
            <p className="p-12 text-center text-sm text-[#81736b]">Loading appointments...</p>
          ) : filteredAppointments.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <CalendarDays className="mx-auto text-[#c2b280]" size={38} />
              <h2 className="display-font mt-5 text-3xl text-[#2b1d17]">
                {appointments.length ? "No matching appointments" : "No appointments yet"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#81736b]">
                {appointments.length
                  ? "Try a different search or status filter."
                  : "New booking requests from the appointment page will appear here."}
              </p>
              {!appointments.length && (
                <Link href="/book" className="mt-6 inline-flex h-11 items-center bg-[#5c4033] px-5 text-sm font-bold text-white">
                  Open booking page
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-[#5c4033]/12">
              {filteredAppointments.map((appointment) => (
                <article key={appointment.id} className="grid gap-6 p-5 lg:grid-cols-[1.25fr_1fr_1fr_auto] lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-[#2b1d17]">{appointment.name}</h2>
                      <span className={`px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.1em] ${statusStyles[appointment.status]}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <a href={`tel:${appointment.phone}`} className="mt-2 flex items-center gap-2 text-sm text-[#6d6058]">
                      <Phone size={14} /> {appointment.phone}
                    </a>
                    <p className="mt-1 text-xs text-[#958880]">{appointment.email}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#9a8d85]">Service</p>
                    <p className="mt-2 text-sm font-semibold text-[#4d3e36]">{appointment.service}</p>
                    {appointment.notes && <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#81736b]">{appointment.notes}</p>}
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#9a8d85]">Preferred time</p>
                    <p className="mt-2 text-sm font-semibold text-[#4d3e36]">
                      {new Date(`${appointment.date}T12:00:00`).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {appointment.time}
                    </p>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-[0.08em] text-[#9a8d85]">{appointment.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={appointment.status}
                      onChange={(event) => updateStatus(appointment.id, event.target.value as AppointmentStatus)}
                      aria-label={`Update ${appointment.name}'s status`}
                      className="field min-h-10 min-w-32 py-2 text-xs font-bold"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeAppointment(appointment.id)}
                      className="grid h-10 w-10 shrink-0 place-items-center border border-[#5c4033]/15 text-[#8b4b45] transition hover:border-[#8b4b45] hover:bg-[#f8ecea]"
                      aria-label={`Delete ${appointment.name}'s appointment`}
                      title="Delete appointment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mt-5 flex items-center gap-2 text-xs text-[#81736b]">
          <XCircle size={14} />
          Appointment data is stored in this browser.
          <span className="sr-only">{appointmentStorageKey}</span>
        </div>
      </div>
    </main>
  );
}
