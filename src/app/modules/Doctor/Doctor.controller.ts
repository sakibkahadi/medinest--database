import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { DoctorServices } from "./Doctor.service"

const createDoctor = catchAsync(async (req,res)=>{
    const result = await DoctorServices.createDoctorIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Doctor Created Successfully',
        data:result
    })
})
const getAllDoctors = catchAsync(async (req,res)=>{
    
    const result = await DoctorServices.getAllDoctorsFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Doctors  are retrieved Successfully',
        data:result
    })
})


export const DoctorControllers = {
    createDoctor, getAllDoctors
}