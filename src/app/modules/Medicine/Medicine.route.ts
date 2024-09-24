import express from 'express'

import validateRequest from '../../middlewares/validateRequest';
import { MedicineSchemaValidation, } from './Medicine.validation';
import { MedicineControllers } from './Medicine.controllers';



const router = express.Router()

router.post('/' ,validateRequest(MedicineSchemaValidation.createMedicineSchemaValidation), MedicineControllers.createMedicine)


export const MedicineRoutes = router;