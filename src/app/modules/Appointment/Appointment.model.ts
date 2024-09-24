import { model, Schema } from "mongoose";
import { TAppointment } from "./Appointment.interface";
import { Status } from "./Appointment.constant";

const AppointmentSchema = new Schema<TAppointment>(
    {
        doctorId:{
            type: Schema.Types.ObjectId,
            ref: 'Doctor', required:true
        },
        patientId:{
            type: Schema.Types.ObjectId,
            ref:'User',required:true
        },
        appointmentDate: {
            type:Date, required:true
        },
        timeSlot:{
            type:String, required:true
        },
        status:{
            type:String, enum: Status, required:true
        }
    },
    {timestamps:true}
   
)
export const AppointmentModel = model<TAppointment>('Appointments',AppointmentSchema )