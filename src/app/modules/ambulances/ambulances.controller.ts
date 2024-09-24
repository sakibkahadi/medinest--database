import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AmbulanceServices } from "./ambulances.service";


const createAmbulance = catchAsync(async (req,res)=>{
    const result = await AmbulanceServices.createAmbulanceIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulance Created Successfully',
        data:result
    })
})
const getAllAmbulances = catchAsync(async (req,res)=>{
    console.log(req.headers)
    const result = await AmbulanceServices.getAllAmbulancesFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulances  are retrieved Successfully',
        data:result
    })
})


export const ambulanceControllers = {
    createAmbulance, getAllAmbulances
}