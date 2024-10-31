import { z } from 'zod';
const positiveDecimalRegex = /^[+]?\d*\.?\d+$/;
// medicine validation
export const createMedicineSchemaValidation = z.object({
  body: z.object({
    admin:z.string().optional(),
    productImage:z.string().min(1, "Product Image is required"),
    productName: z.string().min(1, "Product name is required"),
    productCompany: z.string().min(1, "Product company is required"),
    genericName: z.string().min(1, "Generic name is required"),
    productType: z.string().min(1, "Product type is required"),
    productPower: z.string().min(1, "Product power is required"),
    isAvailable: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
    shortDescription: z.string().min(1, "Short description is required"),
    quantity: z.number().min(1, 'Quantity is needed'),
    longDescription: z.string().min(1, "Long description is required"),
    stripSize: z
    .string()
    .regex(positiveDecimalRegex, "Strip size must be a positive number")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 1, {
      message: "Strip size must be at least 1",
    }),
  
  unitPrice: z
    .string()
    .regex(positiveDecimalRegex, "Unit price must be a positive number")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, {
      message: "Unit price must be a positive number",
    }),
  })
  
})
export const updateMedicineSchemaValidation = z.object({
  body: z.object({
    admin:z.string().optional(),
    productImage:z.string().min(1, "Product Image is required").optional(),
    productName: z.string().min(1, "Product name is required").optional(),
    productCompany: z.string().min(1, "Product company is required").optional(),
    genericName: z.string().min(1, "Generic name is required").optional(),
    productType: z.string().min(1, "Product type is required").optional(),
    productPower: z.string().min(1, "Product power is required").optional(),
    isAvailable: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
    shortDescription: z.string().min(1, "Short description is required").optional(),
    quantity: z.number().optional(),
    longDescription: z.string().min(1, "Long description is required").optional(),
    stripSize: z
    .string()
    .regex(positiveDecimalRegex, "Strip size must be a positive number")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 1, {
      message: "Strip size must be at least 1",
    }).optional(),

  
  unitPrice: z
    .string()
    .regex(positiveDecimalRegex, "Unit price must be a positive number")
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, {
      message: "Unit price must be a positive number",
    }).optional(),
  })
  
})
// medicine company validation
export const createMedicineCompanyNameValidation=z.object({
  body:z.object({
    companyName:z.string().min(1, "company name is required")
  })
})
export const updateMedicineCompanyNameValidation=z.object({
  body:z.object({
    companyName:z.string().min(1, "company name is required").optional()
  })
})

//medicine generic name Validation
export const createGenericNameValidation=z.object({
  body:z.object({
     genericName:z.string().min(1, "generic name is required")
  })
})
export const updateGenericNameValidation=z.object({
  body:z.object({
     genericName:z.string().min(1, "generic name is required").optional()
  })
})



// Export the type inferred from the Zod schema
export const MedicineSchemaValidation = {
createMedicineSchemaValidation,updateMedicineSchemaValidation,createMedicineCompanyNameValidation,updateMedicineCompanyNameValidation, createGenericNameValidation,updateGenericNameValidation
}
