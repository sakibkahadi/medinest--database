import { Types } from "mongoose";

export type TMedicine ={
    productImage:string;
    productName: string;
    productCompany: Types.ObjectId;
    genericName: Types.ObjectId;
    productType: string;
    productPower: string;
    isAvailable: boolean,
    isDeleted: boolean,
    shortDescription: string,
    longDescription: string,
    stripSize: string,
    unitPrice: string,
    quantity:number
}
export type TMedicineCompany ={
    companyName: string
}
export type TMedicineGenericName ={
    genericName:string
}