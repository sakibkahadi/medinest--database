/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./User.interface";
import { UserModel } from "./User.model";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { TDoctor } from "../Doctor/Doctor.interface";
import mongoose from "mongoose";
import { DoctorModel } from "../Doctor/Doctor.model";
import { DepartmentModel } from "../Department/Department.model";

const createUserIntoDB = async(payload:TUser)=>{
    const isUserExist = await UserModel.findOne({email:payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User is Already exists')
    }
    
    const result = await UserModel.create(payload)
    return result
}

const getAllUserFromDB= async()=>{
    const result = await UserModel.find()
    return result
}
const loginUser = async(payload:TLoginUser)=>{
    const isUserExist = await UserModel.findOne({email:payload?.email}).select('+password')
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }
    const isPasswordMatched = await UserModel.isPasswordMatched(payload?.password, isUserExist?.password)
    if(!isPasswordMatched){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'password do not matched')
    }

    const JwtPayload = {
        userId: isUserExist?._id,
        role: isUserExist?.role
    }

    const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
        expiresIn: '1h'
    })
    return {accessToken, isUserExist}
}

const createDoctorIntoDB = async(payload:TDoctor)=>{
    // create a user Object 
    const userData: Partial<TUser>={};
    userData.password = '123'
    userData.role = 'doctor'
    
   
   
   
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
      
        // create a user
        const newUser = await UserModel.create([userData], {session})

        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
        }

        payload.user = newUser[0]._id

        //check department
        const isDepartmentExist  = await DepartmentModel.findOne({_id:payload?.department})

   if(!isDepartmentExist){
    throw new AppError(httpStatus.BAD_REQUEST, 'Department is not exist')
   }
        //create a doctor 
        const newDoctor = await DoctorModel.create([payload], {session})
        if(!newDoctor.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create doctor')
        }
        await session.commitTransaction();
        await session.endSession()
        return newDoctor;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}

export const UserService={
    createUserIntoDB,  getAllUserFromDB, loginUser, createDoctorIntoDB
} 