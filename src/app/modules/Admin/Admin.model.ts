
import  { model, Schema } from "mongoose"
import { TAdmin } from "./Admin.interface"




const adminSchema = new Schema<TAdmin>({
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
    address:{
        type:String,
       
    },
   
    contactNo:{
        type:String,
        
    },
 sex:{
    type:String,
    enum:['male' , 'female' , 'others'],
 },
birthDate:{
    type:String
},
age:{
    type:Number
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

