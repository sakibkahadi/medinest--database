import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { PaymentServices } from "./Payment.service"

const createPayment = catchAsync(async (req,res)=>{
    
    const result = await PaymentServices.createPaymentIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Payment created Successfully',
        data:result
    })
})
const getAllPayment = catchAsync(async (req,res,)=>{
    
    const result = await PaymentServices.getAllPaymentFromDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Payment are created Successfully',
        data:result
    })
})
const getPaymentByUser = catchAsync(async (req,res,)=>{
    const {email} = req.params
    const result = await PaymentServices.getPaymentByUserFromDB(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'Payment are created Successfully',
        data:result
    })
})



const deletePayment = catchAsync(async (req,res)=>{
    const {id} = req.params
        const result = await PaymentServices.deletePaymentFromDB(id)
        sendResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message: 'Payment deleted Successfully',
            data:result
        })
    })

export const PaymentControllers = {
     createPayment, getAllPayment, deletePayment,  getPaymentByUser
}