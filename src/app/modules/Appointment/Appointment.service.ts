import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAppointment } from "./Appointment.interface";
import { AppointmentModel } from "./Appointment.model";
import { DoctorModel } from "../Doctor/Doctor.model";




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

export const AppointmentServices = {
    createAppointmentIntoDB, getBookedTimesFromDB
}