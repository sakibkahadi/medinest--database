import { Types } from "mongoose"

export type TSuperAdmin={
    user:Types.ObjectId;
    phoneNumber:string;
    name:string;
    email:string;
    image:string;
    sex?: 'male' | 'female' | 'others';
      
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' ;
    isBloodDonor:false;
    isDeleted:false
}