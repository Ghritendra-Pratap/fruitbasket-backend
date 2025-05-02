import db from "../config/connectDB"
import { DataTypes } from "sequelize"
import Category from "./Category"
import Cart from "./Cart";
import Order from "./Order";

const Fruit = db.define('fruits', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        allowNull: false
    },
    healthBenefits:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
})

Fruit.hasMany(Cart, { foreignKey: 'fruitId' });
Cart.belongsTo(Fruit, { foreignKey: 'fruitId' });

Fruit.hasMany(Order, { foreignKey: 'orderId' });
Order.belongsTo(Fruit, { foreignKey: 'orderId' });

Fruit.belongsTo(Category, { foreignKey: 'categoryId' })
Category.hasMany(Fruit, { foreignKey: 'categoryId' })

export default Fruit