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

import { TPatient } from "../Patient/Patient.interface";
import { PatientModel } from "../Patient/Patient.model";
import { TAdmin } from "../Admin/Admin.interface";
import { AdminModel } from "../Admin/Admin.model";
import { sendEmail } from "../../utils/sendEmail";
import bcrypt from 'bcrypt'; // Import bcrypt
import admin from 'firebase-admin'
import { calculateAgeInYearsAndMonths } from "./User.utils";
import { ClinicMOdel } from "../Clinic/Clinic.model";
import { TSuperAdmin } from "../superAdmin/SuperAdmin.interface";
import { superAdminModel } from "../superAdmin/SuperAdmin.model";

//get all users
const getAllUserFromDB = async () => {
  try {
    const users = await UserModel.aggregate([
      // Lookup for superAdmin info
      {
        $lookup: {
          from: 'superadmins',
          localField: '_id',
          foreignField: 'user',
          as: 'superadminInfo',
        },
      },
      // Lookup for admin info
      {
        $lookup: {
          from: 'admins',
          localField: '_id',
          foreignField: 'user',
          as: 'adminInfo',
        },
      },
      // Lookup for patient info
      {
        $lookup: {
          from: 'patients',
          localField: '_id',
          foreignField: 'user',
          as: 'patientInfo',
        },
      },
      // Lookup for doctor info
      {
        $lookup: {
          from: 'doctors',
          localField: '_id',
          foreignField: 'user',
          as: 'doctorInfo',
        },
      },
      // Projecting necessary fields and extracting names and phone numbers
      {
        $project: {
          email: 1,
          role: 1,
          status: 1,
          image: 1,
          // Extract the first element from each role-specific info array for name
          adminName: { $arrayElemAt: ['$adminInfo.name', 0] },
          superadminName: { $arrayElemAt: ['$superadminInfo.name', 0] },
          patientName: { $arrayElemAt: ['$patientInfo.name', 0] },
          doctorName: { $arrayElemAt: ['$doctorInfo.name', 0] },
          // Extract the first element for phone numbers
          adminPhone: { $arrayElemAt: ['$adminInfo.phoneNumber', 0] },
          superadminPhone: { $arrayElemAt: ['$superadminInfo.phoneNumber', 0] },
          patientPhone: { $arrayElemAt: ['$patientInfo.phoneNumber', 0] },
          doctorPhone: { $arrayElemAt: ['$doctorInfo.phoneNumber', 0] },
        },
      },
      // Add fields 'name' and 'phoneNumber' based on the user's role
      {
        $addFields: {
          name: {
            $cond: [
              { $eq: ['$role', 'admin'] }, '$adminName',
              {
                $cond: [
                  { $eq: ['$role', 'patient'] }, '$patientName',
                  {
                    $cond: [
                      { $eq: ['$role', 'doctor'] }, '$doctorName',
                      {
                        $cond: [
                          { $eq: ['$role', 'superAdmin'] }, '$superadminName',
                          'N/A', // Default value if no match is found
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          phoneNumber: {
            $cond: [
              { $eq: ['$role', 'admin'] }, '$adminPhone',
              {
                $cond: [
                  { $eq: ['$role', 'patient'] }, '$patientPhone',
                  {
                    $cond: [
                      { $eq: ['$role', 'doctor'] }, '$doctorPhone',
                      {
                        $cond: [
                          { $eq: ['$role', 'superAdmin'] }, '$superadminPhone',
                          'N/A', // Default value if no match is found
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    ]);

    return users;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};


const getSingleUserFromDB = async (email: string) => {
  try {
    // Fetch the user from the User collection
    const user = await UserModel.findOne({ email: email }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    // Initialize a variable to store additional user details
    let additionalInfo = {};

    // Fetch additional information based on the user's role
    if (user.role === 'admin') {
      const admin = await AdminModel.findOne({ user: user._id }).lean();
      if (admin) {
        additionalInfo = { name: admin.name };
      }
    } else if (user.role === 'doctor') {
      const doctor = await DoctorModel.findOne({ user: user._id }).lean();
      if (doctor) {
        additionalInfo = { name: doctor.name };
      }
    } else if (user.role === 'patient') {
      const patient = await PatientModel.findOne({ user: user._id }).lean();
      if (patient) {
        additionalInfo = { name: patient.name };
      }
    } else if (user.role === 'superAdmin') {
      const superAdmin = await superAdminModel.findOne({ user: user._id }).lean();
      if (superAdmin) {
        additionalInfo = { name: superAdmin.name };
      }
    }

    // Combine user information with additional information
    return { ...user, ...additionalInfo };
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

const UpdateSingleUserFromDB = async (id: string) => {
  const isUserExist = await UserModel.findById(id);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Toggle status between 'active' and 'blocked'
  const newStatus = isUserExist.status === 'active' ? 'blocked' : 'active';

  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: id },
    { status: newStatus }, // Set the new status
    { new: true }
  );

  return updatedUser;
};


//log in user
const loginUser = async(payload:TLoginUser)=>{
    const isUserExist = await UserModel.findOne({email:payload?.email}).select('+password')
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }
    if(isUserExist.status === 'blocked'){
      throw new AppError(httpStatus.UNAUTHORIZED, 'User is blocked')
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
    sendEmail(email, `Your OTP code is ${otp}. It will expire in 2 minutes.`, "Reset your password within 2 mins");
  
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
  

  



const createDoctorIntoDB = async (email: string, password: string, payload: TDoctor) => {
  // Create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'doctor';
  userData.email = payload?.email;
  userData.image = payload?.image;

  const isUserExist = await UserModel.findOne({ email: payload.email });
  if (isUserExist) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User already exists');
  }

  const session = await mongoose.startSession();
  try {
      session.startTransaction();

      // Create a user
      const newUser = await UserModel.create([userData], { session });

      if (!newUser.length) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }

      payload.user = newUser[0]._id;

      // Check department
      const isDepartmentExist = await DepartmentModel.findOne({ _id: payload?.department });

      if (!isDepartmentExist) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Department does not exist');
      }

      // Check if startTime and endTime are provided
      if (!payload?.startTime || !payload?.endTime) {
          throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Start time and end time are required');
      }

      // Parse `startTime` and `endTime`
      const [startHours, startMinutes] = payload.startTime.split(':').map(Number);
      const [endHours, endMinutes] = payload.endTime.split(':').map(Number);

      const startDate = new Date();
      startDate.setHours(startHours, startMinutes, 0, 0);

      const endDate = new Date();
      endDate.setHours(endHours, endMinutes, 0, 0);

      // Validate that the start time is before the end time
      if (startDate >= endDate) {
          throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Start time must be before end time');
      }

      // Check if a schedule with the same startTime and endTime exists
      
      // Generate 30-minute intervals between `startTime` and `endTime`
      const intervals: string[] = [];
      const currentTime = new Date(startDate);

      while (currentTime < endDate) {
          const formattedTime = currentTime.toTimeString().slice(0, 5); // Extract "HH:mm"
          intervals.push(formattedTime);

          // Add 30 minutes to the current time
          currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
      intervals.push(endDate.toTimeString().slice(0, 5)); // Add the end time as well

      // Log the intervals for debugging
      

      // Add the intervals to the payload
      payload.intervals = intervals;

      // Create a doctor with intervals
      const newDoctor = await DoctorModel.create([payload], { session });

      if (!newDoctor.length) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create doctor');
      }

      await admin.auth().createUser({
          email: email,
          password: config.default_password,
      });

      await session.commitTransaction();
      session.endSession();

      return newDoctor;
  } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(err);
  }
};


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

        //create a patient 
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
const createAdminIntoDB = async(email:string,  password:string,payload:TAdmin)=>{
    const userData: Partial<TUser>={};
    userData.password = password || (config.default_password as string)
    userData.role = 'admin'
    userData.email = payload?.email
    userData.image = payload?.image
    

    const isUserExist = await UserModel.findOne({email: payload.email})
    if(isUserExist){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'user is already exist')
    }
    const isClinicExist = await ClinicMOdel.findById(payload.clinicName)
    if(!isClinicExist){
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Clinic is not exist')
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
          password: config.default_password ,
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
//create Super admin
const createSuperAdminIntoDB = async(email:string,  password:string,payload:TSuperAdmin)=>{
    const userData: Partial<TUser>={};
    userData.password = password || (config.default_password as string)
    userData.role = 'superAdmin'
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

      

        //create a super Admin
        const newSuperAdmin = await superAdminModel.create([payload], {session})
        if(!newSuperAdmin.length){
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create super Admin')
        }
        await admin.auth().createUser({
          email: email,
          password: config.default_password ,
        });
        await session.commitTransaction();
        await session.endSession()
        return newSuperAdmin;
    }catch(err:any){
        await session.abortTransaction();
        await session.endSession()
        throw new Error(err)
    }
}

export const UserService={
  getAllUserFromDB, loginUser, getSingleUserFromDB, createDoctorIntoDB,  createPatientIntoDB, createAdminIntoDB, forgetPassword, verifyOtp, resetPassword, UpdateSingleUserFromDB, createSuperAdminIntoDB
} 