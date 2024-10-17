import express from 'express'
import { PatientControllers } from './Patient.controller';
import validateRequest from '../../middlewares/validateRequest';
import { patientValidations } from './Patient.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';



const router = express.Router()


router.get('/', auth(USER_ROLE.superAdmin),  PatientControllers.getAllPatient )
router.get('/:id',  PatientControllers.getSinglePatient)

router.patch('/:id',validateRequest(patientValidations.updatePatientValidationSchema), PatientControllers.updatePatient )


export const PatientRoutes = router;