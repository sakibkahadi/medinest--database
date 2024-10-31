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
  
   
    
    const result = await AppointmentServices.getBookedTimesFromDB(doctorName as string, appointmentDate as string)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'done successfully',
        data:result
    })
})

const getAppointmentForUser = catchAsync(async(req,res,)=>{
    const {email } = req.params
    
    const result = await AppointmentServices.getAppointmentForUserFromDb(email);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:' Your appoints get successfully',
        data:result
    })
})
const updateAppointmentList = catchAsync(async(req,res,)=>{
    const {id} = req.params
    
    const result = await AppointmentServices.updateAppointmentList(id, req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:' appointment updated successfully',
        data:result
    })
})
const deleteAppointment = catchAsync(async(req,res,)=>{
    const {id} = req.params
    
    const result = await AppointmentServices.deleteAppointmentFromDB(id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:' appointment deleted successfully',
        data:result
    })
})


export const AppointmentControllers ={
    createAppointment,getBookedTimes, getAppointmentForUser, updateAppointmentList, deleteAppointment
}