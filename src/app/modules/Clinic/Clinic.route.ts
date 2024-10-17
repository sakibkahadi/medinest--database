import express from 'express'
import { ClinicControllers } from './Clinic.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ClinicSchemaValidation } from './Clinic.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';





const router = express.Router()


router.post('/', auth(USER_ROLE.superAdmin), validateRequest(ClinicSchemaValidation.createClinicSchemaValidation) ,  ClinicControllers.createClinic )
router.get('/', ClinicControllers.getAllClinic)
router.get('/:id', ClinicControllers.getAClinic)
router.patch('/:id/admins', ClinicControllers.updateClinic)
//get clinic by id
router.get('/:adminId/admins', ClinicControllers.getClinicByAdmin)


router.delete('/:id', auth(USER_ROLE.superAdmin), ClinicControllers.deleteClinic)

export const ClinicRoutes = router;