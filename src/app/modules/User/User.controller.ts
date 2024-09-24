import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./User.service";
import sendResponse from "../../utils/sendResponse";



const getAllUsers = catchAsync(async (req,res)=>{
    const result = await UserService.getAllUserFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Users  are retrieved Successfully',
        data:result
    })
})

const loginUser = catchAsync(async(req,res,next)=>{
    const result = await UserService.loginUser(req.body);
    const {isUserExist, accessToken} = result
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Users  are retrieved Successfully',
        data:isUserExist,
        token:accessToken
    })
})
const createDoctor = catchAsync(async(req,res)=>{
 
    const result = await UserService.createDoctorIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Doctor is create successfully',
        data:result
    })
})
const createNurse = catchAsync(async(req,res)=>{
 
    const result = await UserService.createNurseIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Nurse is create successfully',
        data:result
    })
})
const createPatient = catchAsync(async(req,res)=>{
 
    const result = await UserService.createPatientIntoDB(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Patient is create successfully',
        data:result
    })
})

export const UserControllers={
     getAllUsers, loginUser, createDoctor, createNurse, createPatient
}