import express, { Request, Response } from 'express';
import Category from '../modals/Category';

const router = express.Router();

router.post('/' , async (req:Request , res:Response) => {
    const {name} = req.body
    try{
        const category = await Category.create({
            name: name
        })
        res.status(200).json({
            message: 'Category created successfully',
            data: category
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/' , async (req:Request , res:Response) => {
    try{
        const categories = await Category.findAll()
        res.status(200).json(
            categories
        )
    }catch(err){
        console.log(err)
    }
})

router.get('/:id' , async (req:Request , res:Response) => {
    try{
        const category = await Category.findByPk(req.params.id)
        res.status(200).json(
            category
        )
    }catch(err){
        console.log(err)
    }
})

export default router