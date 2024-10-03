/* eslint-disable no-unused-vars */
import { Model } from "mongoose"
import { USER_ROLE } from "./User.constant"


export type TUser = {
    email:string;
    password:string,
 image:string;
    role: 'admin' | 'patient' | 'doctor' | 'nurse' 
    status: 'active' | 'blocked' | 'in-progress'
    isDeleted: boolean,
    notification: string[]
    seenNotification: boolean,
    bloodDonor: boolean,
    otp:string,
    otpExpiration:number | undefined
}
export type TLoginUser ={
    email:string;
    password:string
}


export interface UserStatic extends Model<TUser>{
    isPasswordMatched(
        plainTextPassWord:string,
        hashedPassword: string
    ) : Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE; 