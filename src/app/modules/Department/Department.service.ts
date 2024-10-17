import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TDepartment } from "./Department.interface";
import { DepartmentModel } from "./Department.model";


const createDepartmentIntoDB = async (payload: TDepartment) => {
  const isDepartmentExist = await DepartmentModel.findOne({departmentName:payload.departmentName})
  if(isDepartmentExist){
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Department is already exist');
  }


  const result = await DepartmentModel.create(payload);
  return result;
};
const getAllDepartmentsFromDB = async () => {

  const result = await DepartmentModel.find()
  return result;
};
const deleteDepartmentsFromDB =async (id:string) => {
const isDepartmentExist = await DepartmentModel.findById(id)
if(!isDepartmentExist){
  throw new AppError(httpStatus.NOT_FOUND, 'Department is not exist ')
}
  const result = await DepartmentModel.findByIdAndDelete(id)
  return result;
};
const updateDepartmentIntoDB = async( id:string, payload:Partial<TDepartment>)=>{
  const isDepartmentExists = await DepartmentModel.findById(id)
  if(!isDepartmentExists){
      throw new AppError(httpStatus.NOT_FOUND, 'Department is not exist')
  }

  
  const result = await DepartmentModel.findByIdAndUpdate(
      { _id: id },
      payload, // Set the new status
      { new: true }
    );
    return result
}
export const DepartmentServices = {
  createDepartmentIntoDB, getAllDepartmentsFromDB, deleteDepartmentsFromDB, updateDepartmentIntoDB
};
