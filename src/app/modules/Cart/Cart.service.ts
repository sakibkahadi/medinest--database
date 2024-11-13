import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { MedicineModel } from "../Medicine/Medicine.model"
import { TCart } from "./Cart.interface"
import { CartModel } from "./Cart.model"


const createCartIntoDB = async(payload:TCart)=>{
  const isMedicineExist = await MedicineModel.findById(payload?.productId)
  if(!isMedicineExist){
    throw new AppError(httpStatus.NOT_FOUND, 'medicine is not found')
  }
    const result = await CartModel.create(payload)
    return result
}
const getCartFromDB = async (email: string) => {
  const result = await CartModel.aggregate([
    { 
      $match: { email: email } 
    },
    {
      $group: {
        _id: '$productId',
        totalQuantity: { $sum: 1 }, // Sum up the occurrences of each productId
        productInfo: { $first: '$$ROOT' } // Get the first matching document as product info
      }
    },
    {
      $lookup: {
        from: 'medicines', // Name of the medicine collection (adjust if necessary)
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails'
      }
    },
    {
      $unwind: '$productDetails' // Unwind to merge the product details into the object
    },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        totalQuantity: 1,
        productDetails: 1,
        email: '$productInfo.email'
      }
    }
  ]);

  return result;
};
const deleteCartItemFromDB  = async (email:string) => {
const result = await CartModel.deleteMany({email:email})
console.log(result)
return result
};


export const CartServices = {
  createCartIntoDB,getCartFromDB,deleteCartItemFromDB
}