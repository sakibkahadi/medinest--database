import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ClinicServices } from "./Clinic.service"

const createClinic = catchAsync(async (req,res)=>{
    
    const result = await ClinicServices.createClinicIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Clinic created Successfully',
        data:result
    })
})
const getAllClinic = catchAsync(async (req,res)=>{
    
    const result = await ClinicServices.getAllClinicFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Clinics are created Successfully',
        data:result
    })
})
const getAClinic = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await ClinicServices.getSingleClinicFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Clinic is retrieve  Successfully',
        data:result
    })
})
const updateClinic = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await ClinicServices.updateClinicIntoDB(id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Clinic is updated  Successfully',
        data:result
    })
})


export const ClinicControllers = {
     createClinic,getAllClinic,getAClinic,updateClinic
}