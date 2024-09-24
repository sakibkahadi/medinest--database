import express from 'express'
import { NurseControllers } from './Nurse.controller';



const router = express.Router()


router.get('/', NurseControllers.getAllNurses)


export const NurseRoutes = router;