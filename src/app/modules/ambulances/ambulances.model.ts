import { Schema, model } from "mongoose";
import { TAmbulance, TSmallDetails } from "./ambulances.interface";

const smallDetailsSchema = new Schema<TSmallDetails>({
    smallDetails1: {
        type:String,
        required:true
    },
    smallDetails2: {
        type:String,
        required:true
    },
    smallDetails3: {
        type:String,
        required:true
    },
})
const ambulancesSchema = new Schema<TAmbulance>({
    admin: {
        type: Schema.Types.ObjectId, ref: 'User',
        required:[true,  'userId is required'], 
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        
    },
    image1:{
        type:String,
        required:true,
        
    },
    image2:{
        type:String,
        required:true,
        
    },
    smallDetails:{
        type:smallDetailsSchema,
        required:true,
        
    },
})

export const AmbulancesModel = model<TAmbulance>('Ambulance', ambulancesSchema)