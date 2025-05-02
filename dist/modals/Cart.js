"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../config/connectDB"));
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const Fruit_1 = __importDefault(require("./Fruit"));
const Cart = connectDB_1.default.define('cart', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: User_1.default,
            key: 'id'
        },
        allowNull: false
    },
    fruitId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Fruit_1.default,
            key: 'id'
        },
        allowNull: false
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
exports.default = Cart;
