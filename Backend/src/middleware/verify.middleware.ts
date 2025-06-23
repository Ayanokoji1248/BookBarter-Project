import { Request, Response, NextFunction } from "express"
import userModel from "../models/user.model";
import bookModel from "../models/book.model";
import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            book: mongoose.Document
        }
    }
}

export const verifyOwner = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.user;

        const bookId = req.params.bookId;

        if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                message: "Invalid Book Id",
            })
            return
        }

        const book = await bookModel.findById(bookId);

        if (!book) {
            res.status(404).json({
                message: "Book Not Found"
            })
            return
        }

        // const user = await userModel.findById(id );

        if (book.owner.toString() !== req.user?.toString()) {
            res.status(403).json({
                message: "You are not the Owner"
            })
            return
        }
        req.book = book
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}