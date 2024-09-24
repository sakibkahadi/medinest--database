
import  { model, Schema } from "mongoose"
import { TNurse } from "./Nurse.interface"


const nurseSchema = new Schema<TNurse>({
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
    address:{
        type:String,
        
    },
   
    contactNo:{
        type:String,
        required:[true, ' contact is required']
    },
 sex:{
    type:String,
    enum:['male' , 'female' , 'others'],required:[true, 'Sex is required']
 },
 department:{
    type: Schema.Types.ObjectId, ref: 'Department',
    required:[true,  'Department is required']
 },
 doctor:{
    type:Schema.Types.ObjectId, ref: 'Doctor',
    required:[true, 'Doctor is required']
 }
 ,
    emergencyContact:{
        type:String
    },
    isBloodDonor:{
        type:Boolean, default:false
    },
    isDeleted:{
        type:Boolean, default:false
    },
    

}, {timestamps:true})

export const NurseModel = model<TNurse>('Nurse', nurseSchema)

