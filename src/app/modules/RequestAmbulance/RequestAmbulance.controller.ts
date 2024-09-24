import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { RequestAmbulanceServices } from "./RequestAmbulance.service"

const createRequestAmbulance = catchAsync(async (req,res)=>{
    const result = await RequestAmbulanceServices.createRequestAmbulanceIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulance Created Successfully',
        data:result
    })
})
const getAllRequestAmbulances = catchAsync(async (req,res)=>{
    const result = await RequestAmbulanceServices.getAllRequestAmbulancesFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulances  are retrieved Successfully',
        data:result
    })
})

export const RequestAmbulanceControllers = {
    createRequestAmbulance, getAllRequestAmbulances
}
