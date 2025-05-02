"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("../config/connectDB"));
const sequelize_1 = require("sequelize");
const PaymentSchema = connectDB_1.default.define('payment', {
    razorpay_order_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    razorpay_payment_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    razorpay_signature: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: Date.now
    },
});
exports.default = PaymentSchema;
