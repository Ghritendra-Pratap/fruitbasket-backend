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
const Cart_1 = __importDefault(require("../modals/Cart"));
const Fruit_1 = __importDefault(require("../modals/Fruit"));
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield Cart_1.default.findAll({
            where: {
                userId: req.params.id,
            },
            include: [
                {
                    model: Fruit_1.default, // Include the Fruit model
                    required: true, // This ensures an INNER JOIN (only carts with associated fruits are returned)
                },
            ],
        });
        res.status(200).json(cartItems);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, fruitId, quantity } = req.body;
    const fruitExist = yield Cart_1.default.findOne({
        where: {
            userId: userId,
            fruitId: fruitId
        }
    });
    console.log("fruitExist : ", fruitExist === null || fruitExist === void 0 ? void 0 : fruitExist.dataValues);
    try {
        if (fruitExist) {
            fruitExist.update({
                quantity: (fruitExist === null || fruitExist === void 0 ? void 0 : fruitExist.dataValues.quantity) + 1
            });
            res.status(200).json({
                message: 'Cart updated successfully',
                data: fruitExist
            });
        }
        else {
            const cart = yield Cart_1.default.create({
                userId: userId,
                fruitId: fruitId,
                quantity: quantity || 1
            });
            res.status(200).json({
                message: 'Cart created successfully',
                data: cart
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.default.findByPk(req.params.id);
        cart === null || cart === void 0 ? void 0 : cart.destroy();
        res.status(200).json({
            message: 'Cart deleted successfully'
        });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
