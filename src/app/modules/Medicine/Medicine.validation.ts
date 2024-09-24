import { z } from 'zod';

// Define the Zod schema for TMedicine
export const createMedicineSchemaValidation = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name is required"),
    productCompany: z.string().min(1, "Product company is required"),
    genericName: z.string().min(1, "Generic name is required"),
    productType: z.string().min(1, "Product type is required"),
    productPower: z.string().min(1, "Product power is required"),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
    shortDescription: z.string().min(1, "Short description is required"),
    longDescription: z.string().min(1, "Long description is required"),
    stripSize: z.number().min(1, "Strip size must be at least 1"),
    unitPrice: z.number().min(0, "Unit price must be a positive number"),
  })
  
})
// Export the type inferred from the Zod schema
export const MedicineSchemaValidation = {
createMedicineSchemaValidation
}
