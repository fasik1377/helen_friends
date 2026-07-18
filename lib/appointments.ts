export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
};

export const appointmentStorageKey = "helen-friends-appointments";

export const services = [
  "Silk Press & Style",
  "Shampoo, Treatment & Style",
  "Signature Haircut",
  "Custom Color",
  "Extensions / Install",
  "Bridal & Occasion Styling",
  "Consultation",
];

export const timeSlots = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "6:00 PM",
];

export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(appointmentStorageKey);
    return value ? (JSON.parse(value) as Appointment[]) : [];
  } catch {
    return [];
  }
}

export function saveAppointments(appointments: Appointment[]) {
  window.localStorage.setItem(appointmentStorageKey, JSON.stringify(appointments));
  window.dispatchEvent(new Event("appointments-updated"));
}

export function addAppointment(
  appointment: Omit<Appointment, "id" | "status" | "createdAt">,
) {
  const next: Appointment = {
    ...appointment,
    id: `HF-${Date.now().toString(36).toUpperCase()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  saveAppointments([next, ...getAppointments()]);
  return next;
}
