import express, { Request, Response } from 'express';
import Cart from '../modals/Cart';
import Fruit from '../modals/Fruit';
import User from '../modals/User';
const router = express.Router();

router.get("/:id" , async (req:Request , res:Response) => {
    try {
        const cartItems = await Cart.findAll({
            where: {
                userId: req.params.id,
            },
            include: [
                {
                    model: Fruit, // Include the Fruit model
                    required: true, // This ensures an INNER JOIN (only carts with associated fruits are returned)
                },
            ],
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
    


router.post("/" , async (req:Request , res:Response) => {
    const {userId , fruitId, quantity} = req.body
    const fruitExist = await Cart.findOne({
        where: {
            userId: userId,
            fruitId: fruitId
        }
    })
    console.log("fruitExist : " , fruitExist?.dataValues)
    try{
        if(fruitExist){
            fruitExist.update({
                quantity:  fruitExist?.dataValues.quantity + 1
            })
            res.status(200).json({
                message: 'Cart updated successfully',
                data: fruitExist
            })
        }
        else{
            const cart = await Cart.create({
                userId: userId,
                fruitId: fruitId,
                quantity: quantity || 1
            })
            res.status(200).json({
                message: 'Cart created successfully',
                data: cart
            })
        }
        
    }catch(err){
        console.log(err)
    }
})

router.delete("/:id" , async (req:Request , res:Response) => {
    try{
        const cart = await Cart.findByPk(req.params.id)
        cart?.destroy()
        res.status(200).json({
            message: 'Cart deleted successfully'
        })
    }catch(err){
        console.log(err)
    }
})

export default router
