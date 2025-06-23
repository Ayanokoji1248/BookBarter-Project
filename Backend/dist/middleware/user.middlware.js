"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddlware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(400).json({
            message: "Token not provided",
        });
    }
    const decoded = (jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET));
    req.user = decoded.id;
    next();
};
exports.default = userMiddlware;
