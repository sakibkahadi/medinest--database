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


export const PatientControllers = {
     getAllPatient
}