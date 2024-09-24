
import { DoctorModel } from './Doctor.model';



const getAllDoctorsFromDB = async () => {

  const result = await DoctorModel.find().populate('department')
  return result;
};

export const DoctorServices = {

  getAllDoctorsFromDB,
};
