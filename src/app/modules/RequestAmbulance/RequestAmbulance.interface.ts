import { Types } from "mongoose";
export type TStatus = 'pending' | 'confirmed' | 'canceled'
export type TRequestAmbulance={
    from:string;
    destination: string,
    ambulance: Types.ObjectId;
    patient:Types.ObjectId;
    date: string;
    timeSlot:string;
    name: string;
    phoneNumber:string;
    status:TStatus
}