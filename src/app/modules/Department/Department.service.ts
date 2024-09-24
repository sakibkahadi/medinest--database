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

export const DepartmentServices = {
  createDepartmentIntoDB, getAllDepartmentsFromDB
};
