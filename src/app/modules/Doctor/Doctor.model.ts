
import  { model, Schema } from "mongoose"
import { TDoctor, TReview } from "./Doctor.interface"

const reviewSchema = new Schema<TReview>({
    patientName:{
        type:String, required:[true, 'Name is required'],
        
    },
    rating:{
        type:Number, required:[true, 'Rating is required']
    },
    comment:{
        type:String, required:[true, 'comment is required']
    }
})
const doctorSchema = new Schema<TDoctor>({
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
    },password:{
        type:String,
        required:[true, ' is required'],
    },
    address:{
        type:String,
        required:[true, ' is required']
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
    website:{
        type:String,
       
    },
  

    experience:{
        type:Number,
        required:[true, ' is required']
    },
   consultationFee:{
        type:String,
        required:[true, ' consultation fee is required']
    },
    review:[reviewSchema],
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

export const DoctorModel = model<TDoctor>('Doctor', doctorSchema)

