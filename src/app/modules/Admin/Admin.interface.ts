import { Types } from "mongoose";

export type TAdmin={

        user:Types.ObjectId;
        clinicName: Types.ObjectId;
        name:string;
        email:string;
        image:string;
        
        phoneNumber?:string;
        sex?: 'male' | 'female' | 'others';
      
       bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' ;
       isBloodDonor: boolean;
       isDeleted:boolean
    
}