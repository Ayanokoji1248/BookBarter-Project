"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middlware_1 = __importDefault(require("../middleware/user.middlware"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/me', user_middlware_1.default, user_controller_1.getUserProfile);
exports.default = userRouter;
