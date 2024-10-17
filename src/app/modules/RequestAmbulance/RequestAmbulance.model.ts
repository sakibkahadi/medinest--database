import mongoose, { Schema, model } from "mongoose";
import { TRequestAmbulance } from "./RequestAmbulance.interface";
import { Status } from "./RequestAmbulance.constant";

const RequestAmbulanceSchema = new Schema<TRequestAmbulance>({
    from:{
        type: String,
        required:true
    },
    destination:{
        type: String,
        required:true
    }, timeSlot:{
        type:String
    },
    date:{
        type: String,
        required:true
    },
    ambulance:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Ambulance'
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required:true
    },
    name:{
        type:String,
        required:true
    },
    phoneNumber:{
        type: String,
        required:true
    },
    status:{
      type:String, enum: Status, required:true, default:'pending'
        
    }
})

export const RequestAmbulanceModel = model<TRequestAmbulance>('RequestAmbulance', RequestAmbulanceSchema)