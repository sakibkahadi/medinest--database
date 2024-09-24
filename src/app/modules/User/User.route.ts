import express from 'express'
import { UserControllers } from './User.controller';

import validateRequest from '../../middlewares/validateRequest';
import { patientValidations } from '../Patient/Patient.validation';


const router = express.Router()


router.get('/', UserControllers.getAllUsers)
router.post('/signIn', UserControllers.loginUser)

router.post('/create-doctor' ,UserControllers.createDoctor )
router.post('/create-nurse', UserControllers.createNurse )
router.post('/create-patient', validateRequest(patientValidations.createPatientValidationSchema), UserControllers.createPatient )


export const UserRoutes = router;