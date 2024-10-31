import mongoose, { model, Schema } from "mongoose";
import { TAppointment } from "./Appointment.interface";
import { Status } from "./Appointment.constant";

const AppointmentSchema = new Schema<TAppointment>(
    {
        doctorName:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor', required:true
        },
        price:{
            type:String
        },
        patientName:{
            type: String,required:true
        }, patientEmail:{
            type:String
        },
        appointmentDate: {
            type:String, required:true
        },
        appointmentTime:{
            type:String, required:true
        },
        status:{
            type:String, enum: Status, required:true, default:'pending'
        }
    },
    {timestamps:true}
   
)
export const AppointmentModel = model<TAppointment>('Appointments',AppointmentSchema )