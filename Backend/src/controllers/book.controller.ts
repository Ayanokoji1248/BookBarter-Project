import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import bookModel from "../models/book.model";
import userModel from "../models/user.model";
import requestModel from "../models/request.model";
const bookSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    condition: z.string(),
    availability: z.string(),
    price: z.number().optional(),
    description: z.string(),
    photo: z.string(),
})

export const createBook = async (req: Request, res: Response, next: NextFunction) => {


    try {
        const { title, author, genre, condition, availability, price, description, photo } = req.body

        const bookParse = bookSchema.safeParse(req.body);

        if (!bookParse.success) {
            res.status(400).json({
                message: "Validation Error",
                errors: bookParse.error.flatten().fieldErrors
            })
            return
        }

        const userId = req.user

        const book = await bookModel.create({
            title,
            author,
            genre,
            condition,
            availability,
            price,
            description,
            photo,
            owner: userId
        })

        res.status(200).json({
            message: "Book Created",
            book: book
        })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }

}


export const editBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, genre, condition, availability, price, description, photo, } = req.body;

        const id = req.params.bookId

        const bookValidation = bookSchema.safeParse(req.body);

        if (!bookValidation.success) {
            res.status(400).json({
                message: "Validation Error",
                errors: bookValidation.error.flatten().fieldErrors
            })
            return
        }

        const book = await bookModel.findByIdAndUpdate(id, {
            title,
            author,
            genre,
            condition,
            photo,
            availability,
            price,
            description,
        })

        res.status(200).json({
            message: "Book Edited",
            book: book,
        })
        return


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }

}

export const allBooks = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const books = await bookModel.find({}).populate("owner");
        res.status(200).json({
            books: books
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;

        await req.book.deleteOne();

        const requestBook = await requestModel.deleteMany({ book: id })

        res.status(200).json({
            message: "Book Deleted"
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getBookDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.bookId;
        const book = await bookModel.findById(id).populate({
            path: 'owner',
            select: "-password"
        });
        res.status(200).json({
            book: book
        })
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getUserBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user;

        const book = await bookModel.find({ owner: userId }).populate({
            path: "owner",
            select: "-password"
        });

        res.status(200).json({
            book: book
        })
        return

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}