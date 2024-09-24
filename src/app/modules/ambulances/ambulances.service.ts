import { TAmbulance } from "./ambulances.interface";
import { AmbulancesModel } from "./ambulances.model";


const createAmbulanceIntoDB = async(payload:TAmbulance)=>{
    const result = await AmbulancesModel.create(payload);
    return result
}
const getAllAmbulancesFromDB = async()=>{
    const result = await AmbulancesModel.find();
    return result
}

export const AmbulanceServices = {
    createAmbulanceIntoDB,
    getAllAmbulancesFromDB
}