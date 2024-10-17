/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TAdmin } from "./Admin.interface";
import { AdminModel } from "./Admin.model";
import { UserModel } from "../User/User.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import admin from 'firebase-admin';
import QueryBuilder from "../../builder/Querybuilder";
const getAllAdminFromDB =  async(query:Record<string, unknown>)=>{
    const adminQuery = new QueryBuilder(AdminModel.find().populate('clinicName'),query);
    adminQuery?.search(['clinicName'])
    const result = await adminQuery.modelQuery;
    return result
  }

  const updateAdminIntoDB = async(id:string, payload:Partial<TAdmin>)=>{
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
    
    // Update Admin collection
    const updatedAdmin = await AdminModel.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true, session }
    );
   
    if (!updatedAdmin) {
      throw new Error('Admin update failed');
    }

    // update User collection
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: updatedAdmin.user },
      {
        email:updatedAdmin.email, image:updatedAdmin.image,
        isDeleted:updatedAdmin.isDeleted,
        isBloodDonor:updatedAdmin.isBloodDonor
      },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new Error('User update failed');
    }

    
    await session.commitTransaction();
        await session.endSession()
    return updatedAdmin;
  } catch(err:any){
    await session.abortTransaction();
    await session.endSession()
    console.log('hi')
    throw new Error(err)
}
  }
  const getSingleAdminFromDB= async(id:string)=>{
    
    const result = await AdminModel.findById(id).populate('clinicName','clinicName')
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Admin is not found')
    }
    return result
  }
  const deleteAdminFromDB = async(id:string)=>{

    const isAdminExist = await AdminModel.findById(id)
    if(!isAdminExist){
      throw new AppError(httpStatus.NOT_FOUND, 'Admin is not found')
    }
    
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
    
    // delete Admin collection
    const deleteAdmin = await AdminModel.findByIdAndDelete(id)
   
    if (!deleteAdmin) {
      throw new Error('Admin deleted failed');
    }

    // update User collection
    const deleteUser = await UserModel.findOneAndDelete(isAdminExist.user)

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
  
  export const AdminServices = {
  
    getAllAdminFromDB,updateAdminIntoDB,getSingleAdminFromDB, deleteAdminFromDB
  };
  