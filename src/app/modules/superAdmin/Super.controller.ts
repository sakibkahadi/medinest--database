import httpStatus from "http-status"
import { SuperAdminServices } from "./SuperAdmin.service"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"

const getAllSuperAdmin = catchAsync(async (req,res)=>{
    
    const result = await SuperAdminServices.getAllSuperAdminFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  are retrieved Successfully',
        data:result
    })
})
const getSingleSuperAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await SuperAdminServices.getSingleSuperAdminFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  retrieve Successfully',
        data:result
    })
})
const updateSuperAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await SuperAdminServices.updateSuperAdminIntoDB(id, req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Admin  updated Successfully',
        data:result
    })
})

const deleteSuperAdmin = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await SuperAdminServices.deleteSuperAdminFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Admin deleted Successfully',
            data:result
        })
    })
export const SuperAdminControllers = {
     getAllSuperAdmin, updateSuperAdmin,getSingleSuperAdmin,deleteSuperAdmin
}