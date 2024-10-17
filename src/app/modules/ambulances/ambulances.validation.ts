import { z } from 'zod';


// Define the Zod schema for the Ambulance validation
const createAmbulanceSchemaValidation = z.object({
    body:z.object({
        admin:z.string(),
        title:z.string().min(1,'Tittle is required'),
        description:z.string().min(1,'Description is required'),
        image1:z.string().min(1,'image 1 is required'),
        image2: z.string().min(1,'image 2 is required'),
       smallDetails:z.object({
        smallDetails1:z.string().min(1,'Details 1 is required'),
        smallDetails2: z.string().min(1,'Details 2 is required'),
        smallDetails3: z.string().min(1,'Details 3 is required'),
       })
      })
})
const updateAmbulanceSchemaValidation = z.object({
    body:z.object({
        admin:z.string().optional(),
        title:z.string().min(1,'Tittle is required').optional(),
        description:z.string().min(1,'Description is required').optional(),
        image1:z.string().min(1,'image 1 is required').optional(),
        image2: z.string().min(1,'image 2 is required').optional(),
       smallDetails:z.object({
        smallDetails1:z.string().min(1,'Details 1 is required').optional(),
        smallDetails2: z.string().min(1,'Details 2 is required').optional(),
        smallDetails3: z.string().min(1,'Details 3 is required').optional(),
       })
      })
})

// Export the validation schema
export const AmbulanceValidation = {
  createAmbulanceSchemaValidation,updateAmbulanceSchemaValidation
};
