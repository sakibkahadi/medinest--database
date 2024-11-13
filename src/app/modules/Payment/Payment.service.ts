
import { TPayment } from "./Payment.interface";
import { PaymentModel } from "./Payment.model";
import { sendEmail } from "../../utils/sendEmail";



const createPaymentIntoDB = async (payload: TPayment) => {
  

  const result = await PaymentModel.create(payload);
  sendEmail(payload.email, `Your payment transactionId is ${payload.transactionId}`, "Payment information")

  return result;
};

  const getAllPaymentFromDB= async()=>{
    const result = await PaymentModel.find()
 
    return result
  }
  

  const getPaymentByUserFromDB = async(email:string)=>{
    const result = await PaymentModel.findOne({email})
    return result
  }


  
  const deletePaymentFromDB = async(id:string)=>{
    const result = await PaymentModel.findByIdAndDelete(id)
    return result
}
  export const PaymentServices = {
  
    createPaymentIntoDB,getAllPaymentFromDB,deletePaymentFromDB,getPaymentByUserFromDB
  };
  