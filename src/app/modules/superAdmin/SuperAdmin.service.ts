/* eslint-disable @typescript-eslint/no-explicit-any */

import admin from 'firebase-admin';
import QueryBuilder from '../../builder/Querybuilder';
import { superAdminModel } from './SuperAdmin.model';
import { TSuperAdmin } from './SuperAdmin.interface';
import mongoose from 'mongoose';
import { UserModel } from '../User/User.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const getAllSuperAdminFromDB =  async(query:Record<string, unknown>)=>{
    const SuperAdminQuery = new QueryBuilder(superAdminModel.find(),query);
    SuperAdminQuery?.search(['name'])
    const result = await SuperAdminQuery.modelQuery;
    return result
  }

  const updateSuperAdminIntoDB = async(id:string, payload:Partial<TSuperAdmin>)=>{
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
    
    // Update SuperAdmin collection
    const updatedSuperAdmin = await superAdminModel.findOneAndUpdate(
      { _id: id },
      payload,
      { new: true, session }
    );
   
    if (!updatedSuperAdmin) {
      throw new Error('SuperAdmin update failed');
    }

    // update User collection
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: updatedSuperAdmin.user },
      {
        email:updatedSuperAdmin.email, image:updatedSuperAdmin.image,
        isDeleted:updatedSuperAdmin.isDeleted,
        isBloodDonor:updatedSuperAdmin.isBloodDonor
      },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new Error('User update failed');
    }

    
    await session.commitTransaction();
        await session.endSession()
    return updatedSuperAdmin;
  } catch(err:any){
    await session.abortTransaction();
    await session.endSession()
    
    throw new Error(err)
}
  }
  const getSingleSuperAdminFromDB= async(id:string)=>{
    
    const result = await superAdminModel.findById(id)
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Super admin is not found')
    }
    return result
  }
  const deleteSuperAdminFromDB = async(id:string)=>{

    const isSuperAdminExist = await superAdminModel.findById(id)
    if(!isSuperAdminExist){
      throw new AppError(httpStatus.NOT_FOUND, 'Super Admin is not found')
    }
    
    const session = await mongoose.startSession();
   try {
    session.startTransaction();
    
    // delete Admin collection
    const deleteAdmin = await superAdminModel.findByIdAndDelete(id)
   
    if (!deleteAdmin) {
      throw new Error('Super Admin deleted failed');
    }

    // update User collection
    const deleteUser = await UserModel.findOneAndDelete(isSuperAdminExist.user)

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
  
  export const SuperAdminServices = {
  
    getAllSuperAdminFromDB, deleteSuperAdminFromDB, updateSuperAdminIntoDB, getSingleSuperAdminFromDB
  };
  