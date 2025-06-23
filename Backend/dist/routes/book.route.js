"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middlware_1 = __importDefault(require("../middleware/user.middlware"));
const book_controller_1 = require("../controllers/book.controller");
const verify_middleware_1 = require("../middleware/verify.middleware");
const bookRouter = (0, express_1.Router)();
// Create Book
bookRouter.post('/', user_middlware_1.default, book_controller_1.createBook);
// Edit Book
bookRouter.put('/:bookId', user_middlware_1.default, verify_middleware_1.verifyOwner, book_controller_1.editBook);
// Get All Book
bookRouter.get('/', book_controller_1.allBooks);
// Delete Book
bookRouter.delete('/:bookId', user_middlware_1.default, verify_middleware_1.verifyOwner, book_controller_1.deleteBook);
// Get specific Book
bookRouter.get('/:bookId', book_controller_1.getBookDetails);
// Get user books
bookRouter.get('/me/books', user_middlware_1.default, book_controller_1.getUserBooks);
exports.default = bookRouter;
