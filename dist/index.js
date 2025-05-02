"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cateRoute_1 = __importDefault(require("./routes/cateRoute"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const fruitRoute_1 = __importDefault(require("./routes/fruitRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5001;
console.log(process.env.RAZORPAY_KEY_ID);
connectDB_1.default.sync().then(() => {
    console.log('Database synced');
}).catch((error) => {
    console.error('Error syncing database:', error);
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/users", userRoute_1.default);
app.use("/api/categories", cateRoute_1.default);
app.use("/api/fruits", fruitRoute_1.default);
app.use("/api/cart", cartRoute_1.default);
app.use("/api/orders", orderRoute_1.default);
app.use("/api/payment", paymentRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
