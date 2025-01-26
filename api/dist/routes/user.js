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
const userSchema_1 = require("../schemas/userSchema");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const userRouter = express_1.default.Router();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = userSchema_1.userSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: 'Incorrect Inputs',
        });
        return;
    }
    const existingUser = yield db_1.UserModel.findOne({
        username: req.body.username
    });
    if (existingUser) {
        res.status(411).json({
            message: 'Username Already taken'
        });
        return;
    }
    const user = yield db_1.UserModel.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = user._id;
    yield db_1.AccountModel.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });
    res.json({
        message: "User Created Successfully!",
    });
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = userSchema_1.signInSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: 'Incorrect Input'
        });
        return;
    }
    const user = yield db_1.UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, config_1.JWT_SECRET);
        res.json({
            token
        });
        return;
    }
    res.status(411).json({
        message: 'Error While Logging!'
    });
}));
userRouter.put('/', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { success } = userSchema_1.updateUserSchema.safeParse(req.body);
    if (!success) {
        res.status(403).json({
            message: 'Incorrect Input'
        });
        return;
    }
    yield db_1.UserModel.updateOne({
        _id: userId
    }, req.body);
    res.json({
        message: "Updated Successfully!"
    });
}));
userRouter.get('/', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.UserModel.findOne({
        _id: req.userId
    });
    if (!user) {
        res.json({
            message: "No User Found!"
        });
        return;
    }
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username
    });
}));
userRouter.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = req.query.filter || '';
    const users = yield db_1.UserModel.find({
        $or: [
            {
                firstName: {
                    '$regex': filter
                }
            },
            {
                lastName: {
                    '$regex': filter
                }
            }
        ]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
}));
exports.default = userRouter;
