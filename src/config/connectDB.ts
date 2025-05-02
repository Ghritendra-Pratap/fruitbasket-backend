import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const db = new Sequelize('fruitbasket', 'root', `${process.env.DB_PASSWORD}`, {
    host: 'localhost',
    dialect: 'mysql'
})
const connectDB = ()=>{
    db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))
}

connectDB()


export default db