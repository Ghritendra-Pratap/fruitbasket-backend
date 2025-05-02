import express, { Request, Response } from 'express';
import User from '../modals/User'
import argon2 from 'argon2'

const router = express.Router();

// login
router.post('/login', async (req:Request , res:Response) => {
    const {email , password} = req.body
    try{
        const userExist = await User.findOne({
            where: {
                email: email
            }
        })


        if(userExist){
            if(await argon2.verify(userExist?.dataValues.password, password)){
                
                res.status(200).json({
                    message: 'Login Successfully',
                    data: userExist
                })
            }
            else{
                res.status(400).json({
                    message: 'Password does not match'
                })
            }
        }

        

    }catch(err){
        console.log(err)
    }
})

// register

router.post('/register', async (req:Request , res:Response) => {
    const {name , email , password , role} = req.body
    try{
        const userExist = await User.findOne({
            where: {
                email: email
            }
        })
        if(userExist){
            res.status(400).json({
                message: 'User already exist'
            })
        }
        
        else{
            const passwordHash = await argon2.hash(password)
            const user = await User.create({
                name: name,
                email: email,
                password: passwordHash,
                role: role
            })
            
            res.status(200).json({
                message: 'User created successfully',
                data: user
            })
        }
    }catch(err){
        console.log(err)
    }
})

export default router