import httpStatus from "http-status";
import AppError from "../../errors/AppError";

import QueryBuilder from "../../builder/Querybuilder";
import { TBlood } from "./BloodBank.interface";
import { BloodBankModel } from "./BloodBank.model";
import { ClinicMOdel } from "../Clinic/Clinic.model";

// create BloodBank
const createBloodBankIntoDB = async (payload: TBlood) => {
    // Check if the clinic exists using the clinic's ID from the payload
    const isClinicExist = await ClinicMOdel.findOne({ _id: payload.clinicName });
    
    // If the clinic exists, proceed with the blood group check
    if (isClinicExist) {
      // Check if the blood group already exists for the given clinic
      const isBloodGroupExist = await BloodBankModel.findOne({
        bloodGroup: payload.bloodGroup,
        clinicName: payload.clinicName, // Ensure blood group uniqueness within the clinic
      });
  
      // If the blood group exists for this clinic, throw an error
      if (isBloodGroupExist) {
        throw new AppError(
          httpStatus.NOT_ACCEPTABLE,
          'This blood group is already existed in your clinic'
        );
      }
    } else {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Clinic not found'
      );
    }
  
    // If the clinic and blood group are valid, create a new entry in the BloodBankModel
    const result = await BloodBankModel.create(payload);
  
    return result;
  };
  
//   delete BloodBank
const deleteBloodBankFromDB = async(id:string)=>{
    const result = await BloodBankModel.findByIdAndDelete(id)
    return result
}
const updateBloodBankIntoDB = async (id: string, payload: Partial<TBlood>) => {
 
  const isBloodBankExists = await BloodBankModel.findById(id);
  if (!isBloodBankExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'BloodBank does not exist');
  }


  const numberQuality = Number(payload.quantity);
  if (numberQuality <= 0) {
      payload.isAvailable = false; 
  } else {
      payload.isAvailable = true;
  }


  const result = await BloodBankModel.findByIdAndUpdate(
      id,
      payload, 
      { new: true, runValidators: true }
  );

  return result;
};

const updateBloodQuantityIntoDB = async (id: string, payload: Partial<TBlood>) => {
    // Find the existing BloodBank document.
    const isBloodBankExists = await BloodBankModel.findById(id);
    if (!isBloodBankExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'BloodBank does not exist');
    }
    let numberQuality = Number(isBloodBankExists.quantity)
    if(numberQuality <= 0){
    payload.isAvailable = false
  }
numberQuality = Number(isBloodBankExists.quantity )- Number(payload.quantity)
if(numberQuality < 0 ){
  throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Quantity is over')
}



    const result = await BloodBankModel.findByIdAndUpdate(
        id,
       {quantity: numberQuality}, 
        { new: true, runValidators: true } 
    );
return result
   
};

// get single BloodBank

const getSingleBloodBankFromDb = async(id:string)=>{
    const result = await BloodBankModel.findById(id).populate('clinicName')
    return result;
}

// get all BloodBank
  
const getAllBloodBankFromDB= async(query:Record<string, unknown>)=>{
    const BloodBankQuery = new QueryBuilder(BloodBankModel.find().populate('clinicName'),query);
    BloodBankQuery?.search(['bloodGroup'])
    const result = await BloodBankQuery.modelQuery;
    return result
  }

  //get blood by clinic

  

export const BloodBankServices = {
    createBloodBankIntoDB,getAllBloodBankFromDB,getSingleBloodBankFromDb, updateBloodBankIntoDB,deleteBloodBankFromDB, updateBloodQuantityIntoDB
}