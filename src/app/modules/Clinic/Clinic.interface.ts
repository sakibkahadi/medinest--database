
export type TContact ={
    phoneNumber:string;
    email:string;
    website?:string
}
export type TLocation={
    street?:string;
    city?:string;
    state?:string;
    postalCode?:string;
    country?:string;
    latitude:number;
    longitude:number;
    
}
export type TClinic ={
    clinicId: string;
   clinicImage:string;
    clinicName:string;
    contact:TContact;
    location:TLocation;
    isDeleted:boolean
}