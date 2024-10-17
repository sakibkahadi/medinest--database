import express from 'express'
import { RequestAmbulanceControllers } from './RequestAmbulance.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RequestedAmbulanceValidations } from './RequestAmbulance.validation';


const router = express.Router()

router.post('/', validateRequest(RequestedAmbulanceValidations.createRequestedAmbulanceValidationSchema), RequestAmbulanceControllers.createRequestAmbulance )
router.get('/', RequestAmbulanceControllers.getAllRequestAmbulances)


export const RequestAmbulanceRoutes = router;