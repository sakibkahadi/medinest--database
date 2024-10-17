import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BloodBankValidations } from './BloodBank.validation'
import { BloodBankControllers } from './BloodBank.controller'





const router = express.Router()

// BloodBank
router.post('/create-bloodBank' ,validateRequest(BloodBankValidations.createBloodBankValidationSchema), BloodBankControllers.createBloodBank)
router.get('/', BloodBankControllers.getAllBloodBank)
router.delete('/:id', BloodBankControllers.deleteBloodBank)
router.patch('/:id', validateRequest(BloodBankValidations.updateBloodBankValidationSchema), BloodBankControllers.updateBloodBank)
router.get('/:id', BloodBankControllers.getSingleBloodBank)


export const BloodBankRoutes = router;
