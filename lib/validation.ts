import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  numberOfPeople: z.coerce.number().min(2, "Must be at least 2 people"),
  dates: z.string().min(1, "Dates are required"),
  message: z.string().min(1, "Message is required"),
});

export const bookingFormSchema = z.object({
  tour: z.string().min(1, "Tour selection is required"),
  adults: z.coerce.number().min(1, "At least 1 adult is required"),
  childrenFree: z.coerce.number().min(0, "Invalid number of children"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  total: z.coerce.number().min(0, "Invalid total"),
  guestName: z.string().min(1, "Guest name is required"),
  guestEmail: z.string().email("Invalid email address"),
  guestPhone: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type BookingFormData = z.infer<typeof bookingFormSchema>;
