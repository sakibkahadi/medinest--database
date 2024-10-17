/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { DoctorModel } from './Doctor.model';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import { UserModel } from '../User/User.model';
import { ClinicMOdel } from '../Clinic/Clinic.model';
import QueryBuilder from '../../builder/Querybuilder';


const getAllDoctorsFromDB = async(query:Record<string, unknown>)=>{
  const doctorQuery = new QueryBuilder(DoctorModel.find().populate('department').populate('clinicName'),query);
  doctorQuery?.search(['name'])
  const result = await doctorQuery.modelQuery;
  return result
}

const deleteDoctorFromDB = async(id:string)=>{

  const isDoctorExists = await DoctorModel.findById(id)
  if(!isDoctorExists){
    throw new AppError(httpStatus.NOT_FOUND, 'doctor is not found')
  }
  
  const session = await mongoose.startSession();
 try {
  session.startTransaction();
  
  // delete Doctor collection
  const deleteDoctor = await DoctorModel.findByIdAndDelete(id)
 
  if (!deleteDoctor) {
    throw new Error('Doctor deleted failed');
  }

  // update User collection
  const deleteUser = await UserModel.findOneAndDelete(isDoctorExists.user)

  if (!deleteUser) {
    throw new Error('User update failed');
  }

// Fetch Firebase user by email and delete from Firebase
const userEmail = deleteUser.email;
const firebaseUser = await admin.auth().getUserByEmail(userEmail);
await admin.auth().deleteUser(firebaseUser.uid);
  await session.commitTransaction();
      await session.endSession()
  return deleteUser;
} catch(err:any){
  await session.abortTransaction();
  await session.endSession()
 
  throw new Error(err)
}
}

//get doctor by clinic
const getDoctorsByClinicFromDB = async(id:string)=>{
  const isClinicExist = await ClinicMOdel.findById(id)
  if(!isClinicExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Clinic is not found')
  }
const result = await DoctorModel.find({clinicName:id})


return result
}
export const DoctorServices = {

  getAllDoctorsFromDB, deleteDoctorFromDB,getDoctorsByClinicFromDB
};
