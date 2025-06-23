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
exports.getUserBooks = exports.getBookDetails = exports.deleteBook = exports.allBooks = exports.editBook = exports.createBook = void 0;
const zod_1 = require("zod");
const book_model_1 = __importDefault(require("../models/book.model"));
const request_model_1 = __importDefault(require("../models/request.model"));
const bookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    condition: zod_1.z.string(),
    availability: zod_1.z.string(),
    price: zod_1.z.number().optional(),
    description: zod_1.z.string(),
    photo: zod_1.z.string(),
});
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, condition, availability, price, description, photo } = req.body;
        const bookParse = bookSchema.safeParse(req.body);
        if (!bookParse.success) {
            res.status(400).json({
                message: "Validation Error",
                errors: bookParse.error.flatten().fieldErrors
            });
            return;
        }
        const userId = req.user;
        const book = yield book_model_1.default.create({
            title,
            author,
            genre,
            condition,
            availability,
            price,
            description,
            photo,
            owner: userId
        });
        res.status(200).json({
            message: "Book Created",
            book: book
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
exports.createBook = createBook;
const editBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, condition, availability, price, description, photo, } = req.body;
        const id = req.params.bookId;
        const bookValidation = bookSchema.safeParse(req.body);
        if (!bookValidation.success) {
            res.status(400).json({
                message: "Validation Error",
                errors: bookValidation.error.flatten().fieldErrors
            });
            return;
        }
        const book = yield book_model_1.default.findByIdAndUpdate(id, {
            title,
            author,
            genre,
            condition,
            photo,
            availability,
            price,
            description,
        });
        res.status(200).json({
            message: "Book Edited",
            book: book,
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
exports.editBook = editBook;
const allBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.default.find({}).populate("owner");
        res.status(200).json({
            books: books
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
exports.allBooks = allBooks;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield req.book.deleteOne();
        const requestBook = yield request_model_1.default.deleteMany({ book: id });
        res.status(200).json({
            message: "Book Deleted"
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
exports.deleteBook = deleteBook;
const getBookDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.default.findById(id).populate({
            path: 'owner',
            select: "-password"
        });
        res.status(200).json({
            book: book
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
exports.getBookDetails = getBookDetails;
const getUserBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const book = yield book_model_1.default.find({ owner: userId }).populate({
            path: "owner",
            select: "-password"
        });
        res.status(200).json({
            book: book
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
exports.getUserBooks = getUserBooks;
