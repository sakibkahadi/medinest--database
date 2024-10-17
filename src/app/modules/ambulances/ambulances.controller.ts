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
    
    const result = await AmbulanceServices.getAllAmbulancesFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulances  are retrieved Successfully',
        data:result
    })
})

const getSingleAmbulance = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AmbulanceServices.getSingleAmbulanceFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulance retrieve successfully',
        data:result
    })
})
const deleteAmbulance = catchAsync(async (req,res)=>{
    const {id} = req.params
    const result = await AmbulanceServices.deleteAmbulanceFromDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Ambulance deleted successfully',
        data:result
    })
})
const updateAmbulance = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await AmbulanceServices.updateAmbulanceIntoDB(id, req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Ambulance  updated Successfully',
            data:result
        })
    })


export const ambulanceControllers = {
    createAmbulance, getAllAmbulances, getSingleAmbulance, deleteAmbulance, updateAmbulance
}