
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
    clinicName:{
        type:Schema.Types.ObjectId, ref:'Clinic', required:[true,  'clinic is required']
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
    type:String,
    required:[true, ' is required'],
   },
   phoneNumber:{
        type:String,
        required:[true, ' contact is required']
    },
 sex:{
    type:String,
    enum:['male' , 'female' , 'others']
 },
 department:{
    type: Schema.Types.ObjectId, ref: 'Department',
    required:[true,  'Department is required']
 },
    website:{
        type:String,
       
    },
    bloodGroup:{
        type:String,
        enum: ['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-']
    },

    experience:{
        type:String,
        required:[true, ' is required']
    },
   consultationFee:{
        type:String,
        required:[true, ' consultation fee is required']
    },rating:{
        type:Number, 
    },
    review:[reviewSchema],
   
    isBloodDonor:{
        type:Boolean, default:false
    },
    isDeleted:{
        type:Boolean, default:false
    },
    startTime: {
        type: String,
        required: [true, 'start time is required'],
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Regex for "HH:mm" format (e.g., "05:00")
      },
      endTime: {
        type: String,
        required: [true, 'End time is required'],
        match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Regex for "HH:mm" format
      },
      intervals: {
        type: [String],
        required: true,
        validate: {
          validator: function (v: string[]) {
            // Ensure each value matches "HH:mm" format
            return v.every(time => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time));
          },
          message: 'Intervals must be an array of strings in "HH:mm" format.',
        },
      },

}, {timestamps:true})

export const DoctorModel = model<TDoctor>('Doctor', doctorSchema)

