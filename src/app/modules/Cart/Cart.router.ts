import express from 'express'

import validateRequest from '../../middlewares/validateRequest';
import { CartControllers } from './Cart.controller';





const router = express.Router()


router.get('/:email',  CartControllers.getAllCart )
router.post('/', CartControllers.createCart)

router.delete('/:email', CartControllers.deleteCartItem)

export const CartRoutes = router;