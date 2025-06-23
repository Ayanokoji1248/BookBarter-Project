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
exports.verifyOwner = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const verifyOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.user;
        const bookId = req.params.bookId;
        if (!bookId || !mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                message: "Invalid Book Id",
            });
            return;
        }
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            res.status(404).json({
                message: "Book Not Found"
            });
            return;
        }
        // const user = await userModel.findById(id );
        if (book.owner.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.toString())) {
            res.status(403).json({
                message: "You are not the Owner"
            });
            return;
        }
        req.book = book;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.verifyOwner = verifyOwner;
