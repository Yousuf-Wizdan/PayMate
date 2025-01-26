"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.signInSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string().min(6),
    firstName: zod_1.default.string().max(50),
    lastName: zod_1.default.string().max(50)
});
exports.signInSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string().min(6)
});
exports.updateUserSchema = zod_1.default.object({
    password: zod_1.default.optional(zod_1.default.string().min(6)),
    firstName: zod_1.default.optional(zod_1.default.string().max(50)),
    lastName: zod_1.default.optional(zod_1.default.string().max(50))
});
