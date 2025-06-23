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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const registerUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2).max(50),
    // lastName: z.string().min(2).max(50),
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters")
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Email format"),
    password: zod_1.z.string()
});
function registerUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, email, password, location } = req.body;
            const userParse = registerUserSchema.safeParse(req.body);
            if (!userParse.success) {
                res.status(400).json({
                    error: userParse.error.flatten().fieldErrors,
                    message: "All Fields are required"
                });
                return;
            }
            const userExist = yield user_model_1.default.findOne({ email });
            if (userExist) {
                res.status(400).json({
                    message: "User Already Exist"
                });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield user_model_1.default.create({
                fullName,
                email,
                password: hashedPassword,
                location,
            });
            const _a = user.toObject(), { password: _ } = _a, userData = __rest(_a, ["password"]);
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(201).json({
                user: userData,
                token: token
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    });
}
function loginUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const emailParse = loginUserSchema.safeParse(req.body);
            if (!emailParse.success) {
                res.status(401).json({
                    message: "Invalid Credentials",
                    errors: emailParse.error.flatten().fieldErrors
                });
                return;
            }
            const userExist = yield user_model_1.default.findOne({ email });
            if (!userExist) {
                res.status(400).json({
                    message: "Invalid Credentials"
                });
                return;
            }
            const comparePass = yield bcrypt_1.default.compare(password, userExist.password);
            if (!comparePass) {
                res.status(400).json({
                    message: "Invalid Credentials"
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: userExist._id }, process.env.JWT_SECRET);
            const _a = userExist.toObject(), { password: _ } = _a, user = __rest(_a, ["password"]);
            res.status(200).json({
                user,
                token
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
            return;
        }
    });
}
