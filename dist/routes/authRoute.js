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
const User_1 = __importDefault(require("../modals/User"));
const argon2_1 = __importDefault(require("argon2"));
const router = express_1.default.Router();
// login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExist = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (userExist) {
            if (yield argon2_1.default.verify(userExist === null || userExist === void 0 ? void 0 : userExist.dataValues.password, password)) {
                res.status(200).json({
                    message: 'Login Successfully',
                    data: userExist
                });
            }
            else {
                res.status(400).json({
                    message: 'Password does not match'
                });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}));
// register
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    try {
        const userExist = yield User_1.default.findOne({
            where: {
                email: email
            }
        });
        if (userExist) {
            res.status(400).json({
                message: 'User already exist'
            });
        }
        else {
            const passwordHash = yield argon2_1.default.hash(password);
            const user = yield User_1.default.create({
                name: name,
                email: email,
                password: passwordHash,
                role: role
            });
            res.status(200).json({
                message: 'User created successfully',
                data: user
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = router;
