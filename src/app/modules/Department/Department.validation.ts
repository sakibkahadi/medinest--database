import { z } from 'zod';


// Define the Zod schema for the admin validation
const createDepartmentValidationSchema = z.object({
    body:z.object({
        departmentName: z.string().min(1, 'department name is required'),
        departmentDescription:z.string().min(1, 'department description is required'),
       
      })
})
const updateDepartmentSchemaValidation = z.object({
    body:z.object({
        departmentName: z.string().min(1, 'department name is required').optional(),
        departmentDescription:z.string().min(1, 'department description is required').optional(),
       
      })
})

// Export the validation schema
export const DepartmentValidation = {
  createDepartmentValidationSchema,updateDepartmentSchemaValidation
};
