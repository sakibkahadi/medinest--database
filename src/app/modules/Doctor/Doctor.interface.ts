import { Types } from "mongoose";

export type TReview = {
   
    patientName: string;
    rating: number;
    comment: string
}
export type TDoctor={
    user:Types.ObjectId;
    name:string;
    email:string;
    password:string;
    address?:string;
    contactNo:string;
    sex: 'male' | 'female' | 'others';
    department: Types.ObjectId;
    website?:string;
   experience?: number;
   consultationFee: string;
   rating?:number;
   review?: [TReview];
   emergencyContact?: string;
   isBloodDonor: boolean;
   isDeleted:boolean
}