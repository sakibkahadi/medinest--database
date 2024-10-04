/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TPatient } from "./Patient.interface";
import { PatientModel } from "./Patient.model";
import { UserModel } from "../User/User.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { calculateAgeInYearsAndMonths } from "../User/User.utils";

const getAllPatientFromDB = async () => {

    const result = await PatientModel.find()
    return result;
  };
  const updatePatientIntoDB = async (id: string, payload: Partial<TPatient>) => {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      // Check if birthDate is provided and needs to be updated
      
      if (payload.birthDate) {
        const { years } = calculateAgeInYearsAndMonths(payload.birthDate);
        payload.age = years; // Add calculated years to the payload
         // You can store months separately if needed
      }
      // Update Patient collection
      const updatedPatient = await PatientModel.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true, session }
      );
  
      if (!updatedPatient) {
        throw new Error('Patient update failed');
      }
  
      // Update User collection
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: updatedPatient.user },
        {
          email: updatedPatient.email,
          image: updatedPatient.image,
          isDeleted: updatedPatient.isDeleted,
          isBloodDonor: updatedPatient.isBloodDonor
        },
        { new: true, session }
      );
  
      if (!updatedUser) {
        throw new Error('User update failed');
      }
  
      await session.commitTransaction();
      await session.endSession();
      
      return updatedPatient;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      
      throw new Error(err);
    }
  };
  
  const getSinglePatientFromDB= async(id:string)=>{
    
    const result = await PatientModel.findById(id)
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Patient is not found')
    }
    return result
  }
  
  export const PatientServices = {
  
    getAllPatientFromDB, getSinglePatientFromDB, updatePatientIntoDB
  };
  