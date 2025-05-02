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
const Fruit_1 = __importDefault(require("../modals/Fruit"));
const Category_1 = __importDefault(require("../modals/Category"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, quantity, categoryid } = req.body;
    try {
        const category = yield Category_1.default.findByPk(categoryid);
        if (!category) {
            res.status(400).json({
                message: 'Category does not exist'
            });
        }
        const fruit = yield Fruit_1.default.create({
            name: name,
            price: price,
            description: description,
            image: image,
            quantity: quantity,
            categoryId: categoryid,
        });
        res.status(200).json({
            message: 'Fruit created successfully',
            data: fruit
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fruits = yield Fruit_1.default.findAll();
        res.status(200).json(fruits);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fruit = yield Fruit_1.default.findByPk(req.params.id);
        res.status(200).json(fruit);
    }
    catch (err) {
        console.log(err);
    }
}));
router.get("/category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fruits = yield Fruit_1.default.findAll({
            where: {
                categoryId: req.params.id
            }
        });
        res.status(200).json(fruits);
    }
    catch (err) {
        console.log(err);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, quantity, categoryid } = req.body;
    try {
        const fruit = yield Fruit_1.default.findByPk(req.params.id);
        fruit === null || fruit === void 0 ? void 0 : fruit.update({
            name: name,
            price: price,
            description: description,
            image: image,
            quantity: quantity,
            categoryId: categoryid,
        });
        res.status(200).json({
            message: 'Fruit updated successfully',
            data: fruit
        });
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fruit = yield Fruit_1.default.findByPk(req.params.id);
        fruit === null || fruit === void 0 ? void 0 : fruit.destroy();
        res.status(200).json({
            message: 'Fruit deleted successfully'
        });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
