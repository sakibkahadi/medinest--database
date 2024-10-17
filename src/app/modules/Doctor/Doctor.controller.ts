import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { DoctorServices } from "./Doctor.service"


const getAllDoctors = catchAsync(async (req,res)=>{
    
    const result = await DoctorServices.getAllDoctorsFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Doctors  are retrieved Successfully',
        data:result
    })
})
const deleteDoctor = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await DoctorServices.deleteDoctorFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Doctor deleted Successfully',
            data:result
       
        })
    })
    const getDoctorsByClinic= catchAsync(async (req,res)=>{
        const {clinicId}= req.params
        const result = await DoctorServices.getDoctorsByClinicFromDB(clinicId)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Doctors of a specific   clinic retrieved Successfully',
            data:result
        })
    })

export const DoctorControllers = {
     getAllDoctors, deleteDoctor,getDoctorsByClinic
}