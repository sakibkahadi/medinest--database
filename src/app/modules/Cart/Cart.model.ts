

import  { model, Schema } from "mongoose"
import { TCart } from "./Cart.interface"





const cartSchema = new Schema<TCart>({
    productId:{
       type: Schema.Types.ObjectId, ref: 'Medicine',
        required:[true,  'product id is required'], 
    },
    
    email:{
        type:String,
        required:[true, ' is required'],
       
    },

},)

export const CartModel = model<TCart>('Cart', cartSchema)

