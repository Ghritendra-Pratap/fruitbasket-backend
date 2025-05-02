import express, { Request, Response } from 'express';
import Fruit from '../modals/Fruit';
import Category from '../modals/Category';

const router = express.Router();

router.post("/" , async (req:Request , res:Response) => {
    const {name , price , description , image , quantity, categoryid} = req.body

    try{

        const category = await Category.findByPk(categoryid)
        if(!category){
            res.status(400).json({
                message: 'Category does not exist'
            })
        }
        const fruit = await Fruit.create({
            name: name,
            price: price,
            description: description,
            image: image,
            quantity: quantity,
            categoryId: categoryid,
            
        })
        res.status(200).json({
            message: 'Fruit created successfully',
            data: fruit
        })
    }catch(err){
        console.log(err)
    }
})

router.get("/" , async (req:Request , res:Response) => {
    try{
        const fruits = await Fruit.findAll()
        res.status(200).json(
            fruits
        )
    }catch(err){
        console.log(err)
    }
})

router.get("/:id" , async (req:Request , res:Response) => {
    try{
        const fruit = await Fruit.findByPk(req.params.id)
        res.status(200).json(
            fruit
        )
    }catch(err){
        console.log(err)
    }
})

router.get("/category/:id" , async (req:Request , res:Response) => {
    try{
        const fruits = await Fruit.findAll({
            where: {
                categoryId: req.params.id
            }
        })
        res.status(200).json(
            fruits
        )
    }catch(err){
        console.log(err)
    }
})

router.put("/:id" , async (req:Request , res:Response) => {
    const {name , price , description , image , quantity, categoryid} = req.body
    try{
        
        const fruit = await Fruit.findByPk(req.params.id)
        fruit?.update({
            name: name,
            price: price,
            description: description,
            image: image,
            quantity: quantity,
            categoryId: categoryid,
            
        })
        res.status(200).json({
            message: 'Fruit updated successfully',
            data: fruit
        })
    }catch(err){
        console.log(err)
    }
})

router.delete("/:id" , async (req:Request , res:Response) => {
    try{
        const fruit = await Fruit.findByPk(req.params.id)
        fruit?.destroy()
        res.status(200).json({
            message: 'Fruit deleted successfully'
        })
    }catch(err){
        console.log(err)
    }
})

export default router