import { Types } from "mongoose"

export type TStatus = 'pending' | 'confirmed' | 'canceled'
export type TAppointment ={
    doctorName: Types.ObjectId;
    patientName: string;
    patientEmail: string;
    appointmentDate: string;
    appointmentTime: string,
    status: TStatus
}