import httpStatus from "http-status";
import { TRequestAmbulance } from "./RequestAmbulance.interface";
import { RequestAmbulanceModel } from "./RequestAmbulance.model";
import AppError from "../../errors/AppError";

const createRequestAmbulanceIntoDB = async(payload:TRequestAmbulance)=>{
    const result = await RequestAmbulanceModel.create(payload)
    return result
}
const getAllRequestAmbulancesFromDB = async()=>{
    const result = await RequestAmbulanceModel.find().populate('patient').populate('ambulance')
    return result
}
const updateRequestAmbulance = async(id:string, payload:Partial<TRequestAmbulance>)=>{
    const isRequestedAmbulance = await RequestAmbulanceModel.findById(id)
    if(!isRequestedAmbulance){
        throw new AppError(httpStatus.NOT_FOUND, 'request is not exist')
    }
    const result = await RequestAmbulanceModel.findByIdAndUpdate(
        { _id: id },
        payload, // Set the new status
        { new: true }
    )
    return result
}
const deleteRequestAmbulance = async(id:string)=>{
    const isRequestedAmbulance = await RequestAmbulanceModel.findById(id)
    if(!isRequestedAmbulance){
        throw new AppError(httpStatus.NOT_FOUND, 'request is not exist')
    }
    const result = await RequestAmbulanceModel.findByIdAndDelete(id)
    return result
}


export const RequestAmbulanceServices={
    createRequestAmbulanceIntoDB, getAllRequestAmbulancesFromDB,updateRequestAmbulance, deleteRequestAmbulance
}