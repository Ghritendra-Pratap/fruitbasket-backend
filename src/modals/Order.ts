import { DataTypes } from "sequelize";
import db from "../config/connectDB";

const Order = db.define('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        },
        allowNull: false
    },
    fruitId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'fruits',
            key: 'id'
        },
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
});

export default Order