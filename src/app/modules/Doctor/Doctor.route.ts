import express from 'express'
import { DoctorControllers } from './Doctor.controller';


const router = express.Router()


router.get('/',  DoctorControllers.getAllDoctors)
router.delete('/:id', DoctorControllers.deleteDoctor)
router.get('/:clinicId', DoctorControllers.getDoctorsByClinic)

export const DoctorRoutes = router;