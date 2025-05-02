"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../config/connectDB"));
const sequelize_1 = require("sequelize");
const Category_1 = __importDefault(require("./Category"));
const Cart_1 = __importDefault(require("./Cart"));
const Order_1 = __importDefault(require("./Order"));
const Fruit = connectDB_1.default.define('fruits', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Category_1.default,
            key: 'id'
        },
        allowNull: false
    },
    healthBenefits: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});
Fruit.hasMany(Cart_1.default, { foreignKey: 'fruitId' });
Cart_1.default.belongsTo(Fruit, { foreignKey: 'fruitId' });
Fruit.hasMany(Order_1.default, { foreignKey: 'orderId' });
Order_1.default.belongsTo(Fruit, { foreignKey: 'orderId' });
Fruit.belongsTo(Category_1.default, { foreignKey: 'categoryId' });
Category_1.default.hasMany(Fruit, { foreignKey: 'categoryId' });
exports.default = Fruit;
