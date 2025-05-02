import express , {Request, Response} from 'express';
import User from '../modals/User';

const router = express.Router();

// get all users
router.get('/', async (req:Request, res:Response) => {
    try{
        const users = await User.findAll()
    res.status(200).json(
        users
    )
    }catch(err){
        console.log(err)
    }
    
})

//get one user

router.get('/:id', async (req:Request, res:Response) => {
    try{
        const user = await User.findByPk(req.params.id)
    res.status(200).json(
        user
    )
    }catch(err){
        console.log(err)
    }
    
})

router.put('/:id', async (req:Request, res:Response) => {
    try{
        const user = await User.update(req.body , {
            where: {
                id: req.params.id
            }
        })
    res.status(200).json(
        user
    )
    }catch(err){
        console.log(err)
    }
})

router.delete('/:id', async (req:Request, res:Response) => {
    try{
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        })
    res.status(200).json(
        user
    )
    }catch(err){
        console.log(err)
    }
    
})


export default router