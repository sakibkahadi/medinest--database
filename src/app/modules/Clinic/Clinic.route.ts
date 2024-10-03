import express from 'express'
import { ClinicControllers } from './Clinic.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ClinicSchemaValidation } from './Clinic.validation';





const router = express.Router()


router.post('/',validateRequest(ClinicSchemaValidation.createClinicSchemaValidation) ,  ClinicControllers.createClinic )
router.get('/', ClinicControllers.getAllClinic)
router.get('/:id', ClinicControllers.getAClinic)
router.patch('/:id', ClinicControllers.updateClinic)


export const ClinicRoutes = router;