import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TClinic } from "./Clinic.interface";
import { ClinicMOdel } from "./Clinic.model";
import { generateClinicId } from "./Clinic.utils";

import { AdminModel } from "../Admin/Admin.model";
import QueryBuilder from "../../builder/Querybuilder";


const createClinicIntoDB = async (payload: TClinic) => {
  // Find if a clinic with the same name and location exists
  const isNumberExist = await ClinicMOdel.findOne({"contact.phoneNumber":payload.contact.phoneNumber})
  if(isNumberExist){
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Number is already exists')
  }
  const isClinicExist = await ClinicMOdel.findOne({
    clinicName: payload.clinicName,
    "location.longitude": payload.location.longitude,
    "location.latitude": payload.location.latitude,
  });

  // If the clinic exists, throw an error
  if (isClinicExist) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Clinic with the same name and location already exists');
  }

  // Generate clinic ID
  const clinicId = await generateClinicId();

  // Create the clinic with the payload and clinicId
  const result = await ClinicMOdel.create({ ...payload, clinicId });

  return result;
};

  const getAllClinicFromDB= async(query:Record<string, unknown>)=>{
    const clinicQuery = new QueryBuilder(ClinicMOdel.find(),query);
    clinicQuery?.search(['clinicName'])
    const result = await clinicQuery.modelQuery;
    return result
  }
  const getSingleClinicFromDB= async(_id:string)=>{
    const result = await ClinicMOdel.findById(_id)
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Clinic is not found')
    }
    return result
  }

  // get clinic by admin
  const getClinicByAdminFromDB = async(adminId:string)=>{
    
    const admin = await AdminModel.findOne({user: adminId})
    if(!admin){
      throw new AppError(httpStatus.NOT_FOUND,'admin not found')
    }
    
    const clinic = await ClinicMOdel.findById(admin?.clinicName);
    if (!clinic) {
      throw new AppError(httpStatus.NOT_FOUND,'Clinic is not found')
    }
  
return clinic


  }
  const updateClinicIntoDB= async(id:string, payload:Partial<TClinic>)=>{
    const result = await ClinicMOdel.findByIdAndUpdate({
      _id:id
    }, payload, {new:true})
    return result
  }


  
  const deleteClinicFromDB = async(id:string)=>{
    const result = await ClinicMOdel.findByIdAndDelete(id)
    return result
}
  export const ClinicServices = {
  
    createClinicIntoDB,getAllClinicFromDB,getSingleClinicFromDB,updateClinicIntoDB,  getClinicByAdminFromDB,deleteClinicFromDB
  };
  