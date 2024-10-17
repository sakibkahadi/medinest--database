import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { MedicineServices } from "./Medicine.service"

// medicine
const createMedicine = catchAsync(async (req,res)=>{

    const result = await MedicineServices.createMedicineIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine Created Successfully',
        data:result
    })
})
const getAllMedicine = catchAsync(async (req,res)=>{

    const result = await MedicineServices.getAllMedicineFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine are  retrieve Successfully',
        data:result
    })
})
const getSingleMedicine = catchAsync(async (req,res)=>{
const {id} = req.params
    const result = await MedicineServices.getSingleMedicineFromDb(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine is  retrieve Successfully',
        data:result
    })
})

const updateMedicine = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await MedicineServices.updateMedicineIntoDB(id, req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Medicine  updated Successfully',
            data:result
        })
    })
const deleteMedicine = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await MedicineServices.deleteMedicineFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Medicine deleted Successfully',
            data:result
        })
    })

// medicine company
const createMedicineCompany = catchAsync(async (req,res)=>{

    const result = await MedicineServices.createMedicineCompanyIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine company Created Successfully',
        data:result
    })
})
const updateMedicineCompany = catchAsync(async (req,res)=>{
const {id} = req.params
    const result = await MedicineServices.updateMedicineCompanyIntoDB(id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine company updated Successfully',
        data:result
    })
})
const deleteMedicineCompany = catchAsync(async (req,res)=>{
const {id} = req.params
    const result = await MedicineServices.deleteMedicineCompanyFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine company deleted Successfully',
        data:result
    })
})

const getAllMedicineCompany = catchAsync(async (req,res)=>{

    const result = await MedicineServices.getAllMedicineCompanyFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine companies  retrieve Successfully',
        data:result
    })
})
// medicine generic name
const createMedicineGenericName = catchAsync(async (req,res)=>{

    const result = await MedicineServices.createMedicineGenericNameIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine generic name  Created Successfully',
        data:result
    })
})
const getAllMedicineGenericName= catchAsync(async (req,res)=>{

    const result = await MedicineServices.getAllMedicineGenericNameFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Medicine generic name are  retrieve Successfully',
        data:result
    })
})

const updateGenericName = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await MedicineServices.updateGenericNameIntoDB(id, req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'generic name updated Successfully',
            data:result
        })
    })
    const deleteGenericName = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await MedicineServices.deleteGenericFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'generic name deleted Successfully',
            data:result
        })
    })

export const MedicineControllers = {
    createMedicine, updateMedicine, getSingleMedicine, getAllMedicine, createMedicineCompany, getAllMedicineCompany, createMedicineGenericName, getAllMedicineGenericName, updateMedicineCompany, deleteMedicineCompany, updateGenericName, deleteGenericName, deleteMedicine
}