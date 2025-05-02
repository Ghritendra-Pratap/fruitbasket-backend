"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const Payment_1 = __importDefault(require("../modals/Payment"));
const router = express_1.default.Router();
dotenv_1.default.config();
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;
const razorpayInstance = new razorpay_1.default({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET,
});
router.post('/order', (req, res) => {
    const { amount } = req.body;
    console.log(amount);
    try {
        const options = {
            amount: Number(amount * 100), // converting amount to paise (sub-unit)
            currency: 'INR',
            receipt: crypto_1.default.randomBytes(10).toString('hex'),
        };
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Something Went Wrong!' });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error!' });
        console.log(error);
    }
});
//
router.post('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // console.log("req.body", req.body);
    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        // Create ExpectedSign
        const expectedSign = crypto_1.default.createHmac("sha256", RAZORPAY_SECRET || "bshjfsjhdjhbj")
            .update(sign.toString())
            .digest("hex");
        // console.log(razorpay_signature === expectedSign);
        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;
        // Condition 
        if (isAuthentic) {
            const payment = yield Payment_1.default.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            // Send Message 
            res.json({
                message: "Payement Successfully"
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}));
exports.default = router;
