import { model, Schema } from "mongoose";
import { TClinic, TContact, TLocation } from "./Clinic.interface";


const ContactSchema = new Schema<TContact>({
    phoneNumber:{
        type:String,unique:true
    },
    email:{
        type:String, unique:true
    },
    website:{
        type:String
    }
})
const LocationSchema = new Schema<TLocation>({
    state:{
        type:String
    },city:{
        type:String
    },street:{
        type:String
    },postalCode:{
        type:String
    },country:{
        type:String
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }

})

const ClinicSchema = new Schema<TClinic>({
    clinicId:{
        type:String
    },
   clinicImage:{
type:String
   },
    clinicName:{
        type:String
    },contact:ContactSchema,
    location:LocationSchema,
    isDeleted:{
        type:Boolean,
        default:false
    }
    
})

export const ClinicMOdel = model<TClinic>('Clinic', ClinicSchema)