import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AdminServices } from "./Admin.Service"

const getAllAdmin = catchAsync(async (req,res)=>{
    
    const result = await AdminServices.getAllAdminFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  are retrieved Successfully',
        data:result
    })
})


export const AdminControllers = {
     getAllAdmin
}