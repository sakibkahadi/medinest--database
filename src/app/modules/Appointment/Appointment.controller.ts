import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AppointmentServices } from "./Appointment.service";

const createAppointment = catchAsync(async(req,res,)=>{
    const result = await AppointmentServices.createAppointmentIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Appointment created successfully',
        data:result
    })
})
const getBookedTimes = catchAsync(async(req,res,)=>{
    const {doctorName, appointmentDate} = req.query
  
    console.log(req.query)
    
    const result = await AppointmentServices.getBookedTimesFromDB(doctorName as string, appointmentDate as string)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'done successfully',
        data:result
    })
})


export const AppointmentControllers ={
    createAppointment,getBookedTimes
}