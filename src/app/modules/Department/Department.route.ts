import express from 'express'
import { DepartmentControllers } from './Department.controller';
import validateRequest from '../../middlewares/validateRequest';
import { DepartmentValidation } from './Department.validation';



const router = express.Router()

router.post('/', validateRequest(DepartmentValidation.createDepartmentValidationSchema), DepartmentControllers.createDepartment)
router.get('/',  DepartmentControllers.getAllDepartments)

router.patch('/:id', validateRequest(DepartmentValidation.updateDepartmentSchemaValidation), DepartmentControllers.updateDepartment)
router.delete('/:id', DepartmentControllers.deleteDepartment)
export const DepartmentRoutes = router;