
import  { model, Schema } from "mongoose"
import { TBlood } from "./BloodBank.interface"




const bloodSchema= new Schema<TBlood>({
    clinicName:{
       type: Schema.Types.ObjectId, ref: 'Clinic',
       
    },
   
bloodGroup:{
    type:String,
    enum: ['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']
}
,price:{
    type:String
},
   quantity:{
    type:String
   },
    isAvailable:{
        type:Boolean, default:true
    }

}, )

export const BloodBankModel = model<TBlood>('BloodBank', bloodSchema)
