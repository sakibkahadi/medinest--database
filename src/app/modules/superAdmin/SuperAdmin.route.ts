import express from 'express'
import { SuperAdminControllers } from './Super.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SuperAdminValidation } from './SuperAdmin.validation'

const router = express.Router()


router.get('/',  SuperAdminControllers.getAllSuperAdmin)
router.get('/:id',  SuperAdminControllers.getSingleSuperAdmin )
router.delete('/:id', SuperAdminControllers.deleteSuperAdmin)
router.patch('/:id',validateRequest(SuperAdminValidation.updateSuperAdminSchemaValidation), SuperAdminControllers.updateSuperAdmin )


export const SuperAdminRoutes = router;