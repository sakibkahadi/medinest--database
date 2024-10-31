import express from 'express'

import validateRequest from '../../middlewares/validateRequest';

import { PaymentValidation } from './Payment.validation';
import { PaymentControllers } from './Payment.controller';


const router = express.Router()


router.post('/',  validateRequest(PaymentValidation.createPaymentSchemaValidation) , PaymentControllers.createPayment   )
router.get('/', PaymentControllers.getAllPayment)

router.get('/:email', PaymentControllers.getPaymentByUser)

router.delete('/:id',  PaymentControllers.deletePayment)

export const PaymentRoutes = router;