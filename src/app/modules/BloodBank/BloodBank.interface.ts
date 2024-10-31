import { Types } from "mongoose";

export type TBlood ={
    clinicName: Types.ObjectId ;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' ;
    quantity:string;
    isAvailable:boolean;
    price:string
}