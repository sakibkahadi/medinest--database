import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AdminServices } from "./Admin.Service"

const getAllAdmin = catchAsync(async (req,res)=>{
    
    const result = await AdminServices.getAllAdminFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  are retrieved Successfully',
        data:result
    })
})
const getSingleAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AdminServices.getSingleAdminFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  retrieve Successfully',
        data:result
    })
})
const updateAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AdminServices.updateAdminIntoDB(id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  updated Successfully',
        data:result
    })
})

const deleteAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await AdminServices.deleteAdminFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Admin deleted Successfully',
            data:result
        })
    })
export const AdminControllers = {
     getAllAdmin, updateAdmin,getSingleAdmin,deleteAdmin
}