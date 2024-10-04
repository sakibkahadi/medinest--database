import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { PatientServices } from "./Patient.service"

const getAllPatient = catchAsync(async (req,res)=>{
    
    const result = await PatientServices.getAllPatientFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Patient  are retrieved Successfully',
        data:result
    })
})
const getSinglePatient = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await PatientServices.getSinglePatientFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Patient  retrieve Successfully',
        data:result
    })
})
const updatePatient = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await PatientServices.updatePatientIntoDB(id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Patient  updated Successfully',
        data:result
    })
})


export const PatientControllers = {
     getAllPatient, updatePatient,getSinglePatient
}