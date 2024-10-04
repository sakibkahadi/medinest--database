/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TAdmin } from "./Admin.interface";
import { AdminModel } from "./Admin.model";
import { UserModel } from "../User/User.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const getAllAdminFromDB = async () => {

    const result = await AdminModel.find()
    return result;
  };
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
  
  export const AdminServices = {
  
    getAllAdminFromDB,updateAdminIntoDB,getSingleAdminFromDB
  };
  