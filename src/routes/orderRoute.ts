import express, { Request, Response} from 'express'
import Order from '../modals/Order'
const router = express.Router()

router.get('/:id' , async(req:Request , res:Response) => {
    const id = req.params.id
    const order = await Order.findAll({
        where: {
            userId: id
        }
    })
    res.status(200).json(order)
})

router.post('/:id' , async (req:Request , res:Response) => {
    const id = req.params.id
    const {fruitId , quantity } = req.body
    
    const order = await Order.create({
        userId: id,
        fruitId: fruitId,
        quantity: quantity
    })
    console.log(order)
    res.status(200).json(order)
})

export default router