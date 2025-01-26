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
const userMiddleware_1 = require("../middlewares/userMiddleware");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const accountRouter = express_1.default.Router();
accountRouter.get('/balance', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAccount = yield db_1.AccountModel.findOne({
        userId: req.userId
    });
    res.json({
        balance: userAccount === null || userAccount === void 0 ? void 0 : userAccount.balance
    });
}));
accountRouter.post('/transfer', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        const { to, amount } = req.body;
        const account = yield db_1.AccountModel.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            yield session.abortTransaction();
            res.status(403).json({
                message: "Insufficent Balance"
            });
            return;
        }
        const toAccount = yield db_1.AccountModel.findOne({ userId: to }).session(session);
        if (!toAccount) {
            yield session.abortTransaction();
            res.status(400).json({
                message: 'Invalid Account'
            });
            return;
        }
        //Perform Transaction
        yield db_1.AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        yield db_1.AccountModel.updateOne({ userId: to }, { $inc: { balance: +amount } }).session(session);
        yield session.commitTransaction();
        res.json({
            message: "Transfer Successfull"
        });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = accountRouter;
