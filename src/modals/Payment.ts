
import db from "../config/connectDB";
import { DataTypes } from "sequelize";


const PaymentSchema = db.define('payment', {
    razorpay_order_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    razorpay_payment_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    razorpay_signature: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
})

export default PaymentSchema