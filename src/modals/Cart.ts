import db from "../config/connectDB"
import { DataTypes } from "sequelize"
import User from "./User";
import Fruit from "./Fruit";

const Cart = db.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },
        allowNull: false
    },
    fruitId: {
        type: DataTypes.INTEGER,
        references: {
            model: Fruit,
            key: 'id'
        },
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



export default Cart