import express from 'express'
import { PatientControllers } from './Patient.controller';



const router = express.Router()


router.get('/',  PatientControllers.getAllPatient )


export const PatientRoutes = router;