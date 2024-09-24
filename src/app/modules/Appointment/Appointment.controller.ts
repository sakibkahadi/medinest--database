import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AppointmentServices } from "./Appointment.service";

const createAppointment = catchAsync(async(req,res,next)=>{
    const result = await AppointmentServices.createAppointmentIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Appointment created successfully',
        data:result
    })
})
export const AppointmentControllers ={
    createAppointment
}