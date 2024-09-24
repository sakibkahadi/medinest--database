import { Schema, model } from "mongoose";
import { TRequestAmbulance } from "./RequestAmbulance.interface";

const RequestAmbulanceSchema = new Schema<TRequestAmbulance>({
    from:{
        type: String,
        required:true
    },
    destination:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    ambulance:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'ambulance'
    },
    name:{
        type:String,
        required:true
    },
    number:{
        type: String,
        required:true
    },
})

export const RequestAmbulanceModel = model<TRequestAmbulance>('RequestAmbulance', RequestAmbulanceSchema)