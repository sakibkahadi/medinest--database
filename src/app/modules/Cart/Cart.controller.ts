import httpStatus from "http-status"
import sendResponse from "../../utils/sendResponse"
import { CartServices } from "./Cart.service"
import catchAsync from "../../utils/catchAsync"

const getAllCart = catchAsync(async (req,res)=>{
    const {email} = req.params
    const result = await CartServices.getCartFromDB(email)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'cart  are retrieved Successfully',
        data:result
    })
})
const createCart = catchAsync(async (req,res)=>{
    
    const result = await CartServices.createCartIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: 'create cart Successfully',
        data:result
    })
})
const deleteCartItem = catchAsync(async (req, res) => {
    const { email } = req.params;
    
    
    
    const result = await CartServices.deleteCartItemFromDB(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product ID deleted successfully',
        data: result,
    });
});

export const CartControllers ={
    createCart, getAllCart, deleteCartItem
}