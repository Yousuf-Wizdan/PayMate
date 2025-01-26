"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://pay-mate-gamma.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/v1', routes_1.default);
app.listen(3000, () => {
    (0, dbConnect_1.default)();
    console.log('Server Running on PORT:3000');
});
