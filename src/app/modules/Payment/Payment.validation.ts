import { z } from 'zod';


// Define the Zod schema for the Payment validation
const createPaymentSchemaValidation = z.object({
    body:z.object({
      
        email: z.string().email('Invalid email format'),
       patient:z.string().optional(),
       price:z.number(),
       transactionId: z.string(),
       date:z.string()
      })
})
const updatePaymentSchemaValidation = z.object({
    body:z.object({
       email: z.string().email('Invalid email format').optional(),
       patient:z.string().optional().optional(),
       price:z.number().optional(),
       transactionId: z.string().optional(),
       date:z.string().optional(),
      })
})

// Export the validation schema
export const PaymentValidation = {
  createPaymentSchemaValidation,updatePaymentSchemaValidation
};
