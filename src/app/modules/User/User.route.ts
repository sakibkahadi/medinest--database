import express from 'express'
import { UserControllers } from './User.controller';
import { UserSchemaValidation } from './User.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router()

router.post('/createUser', UserControllers.createUser)
router.get('/', UserControllers.getAllUsers)
router.post('/signIn', UserControllers.loginUser)

router.post('/create-doctor' ,UserControllers.createDoctor )


export const UserRoutes = router;