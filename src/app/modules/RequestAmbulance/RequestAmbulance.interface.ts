import { Types } from "mongoose";

export type TRequestAmbulance={
    from:string;
    destination: string,
    ambulance: Types.ObjectId;
    date: string;
    name: string;
    number:string
}