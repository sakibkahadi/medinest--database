import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/User.interface";
import catchAsync from "../utils/catchAsync";

import  Jwt, { JwtPayload }  from "jsonwebtoken";
import config from "../config";
import { UserModel } from "../modules/User/User.model";
import httpStatus from "http-status";
export const auth = (...requireRoles:TUserRole[])=>{
    return catchAsync(async(req:Request, res:Response, next: NextFunction)=>{

        const getAuthorizationHeaders = req.headers.authorization;
        if(!getAuthorizationHeaders || !getAuthorizationHeaders.startsWith('Bearer ')){
            return res.status(401).json({
                success:false,
                statusCode: 401,
                message: 'You have no access to this route format'
            })
        }
        //Remove Bearer 
        const token = getAuthorizationHeaders.split(' ')[1];
        if(!token){
            return res.status(401).json({
                success:false,
                statusCode: 401,
                message: 'You have no access to this route token'
            })
        }

        try{
            const decoded = Jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload;
            const {role, userId} = decoded
            const user = await UserModel.findById(userId)
            if(!user){
                return res.status(401).json({
                    success:false,
                    statusCode: 401,
                    message: 'You have no access to this route jwt verify'
                }) 
            }
            const isDeleted = user?.isDeleted
            
            if(isDeleted){
                return res.status(401).json({
                    success:false,
                    statusCode: httpStatus.FORBIDDEN,
                    message: 'This user is already deleted'
                }) 
            }
            const userStatus = user?.status
            if(userStatus === 'blocked'){
                return res.status(401).json({
                    success:false,
                    statusCode: httpStatus.FORBIDDEN,
                    message: 'This user is Blocked'
                }) 
            }
            if(requireRoles && !requireRoles.includes(role)){
                return res.status(401).json({
                    success:false,
                    statusCode: 401,
                    message: 'You have no access to this route requied roels'
                })
            }
            req.user = decoded;
            
            next()
        } catch(err){
            return res.status(401).json({
                success:false,
                statusCode: 401,
                message: 'You have no access to this route'
            })
        }

    })
}