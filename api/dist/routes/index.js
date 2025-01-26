"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const account_1 = __importDefault(require("./account"));
const rootRouter = express_1.default.Router();
rootRouter.use('/user', user_1.default);
rootRouter.use('/account', account_1.default);
exports.default = rootRouter;
