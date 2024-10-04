import express from 'express'
import { AdminControllers } from './Admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './Admin.validation';




const router = express.Router()


router.get('/',  AdminControllers.getAllAdmin )
router.get('/:id',  AdminControllers.getSingleAdmin )

router.patch('/:id',validateRequest(AdminValidation.updateAdminSchemaValidation), AdminControllers.updateAdmin )


export const AdminRoutes = router;