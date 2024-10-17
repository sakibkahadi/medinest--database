import { Types } from "mongoose";

export type TSmallDetails = {
    smallDetails1: string;
    smallDetails2: string;
    smallDetails3: string;
}
export type TAmbulance = {
    admin: Types.ObjectId;
    title: string;
    description:string;
    image1:string;
    image2: string;
    smallDetails: TSmallDetails
}