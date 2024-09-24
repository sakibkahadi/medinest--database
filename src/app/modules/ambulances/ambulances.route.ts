import express from 'express'
import { ambulanceControllers } from './ambulances.controller';


const router = express.Router()

router.post('/', ambulanceControllers.createAmbulance)
router.get('/',ambulanceControllers.getAllAmbulances)


export const AmbulanceRoutes = router;