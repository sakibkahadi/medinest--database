import { z } from "zod";

const createPatientValidationSchema = z.object({
    body: z.object({
     
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      address: z.string().optional(), // Optional field
      contactNo: z.string().optional(), // Optional field
      sex: z.enum(["male", "female", "others"]).optional().optional(), // Optional field with enum validation
      birthDate: z.string().min(1, "Birth date is required").optional(), // Should validate the format separately if needed
      age: z.number().min(0, "Age must be a positive number").optional(), // Age validation
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      
    }),
  });
  export const patientValidations = {
    createPatientValidationSchema
  }