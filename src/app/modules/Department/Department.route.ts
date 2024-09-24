import express from 'express'
import { DepartmentControllers } from './Department.controller';



const router = express.Router()

router.post('/', DepartmentControllers.createDepartment)
router.get('/',  DepartmentControllers.getAllDepartments)


export const DepartmentRoutes = router;