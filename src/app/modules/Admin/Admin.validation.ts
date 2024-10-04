import { z } from 'zod';


// Define the Zod schema for the admin validation
const createAdminSchemaValidation = z.object({
    body:z.object({
        user: z.string().min(1, 'User ID is required').optional(), 
        clinicName: z.string(), 
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email format'),
        image: z.string().min(1, 'Image is required'),
       
        phoneNumber: z.string().min(1, "Phone number is required").regex(/^(?:\+8801|01)[3-9]\d{8}$/
, "Invalid phone number format"),
        sex: z.enum(['male', 'female', 'others']),
      
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        isBloodDonor: z.boolean().optional(),
        isDeleted: z.boolean().optional()
      })
})
const updateAdminSchemaValidation = z.object({
    body:z.object({
        user: z.string().min(1, 'User ID is required').optional(), 
        clinicName: z.string().optional(), 
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email format').optional(),
        image: z.string().min(1, 'Image is required').optional(),
        
        phoneNumber: z.string().min(1, "Phone number is required").regex(/^(?:\+8801|01)[3-9]\d{8}$/
, "Invalid phone number format").optional(),
        sex: z.enum(['male', 'female', 'others']).optional(),
       
        bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        isBloodDonor: z.boolean().optional(),
        isDeleted: z.boolean().optional()
      })
})

// Export the validation schema
export const AdminValidation = {
  createAdminSchemaValidation,updateAdminSchemaValidation
};
