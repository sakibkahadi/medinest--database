
import  { model, Schema } from "mongoose"
import { TAdmin } from "./Admin.interface"




const adminSchema = new Schema<TAdmin>({
    user:{
       type: Schema.Types.ObjectId, ref: 'User',
        required:[true,  'userId is required'], unique:true,
    },
    clinicName:{
       type: Schema.Types.ObjectId, ref: 'Clinic',
        required:[true,  'Clinic name is required'], 
    },
    name:{
        type:String,
        required:[true, 'name is required']
    },
    email:{
        type:String,
        required:[true, ' is required'],
        unique:true
    },

    image:{
        type:String, required:[true, ' is required'],
    },
    
   
   phoneNumber:{
        type:String,
        
    },
 sex:{
    type:String,
    enum:['male' , 'female' , 'others'],
 },

bloodGroup:{
    type:String,
    enum: ['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']
}
,
    isBloodDonor:{
        type:Boolean, default:false
    },
    isDeleted:{
        type:Boolean, default:false
    },
    

}, {timestamps:true})

export const AdminModel = model<TAdmin>('Admin', adminSchema)

