import httpStatus from "http-status";
import QueryBuilder from "../../builder/Querybuilder";
import AppError from "../../errors/AppError";
import { TAmbulance } from "./ambulances.interface";
import { AmbulancesModel } from "./ambulances.model";


const createAmbulanceIntoDB = async(payload:TAmbulance)=>{
    const result = await AmbulancesModel.create(payload);
    return result
}

const getAllAmbulancesFromDB =  async(query:Record<string, unknown>)=>{
    const ambulanceQuery = new QueryBuilder(AmbulancesModel.find().populate('admin'),query);
    ambulanceQuery?.search(['title'])
    const result = await ambulanceQuery.modelQuery;
    return result
  }

  const getSingleAmbulanceFromDB = async(id:string)=>{
    const isAmbulanceExists = await AmbulancesModel.findById(id)
    if(!isAmbulanceExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Ambulance is not found ')
    }
    return isAmbulanceExists
  }

  const deleteAmbulanceFromDB =async (id:string) => {
    const isAmbulanceExist = await AmbulancesModel.findById(id)
    if(!isAmbulanceExist){
      throw new AppError(httpStatus.NOT_FOUND, 'Ambulance is not exist ')
    }
      const result = await AmbulancesModel.findByIdAndDelete(id)
      return result;
    };
    const updateAmbulanceIntoDB = async( id:string, payload:Partial<TAmbulance>)=>{
      const isAmbulanceExists = await AmbulancesModel.findById(id)
      if(!isAmbulanceExists){
          throw new AppError(httpStatus.NOT_FOUND, 'Ambulance is not exist')
      }
    
      
      const result = await AmbulancesModel.findByIdAndUpdate(
          { _id: id },
          payload, // Set the new status
          { new: true }
        );
        return result
    }
export const AmbulanceServices = {
    createAmbulanceIntoDB,
    getAllAmbulancesFromDB, getSingleAmbulanceFromDB,  deleteAmbulanceFromDB, updateAmbulanceIntoDB
}