import express from 'express'
import { ambulanceControllers } from './ambulances.controller';

import { USER_ROLE } from '../User/User.constant';
import validateRequest from '../../middlewares/validateRequest';
import { AmbulanceValidation } from './ambulances.validation';
import { auth } from '../../middlewares/auth';


const router = express.Router()

router.post('/',auth(USER_ROLE.superAdmin), validateRequest(AmbulanceValidation.createAmbulanceSchemaValidation), ambulanceControllers.createAmbulance)
router.get('/',ambulanceControllers.getAllAmbulances)
router.get('/:id',ambulanceControllers.getSingleAmbulance)
router.delete('/:id',ambulanceControllers.deleteAmbulance)
router.patch('/:id', validateRequest(AmbulanceValidation.updateAmbulanceSchemaValidation),ambulanceControllers.updateAmbulance)


export const AmbulanceRoutes = router;