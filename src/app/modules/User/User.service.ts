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
import { TNurse } from "../Nurse/Nurse.interface";
import { NurseModel } from "../Nurse/Nurse.model";
import { TPatient } from "../Patient/Patient.interface";
import { PatientModel } from "../Patient/Patient.model";


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
const createNurseIntoDB = async(payload:TNurse)=>{
    const userData: Partial<TUser>={};
    userData.password = '123'
    userData.role = 'nurse'
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
        
    
   //check doctor
   const isDoctorExist = await DoctorModel.findOne({_id: payload.doctor})
   if(!isDoctorExist){
    throw new AppError(httpStatus.BAD_REQUEST, 'Doctor is not exist')
   }

// check doctor department 
   // Set nurse's department to the doctor's department
   payload.department = isDoctorExist?.department;

        //create a Nurse 
        const newNurse = await NurseModel.create([payload], {session})
        if(!newNurse.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Nurse')
        }
        await session.commitTransaction();
        await session.endSession()
        return newNurse;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}
const createPatientIntoDB = async(payload:TPatient)=>{
    const userData: Partial<TUser>={};
    userData.password = '1231'
    userData.role = 'patient'
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
      
        // create a user
        const newUser = await UserModel.create([userData], {session})

        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
        }

        payload.user = newUser[0]._id

      

        //create a Nurse 
        const newPatient = await PatientModel.create([payload], {session})
        if(!newPatient.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Patient')
        }
        await session.commitTransaction();
        await session.endSession()
        return newPatient;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}
export const UserService={
  getAllUserFromDB, loginUser, createDoctorIntoDB, createNurseIntoDB, createPatientIntoDB
} 