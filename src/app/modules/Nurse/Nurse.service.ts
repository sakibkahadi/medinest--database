import { NurseModel } from "./Nurse.model";

const getAllNursesFromDB = async () => {

    const result = await NurseModel.find().populate('doctor','name').populate('department', 'departmentName')
    return result;
  };
  
  export const NurseServices = {
  
    getAllNursesFromDB,
  };
  