import { z } from 'zod';

// Define the time regex for "HH:mm" format
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// Define the Zod schema for creating a doctor
const createDoctorSchemaValidation = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required').optional(), // ObjectId reference to the User
    clinicName: z.string().min(1, 'Clinic ID is required'), // ObjectId reference to the Clinic
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    image: z.string().min(1, 'Image is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Invalid phone number format'),
    sex: z.enum(['male', 'female', 'others']).optional(),
    department: z.string().min(1, 'Department ID is required'), // ObjectId reference to the Department
    website: z.string().url('Invalid URL format').optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    experience: z.string().min(1, 'Experience is neeed'),
    consultationFee: z.string().min(1, 'Consultation fee is required'),
    rating: z.number().min(0).max(5).optional(), // Ratings are typically between 0 and 5
    review: z
      .array(
        z.object({
          patientName: z.string().min(1, 'Patient name is required'),
          rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
          comment: z.string().min(1, 'Comment is required'),
        })
      )
      .optional(),
    isBloodDonor: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    startTime: z
      .string()
      .regex(timeRegex, 'Start time must be in "HH:mm" format'),
    endTime: z
      .string()
      .regex(timeRegex, 'End time must be in "HH:mm" format'),
    intervals: z
      .array(z.string().regex(timeRegex, 'Intervals must be in "HH:mm" format'))
      .min(1, 'Intervals array cannot be empty').optional(),
  }),
});

// Define the Zod schema for updating a doctor
const updateDoctorSchemaValidation = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required').optional(),
    clinicName: z.string().optional(),
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    image: z.string().min(1, 'Image is required').optional(),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, 'Invalid phone number format')
      .optional(),
    sex: z.enum(['male', 'female', 'others']).optional(),
    department: z.string().min(1, 'Department ID is required').optional(),
    website: z.string().url('Invalid URL format').optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    experience: z.string().min(1, 'Experience is neeed').optional(),
    consultationFee: z.string().min(1, 'Consultation fee is required').optional(),
    rating: z.number().min(0).max(5).optional(),
    review: z
      .array(
        z.object({
          patientName: z.string().min(1, 'Patient name is required'),
          rating: z.number().min(1).max(5),
          comment: z.string().min(1, 'Comment is required'),
        })
      )
      .optional(),
    isBloodDonor: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    startTime: z
      .string()
      .regex(timeRegex, 'Start time must be in "HH:mm" format')
      .optional(),
    endTime: z
      .string()
      .regex(timeRegex, 'End time must be in "HH:mm" format')
      .optional(),
    intervals: z
      .array(z.string().regex(timeRegex, 'Intervals must be in "HH:mm" format'))
      .optional(),
  }),
});

// Export the validation schema
export const DoctorValidation = {
  createDoctorSchemaValidation,
  updateDoctorSchemaValidation,
};
