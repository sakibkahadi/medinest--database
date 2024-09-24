import { TAppointment } from "./Appointment.interface";
import { AppointmentModel } from "./Appointment.model";


const createAppointmentIntoDB = async (payload:TAppointment)=>{
    const result = await AppointmentModel.create(payload);
    return result
}

export const AppointmentServices = {
    createAppointmentIntoDB
}