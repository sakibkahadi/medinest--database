import express from 'express'

import validateRequest from '../../middlewares/validateRequest';
import { MedicineSchemaValidation, } from './Medicine.validation';
import { MedicineControllers } from './Medicine.controllers';



const router = express.Router()
const routerCompany = express.Router()
const routerGeneric = express.Router()

// medicine
router.post('/create-medicine' ,validateRequest(MedicineSchemaValidation.createMedicineSchemaValidation), MedicineControllers.createMedicine)
router.get('/', MedicineControllers.getAllMedicine)
router.delete('/:id', MedicineControllers.deleteMedicine)
router.patch('/:id', validateRequest(MedicineSchemaValidation.updateMedicineSchemaValidation), MedicineControllers.updateMedicine)
router.get('/:id', MedicineControllers.getSingleMedicine)
//medicine company 

routerCompany.post('/create-company' ,validateRequest(MedicineSchemaValidation.createMedicineCompanyNameValidation), MedicineControllers.createMedicineCompany)
routerCompany.get('/', MedicineControllers.getAllMedicineCompany)
routerCompany.patch('/:id', validateRequest(MedicineSchemaValidation.updateMedicineCompanyNameValidation), MedicineControllers.updateMedicineCompany)
routerCompany.delete('/:id', MedicineControllers.deleteMedicineCompany)

//medicine generic name

routerGeneric.post('/create-generic-name' ,validateRequest(MedicineSchemaValidation.createGenericNameValidation), MedicineControllers.createMedicineGenericName)
routerGeneric.get('/', MedicineControllers.getAllMedicineGenericName)
routerGeneric.patch('/:id', validateRequest(MedicineSchemaValidation.updateGenericNameValidation), MedicineControllers.updateGenericName)
routerGeneric.delete('/:id', MedicineControllers.deleteGenericName)

export const MedicineRoutes = router;
export const CompanyRoutes = routerCompany;
export const GenericRoutes = routerGeneric