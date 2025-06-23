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
exports.getUserProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user;
        if (!id || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        const userData = yield user_model_1.default.findById(id).select("-password").lean();
        if (!userData) {
            res.status(404).json({
                message: "Invalid User"
            });
            return;
        }
        // const { password: _, ...user } = userData;
        res.status(200).json(userData);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.getUserProfile = getUserProfile;
