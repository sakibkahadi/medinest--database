
import { z } from "zod";
import { Status } from "./RequestAmbulance.constant";


// Regex for validating date in dd/mm/yyyy format
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const createRequestedAmbulanceValidationSchema = z.object({
  body:z.object({
    from:z.string().min(1,'Start destination is needed'),
    destination: z.string().min(1,'End destination is needed'),
    ambulance:z.string().optional(),
    patient:z.string().optional(),
    name:z.string().min(1,'Your name is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Invalid phone number format'), 
    date: z
      .string()
      .regex(dateRegex, { message: "Date must be in DD/MM/YYYY format" }),
   timeSlot: z
   .string()
   .regex(timeRegex, 'time must be in "HH:mm" format'),
    status: z.enum([...Status] as [string, ...string[]], {
      required_error: "Status is required",
    }).default('pending'),
  })
});

export const RequestedAmbulanceValidations = {
  createRequestedAmbulanceValidationSchema,
};
