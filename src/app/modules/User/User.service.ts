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
import { TAdmin } from "../Admin/Admin.interface";
import { AdminModel } from "../Admin/Admin.model";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from 'bcrypt'; // Import bcrypt
import admin from 'firebase-admin'
import { calculateAgeInYearsAndMonths } from "./User.utils";

//get all users
const getAllUserFromDB= async()=>{
    const result = await UserModel.find()
    return result
}

//log in user
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

//forget password
const forgetPassword = async (email: string) => {
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }
  
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const expirationTime = Date.now() + 2 * 60 * 1000; // OTP expires in 2 minutes
  
    // Update OTP and expiration time directly in MongoDB
    await UserModel.updateOne(
      { email },
      {
        $set: {
          otp,
          otpExpiration: expirationTime,
        },
      }
    );
  
    // Send the OTP via email
    sendEmail(email, `Your OTP code is ${otp}. It will expire in 2 minutes.`);
  
    // Automatically clear the OTP after 2 minutes using async/await in setTimeout
    setTimeout(async () => {
      try {
        const result = await UserModel.updateOne(
          { email, otpExpiration: { $lte: Date.now() } }, // Ensure it only clears if expiration has passed
          { $unset: { otp: 1, otpExpiration: 1 } } // Remove OTP and expiration time
        );
        if (result.modifiedCount > 0) {
          console.log(`OTP cleared for ${email} after 2 minutes`);
        } else {
          console.log(`OTP for ${email} was not cleared because the expiration time was not reached`);
        }
      } catch (error) {
        console.error(`Failed to clear OTP for ${email}:`, error);
      }
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
  };
// verify the sending otp and verify it 
  const verifyOtp = async (email: string, otp: string) => {
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }
  
    if (!isUserExist.otp || !isUserExist.otpExpiration) {
      throw new AppError(httpStatus.BAD_REQUEST, 'OTP not found or expired');
    }
  
    const currentTime = Date.now(); // Get the current time in milliseconds
    if (isUserExist.otp !== otp) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid OTP');
    }
  
    if (currentTime > isUserExist.otpExpiration) {
      throw new AppError(httpStatus.BAD_REQUEST, 'OTP has expired. Please request a new one.');
    }
  
    console.log('OTP verified successfully');
    // OTP is valid, proceed to allow the user to reset password
  };
//reset password and update it 

  const resetPassword = async (email: string, newPassword: string, reEnteredPassword: string) => {
    console.log(email,newPassword,reEnteredPassword)
      // Find the user by email
      const isUserExist = await UserModel.findOne({ email });
      if (!isUserExist) {
          throw new AppError(httpStatus.NOT_FOUND, 'User not found');
      }
  
      // Check if the new passwords match
      if (newPassword !== reEnteredPassword) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
      }
  
      const oldPassword = isUserExist.password; // Get the hashed password from the database
  
      // Compare the new password with the old hashed password
      const isSameAsOldPassword = await bcrypt.compare(newPassword, oldPassword);
      if (isSameAsOldPassword) {
          throw new AppError(httpStatus.BAD_REQUEST, 'New password cannot be the same as the old password');
      }
  
      // Hash the new password before updating
      const saltRounds = 10; // You can adjust the salt rounds as needed
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password directly in the database using `findOneAndUpdate`
      await UserModel.findOneAndUpdate(
          { email }, // Filter by the user's email
          { password: hashedNewPassword }, // Update the password field with the new hashed password
          { new: true } // Return the updated document (optional)
      );
      const firebaseUser = await admin.auth().getUserByEmail(email); // Get the Firebase user
    await admin.auth().updateUser(firebaseUser.uid, {
        password: newPassword, // Update password in Firebase
    });
      return console.log('Password reset successfully');
  };
  

  // add clinic
//   const createClinicIntoDB = async(payload:TAdmin)=>{
//     const userData: Partial<TUser>={};
//     userData.password = '123456'
//     userData.role = 'admin'
//     userData.email = payload?.email
//     userData.image = payload?.image
//     const isUserExist = await UserModel.findOne({email: payload.email})
//     if(isUserExist){
//         throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
//     }
//     const session = await mongoose.startSession();
//     try{
//         session.startTransaction();
      
//         // create a user
//         const newUser = await UserModel.create([userData], {session})

//         if(!newUser.length){
//             throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
//         }

//         payload.user = newUser[0]._id

      

//         //create a Nurse 
//         const newAdmin = await AdminModel.create([payload], {session})
//         if(!newAdmin.length){
//             throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin')
//         }
//         await session.commitTransaction();
//         await session.endSession()
//         return newAdmin;
//     }catch(err:any){
//         await session.abortTransaction();
//         await session.endSession()
//         throw new Error(err)
//     }
// }



const createDoctorIntoDB = async(payload:TDoctor)=>{
    // create a user Object 
    const userData: Partial<TUser>={};
    userData.password = '123'
    userData.role = 'doctor'
    userData.email = payload?.email
    
    const isUserExist = await UserModel.findOne({email: payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
    }
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
    userData.email = payload?.email
    const isUserExist = await UserModel.findOne({email: payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
    }
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

//create patient
const createPatientIntoDB = async(email:string, password:string, payload:TPatient)=>{
    const userData: Partial<TUser>={};
    userData.password = password || (config.default_password as string)
    
    userData.role = 'patient'
    userData.email = payload?.email
    userData.image = payload?.image
    const isUserExist = await UserModel.findOne({email: payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
    }
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
      
        // create a user
        const newUser = await UserModel.create([userData], {session})

        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
        }

        payload.user = newUser[0]._id

        if (payload.birthDate) {
          const { years } = calculateAgeInYearsAndMonths(payload.birthDate);
          payload.age = years; // Add calculated years to the payload
           // You can store months separately if needed
        }

        //create a Nurse 
        const newPatient = await PatientModel.create([payload], {session})
        if(!newPatient.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Patient')
        }
        await admin.auth().createUser({
          email: email,
          password: password,
        });
        await session.commitTransaction();
        await session.endSession()
        return newPatient;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}


//create admin
const createAdminIntoDB = async(email:string, password:string,payload:TAdmin)=>{
    const userData: Partial<TUser>={};
    userData.password = password || (config.default_password as string)
    userData.role = 'admin'
    userData.email = payload?.email
    userData.image = payload?.image
    
    const isUserExist = await UserModel.findOne({email: payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
    }
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
      
        // create a user
        const newUser = await UserModel.create([userData], {session})

        if(!newUser.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user')
        }

        payload.user = newUser[0]._id

      

        //create a Admin
        const newAdmin = await AdminModel.create([payload], {session})
        if(!newAdmin.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin')
        }
        await admin.auth().createUser({
          email: email,
          password: password,
        });
        await session.commitTransaction();
        await session.endSession()
        return newAdmin;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}

export const UserService={
  getAllUserFromDB, loginUser, createDoctorIntoDB, createNurseIntoDB, createPatientIntoDB, createAdminIntoDB, forgetPassword, verifyOtp, resetPassword
} 