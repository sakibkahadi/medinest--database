import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TClinic } from "./Clinic.interface";
import { ClinicMOdel } from "./Clinic.model";
import { generateClinicId } from "./Clinic.utils";


const createClinicIntoDB = async (payload:TClinic) => {
  
  const isClinicExist = await ClinicMOdel.findOne({clinicName: payload.clinicName})
  if(isClinicExist){
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Clinic is already exist')
  }
const clinicId = await generateClinicId()
    const result = await ClinicMOdel.create({...payload, clinicId})
    return result;
    
  };
  const getAllClinicFromDB= async()=>{
    const result = await ClinicMOdel.find()
    return result
  }
  const getSingleClinicFromDB= async(_id:string)=>{
    const result = await ClinicMOdel.findById(_id)
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Clinic is not found')
    }
    return result
  }
  const updateClinicIntoDB= async(id:string, payload:Partial<TClinic>)=>{
    const result = await ClinicMOdel.findOneAndUpdate({
      _id:id
    }, payload, {new:true})
    return result
  }
  
  export const ClinicServices = {
  
    createClinicIntoDB,getAllClinicFromDB,getSingleClinicFromDB,updateClinicIntoDB
  };
  