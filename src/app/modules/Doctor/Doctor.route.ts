import express from 'express'
import { DoctorControllers } from './Doctor.controller';


const router = express.Router()


router.get('/',  DoctorControllers.getAllDoctors)


export const DoctorRoutes = router;