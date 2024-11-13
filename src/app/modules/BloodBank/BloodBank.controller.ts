import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import catchAsync from "../../utils/catchAsync"
import { BloodBankServices } from "./BloodBank.service"


// BloodBank
const createBloodBank = catchAsync(async (req,res)=>{

    const result = await BloodBankServices.createBloodBankIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'BloodBank Created Successfully',
        data:result
    })
})
const getAllBloodBank = catchAsync(async (req,res)=>{

    const result = await BloodBankServices.getAllBloodBankFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'BloodBank are  retrieve Successfully',
        data:result
    })
})
const getSingleBloodBank = catchAsync(async (req,res)=>{
const {id} = req.params
    const result = await BloodBankServices.getSingleBloodBankFromDb(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'BloodBank is  retrieve Successfully',
        data:result
    })
})

const updateBloodBank = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await BloodBankServices.updateBloodBankIntoDB(id, req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'BloodBank  updated Successfully',
            data:result
        })
    })
const updateBloodQuantity = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await BloodBankServices.updateBloodQuantityIntoDB(id, req.body)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Quantity  updated Successfully',
            data:result
        })
    })
const deleteBloodBank = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await BloodBankServices.deleteBloodBankFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'BloodBank deleted Successfully',
            data:result
        })
    })


export const BloodBankControllers = {
    createBloodBank, updateBloodBank, getSingleBloodBank, getAllBloodBank,  deleteBloodBank, updateBloodQuantity
}