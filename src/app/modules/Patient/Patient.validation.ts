import { z } from "zod";

const createPatientValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"), // Refers to the user field in Mongoose schema
    name: z.string().min(1, "Name is required"), // Required field
    email: z.string().email("Invalid email address"), // Required and unique
    image: z.string().min(1, "Image URL is required"), // Required field
    address: z.string().optional(), // Optional field
    phoneNumber: z
      .string()
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid phone number format")
      .optional(), // Optional field with regex
    sex: z.enum(["male", "female", "others"]).optional(), // Optional enum validation
    birthDate: z
      .string()
      .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Birth date must be in DD/MM/YYYY format")
      .optional(), // Optional field with regex validation for DD/MM/YYYY
    age: z.number().min(0, "Age must be a positive number").optional(), // Optional field, validated in backend
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(), // Optional enum field
    isBloodDonor: z.boolean().optional(), // Optional boolean field
  }),
});

const updatePatientValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required").optional(), // Optional in update case
    name: z.string().min(1, "Name is required").optional(), // Optional
    email: z.string().email("Invalid email address").optional(), // Optional
    image: z.string().min(1, "Image URL is required").optional(), // Optional
    address: z.string().optional(), // Optional
    phoneNumber: z
      .string()
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid phone number format")
      .optional(), // Optional field with regex
    sex: z.enum(["male", "female", "others"]).optional(), // Optional enum validation
    birthDate: z
      .string()
      .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Birth date must be in DD/MM/YYYY format")
      .optional(), // Optional field with regex validation
    age: z.number().min(0, "Age must be a positive number").optional(), // Optional field
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(), // Optional enum field
    isBloodDonor: z.boolean().optional(), // Optional boolean field
  }),
});

export const patientValidations = {
  createPatientValidationSchema,
  updatePatientValidationSchema,
};
