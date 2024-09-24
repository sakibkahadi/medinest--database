import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { DoctorServices } from "./Doctor.service"


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
     getAllDoctors
}