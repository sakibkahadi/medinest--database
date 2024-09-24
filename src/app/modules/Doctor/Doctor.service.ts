
import { DoctorModel } from './Doctor.model';



const getAllDoctorsFromDB = async () => {

  const result = await DoctorModel.find()
  return result;
};

export const DoctorServices = {

  getAllDoctorsFromDB,
};
