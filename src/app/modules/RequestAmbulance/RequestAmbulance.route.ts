import express from 'express'
import { RequestAmbulanceControllers } from './RequestAmbulance.controller';


const router = express.Router()

router.post('/', RequestAmbulanceControllers.createRequestAmbulance )
router.get('/', RequestAmbulanceControllers.getAllRequestAmbulances)


export const RequestAmbulanceRoutes = router;