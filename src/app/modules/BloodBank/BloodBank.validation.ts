import { z } from "zod";

const createBloodBankValidationSchema = z.object({
  body: z.object({
    clinicName:z.string().optional(),
    price:z.string().min(1, 'Price is required'),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]), // Optional enum field
    quantity:z.string().min(1,'quantity is required')
  }),
});

const updateBloodBankValidationSchema = z.object({
  body: z.object({

    clinicName:z.string().optional(),
    price:z.string().min(1, 'Price is required').optional(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(), // Optional enum field
    quantity:z.string().min(1,'quantity is required').optional()
  }),
});

export const BloodBankValidations = {
  createBloodBankValidationSchema,
  updateBloodBankValidationSchema,
};