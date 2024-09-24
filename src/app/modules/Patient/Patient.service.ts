import { PatientModel } from "./Patient.model";

const getAllPatientFromDB = async () => {

    const result = await PatientModel.find()
    return result;
  };
  
  export const PatientServices = {
  
    getAllPatientFromDB,
  };
  