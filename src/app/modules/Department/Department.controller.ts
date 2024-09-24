import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { DepartmentServices } from "./Department.service"


const createDepartment = catchAsync(async (req,res)=>{
    const result = await DepartmentServices.createDepartmentIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Department Created Successfully',
        data:result
    })
})
const getAllDepartments = catchAsync(async (req,res)=>{
    
    const result = await DepartmentServices.getAllDepartmentsFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Departments  are retrieved Successfully',
        data:result
    })
})


export const DepartmentControllers = {
    createDepartment, getAllDepartments
}