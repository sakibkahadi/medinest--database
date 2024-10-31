import { Types } from "mongoose"

export type TPayment={
    email:string,
    patient:Types.ObjectId,
    price: number,
    date:string,
    transactionId:string,
    
}