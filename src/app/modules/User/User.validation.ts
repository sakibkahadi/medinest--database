import { z } from 'zod';

// Define the Zod schema for User
export const createUserSchemaValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(1, "Name is required"),
    image: z.string().min(1, "Image is required"),
    role: z.enum(['admin', 'patient', 'doctor']).default('patient'),
    status: z.enum(['active', 'blocked', 'in-progress']).default('active'),
    isDeleted: z.boolean().default(false),
    notification: z.array(z.string()).default([]),
    seenNotification: z.boolean().default(false),
    bloodDonor: z.boolean().default(false),
  }),
});

// Export the type inferred from the Zod schema
export const UserSchemaValidation = {
  createUserSchemaValidation,
};
