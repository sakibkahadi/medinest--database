import { z } from 'zod';

// Define the Zod schema for contact details
const contactSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Invalid phone number format')
    ,
  email: z.string().email('Invalid email format'),
  website: z.string().optional(),
});

// Define the Zod schema for location details
const locationSchema = z.object({
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  latitude: z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});

// Define the Zod schema for TClinic
const createClinicSchemaValidation = z.object({
  body: z.object({
    clinicId: z.string().optional(),
    clinicImage:z.string().optional(),
    clinicName: z.string().min(1, 'Clinic name is required'),
    contact: contactSchema,
    location: locationSchema,
  }),
});
const updateClinicSchemaValidation = z.object({
  body: z.object({
    clinicId: z.string().optional(),
    clinicImage:z.string().optional(),
    clinicName: z.string().optional(),
    contact: contactSchema.optional(),
    location: locationSchema.optional(),
  }),
});

// Export the schema
export const ClinicSchemaValidation = {
  createClinicSchemaValidation,
  updateClinicSchemaValidation,
};
