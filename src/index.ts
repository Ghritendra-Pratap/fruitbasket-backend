import dotenv from 'dotenv';
import express  from 'express';
import AuthRoute from './routes/authRoute'
import UserRoute from './routes/userRoute'
import CategoryRoute from './routes/cateRoute'
import db from './config/connectDB'
import FruitRoute from './routes/fruitRoute'
import CartRoute from './routes/cartRoute'
import OrderRoute from './routes/orderRoute'
import PaymentRoute from './routes/paymentRoute'
import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001

console.log(process.env.RAZORPAY_KEY_ID)

db.sync().then(() => {
        console.log('Database synced');
    }).catch((error) => {
        console.error('Error syncing database:', error);
    });

app.use("/api/auth" , AuthRoute)
app.use("/api/users" , UserRoute)
app.use("/api/categories", CategoryRoute)
app.use("/api/fruits", FruitRoute)
app.use("/api/cart", CartRoute)
app.use("/api/orders", OrderRoute)
app.use("/api/payment", PaymentRoute)

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})