import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAppointment } from "./Appointment.interface";
import { AppointmentModel } from "./Appointment.model";
import { DoctorModel } from "../Doctor/Doctor.model";
import { UserModel } from "../User/User.model";




const createAppointmentIntoDB = async (payload: TAppointment) => {
    const { doctorName, appointmentDate, appointmentTime } = payload;
  
    const isUserAlreadyBooked = await AppointmentModel.findOne({patientEmail:payload.patientEmail})
  
    const isDoctorExists  = await DoctorModel.findById(payload.doctorName)
    if(!isDoctorExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Doctor is not found')
    }

    
    // Check if there is already an appointment with the same doctor, date, and time
    const existingAppointment = await AppointmentModel.findOne({
      doctorName: doctorName,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    });
    if(existingAppointment && isUserAlreadyBooked){
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'You already book this slot. Please pay soon')
    }
    if (existingAppointment?.status === 'confirmed') {
      // If an appointment already exists with the same date and time, throw an error
      throw new AppError(httpStatus.NOT_ACCEPTABLE, "An appointment already exists for this doctor at the selected date and time.");
    }
  
    // If no existing appointment is found, create the new appointment
    const result = await AppointmentModel.create(payload);
    return result;
  };
  

 const getBookedTimesFromDB = async (doctorName: string, appointmentDate: string) => {
    
    const bookedAppointments = await AppointmentModel.find({
      doctorName: doctorName,
      appointmentDate: appointmentDate,
    });

    // Extract only the times from booked appointments
    const bookedTimes = bookedAppointments.map((appointment) => appointment?.status === 'confirmed' && appointment.appointmentTime);
 
    return bookedTimes;
  };
  const getAppointmentForUserFromDb = async(email:string, )=>{
  
    const isPatientExists = await UserModel.findOne({email})
    if(!isPatientExists){
      throw new AppError(httpStatus.NOT_FOUND, 'patient is not found')
    }
    const result = await AppointmentModel.find({patientEmail:email}).populate('doctorName')
    console.log(result)
    return result;
  }

  const updateAppointmentList = async(id:string, payload:Partial<TAppointment>)=>{
    const isAppointmentExists = await AppointmentModel.findById(id)
    if(!isAppointmentExists){
      throw new AppError(httpStatus.NOT_FOUND, 'Appointment is not found')
    }
    const result = await AppointmentModel.findByIdAndUpdate(
      id, // Use the id directly
      payload, // The updated fields
      { new: true, runValidators: true } // Return the updated document and run validation
  );
return result
  }
const deleteAppointmentFromDB = async(id:string)=>{
  const isAppointmentExists = await AppointmentModel.findById(id)
    if(!isAppointmentExists){
      throw new AppError(httpStatus.NOT_FOUND, 'Appointment is not found')
    }
    const result= await AppointmentModel.findByIdAndDelete(id)
    return result
}
export const AppointmentServices = {
    createAppointmentIntoDB, getBookedTimesFromDB, getAppointmentForUserFromDb, updateAppointmentList,deleteAppointmentFromDB
}