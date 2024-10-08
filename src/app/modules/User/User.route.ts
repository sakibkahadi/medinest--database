import express from 'express'
import { UserControllers } from './User.controller';

import validateRequest from '../../middlewares/validateRequest';
import { patientValidations } from '../Patient/Patient.validation';
import { UserValidations } from './User.validation';
import { AdminValidation } from '../Admin/Admin.validation';


const router = express.Router()

router.post('/forget-password', validateRequest(UserValidations.forgetPasswordValidationSchema) , UserControllers.forgetPassword)
router.post('/verifying-otp', UserControllers.verifyingOtp)
router.post('/reset-password', UserControllers.resetPassword)
router.get('/', UserControllers.getAllUsers)
router.post('/signIn', UserControllers.loginUser)
//admin
router.post('/create-admin',validateRequest(AdminValidation.createAdminSchemaValidation), UserControllers.createAdmin)




router.post('/create-doctor' ,UserControllers.createDoctor )
router.post('/create-nurse', UserControllers.createNurse )

//patient
router.post('/create-patient', validateRequest(patientValidations.createPatientValidationSchema), UserControllers.createPatient )


export const UserRoutes = router;