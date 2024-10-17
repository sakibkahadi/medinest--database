import { Types } from "mongoose";

export type TReview = {
   
    patientName: string;
    rating: number;
    comment: string
}
export type TDoctor={
    user:Types.ObjectId;
    clinicName: Types.ObjectId;
    name:string;
    email:string;
image:string;
    
    phoneNumber:string;
    sex?: 'male' | 'female' | 'others';
    department: Types.ObjectId;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' ;
    website?:string;
   experience?: string;
   consultationFee: string;
   rating?:number;
   review?: [TReview];
   startTime:string,
   endTime:string,
   intervals: string[];
   isBloodDonor: boolean;
   isDeleted:boolean
}