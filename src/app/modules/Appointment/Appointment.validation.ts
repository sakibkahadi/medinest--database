import { z } from "zod";
import { Status } from "./Appointment.constant";

// Regex for validating date in dd/mm/yyyy format
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

export const createAppointmentValidationSchema = z.object({
  body:z.object({
    doctorName: z.string(),
    patientName: z.string().optional(),
    patientEmail: z.string().min(1, 'email is required'),
    appointmentDate: z
      .string()
      .regex(dateRegex, { message: "Date must be in DD/MM/YYYY format" }),
    appointmentTime: z.string().nonempty({ message: "Time slot is required" }),
    status: z.enum([...Status] as [string, ...string[]], {
      required_error: "Status is required",
    }).default('pending'),
  })
});

export const AppointmentValidations = {
  createAppointmentValidationSchema,
};
