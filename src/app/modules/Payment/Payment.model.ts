
import  { model, Schema } from "mongoose"
import { TPayment } from "./Payment.interface"





const paymentSchema = new Schema<TPayment>({
   
    email:{
        type:String,
        required:[true, ' is required'],
      
    },patient:{
        type: Schema.Types.ObjectId, ref: 'User',
        required:[true,  'patient is required'], unique:true,
    },transactionId:{
        type:String, unique:true
    },date:{
        type:String
    },
    price:{
        type:Number
    },



}, {timestamps:true})

export const PaymentModel = model<TPayment>('Payment', paymentSchema)

