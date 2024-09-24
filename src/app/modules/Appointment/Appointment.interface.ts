import { Types } from "mongoose"

export type TStatus = 'pending' | 'confirmed' | 'canceled'
export type TAppointment ={
    doctorId: Types.ObjectId;
    patientId: Types.ObjectId;
    appointmentDate: Date;
    timeSlot: string,
    status: TStatus
}