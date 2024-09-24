import {  z } from "zod";
import { Status } from "./Appointment.constant";
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

export const createAppointmentValidationSchema = z.object({
  doctorId: z.string(),
  patientId: z.string(),
  appointmentDate: z.string()
  .regex(dateRegex, { message: "Date must be in MM/DD/YYYY format" }),
  timeSlot: z.string().nonempty({ message: "Time slot is required" }),
  status: z.enum([...Status] as [string, ...string[]], { required_error: "Status is required" }),
});

export const AppointmentValidations = {
createAppointmentValidationSchema
}
