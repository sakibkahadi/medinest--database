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

const getSingleUser =catchAsync(async (req,res)=>{
    const {email} = req.params
    const result = await UserService.getSingleUserFromDB(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'User is retrieved Successfully',
        data:result
    })
})

const updateSingleUser = catchAsync(async (req,res)=>{
    const {id} = req.body
  
    const result = await UserService.UpdateSingleUserFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'User  updated Successfully',
        data:result
    })
})

const loginUser = catchAsync(async(req,res)=>{
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
const forgetPassword = catchAsync(async(req,res)=>{
    const userEmail = req.body.email
    const result = await UserService.forgetPassword(userEmail)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'reset link is generated Successfully',
        data:result,
        
    })
})
const verifyingOtp = catchAsync(async(req,res)=>{
    const userEmail = req.body.email
    const otp = req.body.otp
    const result = await UserService.verifyOtp(userEmail,otp)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'verified successfully',
        data:result,
        
    })
})
const resetPassword = catchAsync(async(req,res)=>{
  
    const userEmail = req.body.email
    const newPassword = req.body.newPassword
    const reEnteredPassword = req.body.reEnterPassword
    
    const result = await UserService.resetPassword(userEmail, newPassword, reEnteredPassword)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'password reset successfully',
        data:result,
        
    })
})
const createDoctor = catchAsync(async(req,res)=>{
    const {email, password} = req.body
    const result = await UserService.createDoctorIntoDB(email, password, req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Doctor is create successfully',
        data:result
    })
})


//password
const createPatient = catchAsync(async(req,res)=>{
 const {email, password} = req.body
    const result = await UserService.createPatientIntoDB(email, password, req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Patient is create successfully',
        data:result
    })
})

//admin
const createAdmin = catchAsync(async(req,res)=>{
    const {email,password} = req.body;

    const result = await UserService.createAdminIntoDB(email, password,req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Admin is create successfully',
        data:result
    })
})
// super admin
const createSuperAdmin = catchAsync(async(req,res)=>{
    const {email,password} = req.body;

    const result = await UserService.createSuperAdminIntoDB(email, password,req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'super Admin is create successfully',
        data:result
    })
})

export const UserControllers={
     getAllUsers, getSingleUser, loginUser, createDoctor,createPatient,createAdmin, forgetPassword,verifyingOtp,resetPassword,updateSingleUser, createSuperAdmin
}