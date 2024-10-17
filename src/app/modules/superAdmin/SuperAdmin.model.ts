
import  { model, Schema } from "mongoose"

import { TSuperAdmin } from "./SuperAdmin.interface"




const superAdminSchema = new Schema<TSuperAdmin>({
    user:{
       type: Schema.Types.ObjectId, ref: 'User',
        required:[true,  'userId is required'], unique:true,
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

export const superAdminModel = model<TSuperAdmin>('SuperAdmin', superAdminSchema)

