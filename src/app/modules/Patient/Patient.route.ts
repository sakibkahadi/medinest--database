import express from 'express'
import { PatientControllers } from './Patient.controller';
import validateRequest from '../../middlewares/validateRequest';
import { patientValidations } from './Patient.validation';



const router = express.Router()


router.get('/',  PatientControllers.getAllPatient )
router.get('/:id',  PatientControllers.getSinglePatient)

router.patch('/:id',validateRequest(patientValidations.updatePatientValidationSchema), PatientControllers.updatePatient )


export const PatientRoutes = router;