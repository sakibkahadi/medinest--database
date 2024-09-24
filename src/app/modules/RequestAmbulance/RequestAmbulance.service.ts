import { TRequestAmbulance } from "./RequestAmbulance.interface";
import { RequestAmbulanceModel } from "./RequestAmbulance.model";

const createRequestAmbulanceIntoDB = async(payload:TRequestAmbulance)=>{
    const result = await RequestAmbulanceModel.create(payload)
    return result
}
const getAllRequestAmbulancesFromDB = async()=>{
    const result = await RequestAmbulanceModel.find()
    return result
}

export const RequestAmbulanceServices={
    createRequestAmbulanceIntoDB, getAllRequestAmbulancesFromDB
}