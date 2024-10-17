import express from 'express'
import { UserControllers } from './User.controller';

import validateRequest from '../../middlewares/validateRequest';
import { patientValidations } from '../Patient/Patient.validation';
import { UserValidations } from './User.validation';
import { AdminValidation } from '../Admin/Admin.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './User.constant';
import { DoctorValidation } from '../Doctor/Doctor.validation';
import { SuperAdminValidation } from '../superAdmin/SuperAdmin.validation';


const router = express.Router()

router.post('/forget-password', validateRequest(UserValidations.forgetPasswordValidationSchema) , UserControllers.forgetPassword)
router.post('/verifying-otp', UserControllers.verifyingOtp)
router.post('/reset-password', UserControllers.resetPassword)
router.get('/',  UserControllers.getAllUsers)
router.get('/:email', UserControllers.getSingleUser)
router.patch('/', auth(USER_ROLE.superAdmin), UserControllers.updateSingleUser)



router.post('/signIn', UserControllers.loginUser)
//admin
router.post('/create-admin', auth(USER_ROLE.superAdmin), validateRequest(AdminValidation.createAdminSchemaValidation), UserControllers.createAdmin)

router.post('/create-superAdmin',  validateRequest(SuperAdminValidation.createSuperAdminSchemaValidation), UserControllers.createSuperAdmin)




router.post('/create-doctor', auth(USER_ROLE.admin) ,validateRequest(DoctorValidation.createDoctorSchemaValidation) ,UserControllers.createDoctor )


//patient
router.post('/create-patient', validateRequest(patientValidations.createPatientValidationSchema), UserControllers.createPatient )


export const UserRoutes = router;