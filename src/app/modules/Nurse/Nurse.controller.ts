import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { NurseServices } from "./Nurse.service"



const getAllNurses = catchAsync(async (req,res)=>{
    
    const result = await NurseServices.getAllNursesFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Nurse are retrieved Successfully',
        data:result
    })
})


export const NurseControllers = {
     getAllNurses
}