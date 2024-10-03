import { Types } from "mongoose";



export type TPatient={
    user:Types.ObjectId;
    name:string;
    email:string;
    image:string;
    address?:string;
    contactNo?:string;
    sex?: 'male' | 'female' | 'others';
   birthDate: string;
   age: number;
   bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' ;
   isBloodDonor: boolean;
   isDeleted:boolean
}