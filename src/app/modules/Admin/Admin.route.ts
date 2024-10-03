import express from 'express'
import { AdminControllers } from './Admin.controller';




const router = express.Router()


router.get('/',  AdminControllers.getAllAdmin )


export const AdminRoutes = router;