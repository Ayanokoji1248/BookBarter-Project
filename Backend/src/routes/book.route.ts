import { Router } from "express"
import userMiddlware from "../middleware/user.middlware";
import { allBooks, createBook, deleteBook, editBook, getBookDetails, getUserBooks } from "../controllers/book.controller";
import { verifyOwner } from "../middleware/verify.middleware";
const bookRouter = Router();




// Create Book
bookRouter.post('/', userMiddlware, createBook)

// Edit Book
bookRouter.put('/:bookId', userMiddlware, verifyOwner, editBook)

// Get All Book
bookRouter.get('/', allBooks)

// Delete Book
bookRouter.delete('/:bookId', userMiddlware, verifyOwner, deleteBook)

// Get specific Book
bookRouter.get('/:bookId', getBookDetails);

// Get user books
bookRouter.get('/me/books', userMiddlware, getUserBooks);

export default bookRouter;