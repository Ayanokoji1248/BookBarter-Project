import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import bookModel from "../models/book.model";
import userModel from "../models/user.model";
import requestModel from "../models/request.model";

export const requestByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = req.params.bookId;

        const { requestMessage } = req.body

        if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                message: "Invalid Book Id"
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

        const requestAlready = await requestModel.findOne({
            $and: [
                { requester: req.user },
                { book: bookId }
            ]
        })
        // console.log(requestAlready)
        if (requestAlready) {
            res.status(400).json({
                message: "Book Already requested"
            })
            return
        }

        const userId = req.user;
        const user = await userModel.findById(userId);

        if (userId?.toString() === book.owner.toString()) {
            res.status(400).json({
                message: "You cannot request your own book"
            })
            return

        }

        const request = await requestModel.create({
            requestMessage,
            requester: userId,
            reciever: book.owner,
            book: bookId
        })

        user?.requestMade.push(request._id);
        await user?.save();


        res.status(200).json({
            message: "Request Made Successfully",
            request
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

export const requestsOfUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user;
        const user = await userModel.findById(userId);

        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        const request = await requestModel.find({ requester: userId }).populate([
            {
                path: "reciever",
                select: "-password"
            },
            {
                path: "book",
            }
        ])

        res.status(200).json({
            request
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


export const recievedRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user;

        if (!userId) {
            res.status(400).json({
                message: "Unauthorized User",
            })
            return
        }

        const user = await userModel.findById(userId);

        if (!user) {
            res.status(400).json({
                message: "Invalid User",
            })
            return
        }

        const requests = await requestModel.find({ reciever: userId }).populate({
            path: "requester book",
            select: "-password"
        });

        res.status(200).json({
            message: "All Request recieved",
            requests
        })
        return


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const requestAccept = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;

        if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
            res.status(404).json({
                message: "Invalid Request"
            })
            return
        }

        const request = await requestModel.findById(requestId);

        if (!request) {
            res.status(400).json({
                message: "Invalid Request"
            })
            return
        }

        if (request.reciever?.toString() !== req.user?.toString()) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }

        if (request.status !== "pending") {
            res.status(409).json({
                message: "Request already processed"
            })
        }

        request.status = "accepted";
        await request.save();
        res.status(200).json({
            message: "Accepted",
            request
        })
        return


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const requestReject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;

        if (!requestId || !mongoose.Types.ObjectId.isValid(requestId)) {
            res.status(404).json({
                message: "Invalid Request"
            })
            return
        }

        const request = await requestModel.findById(requestId);

        if (!request) {
            res.status(400).json({
                message: "Invalid Request"
            })
            return
        }

        if (request.reciever?.toString() !== req.user?.toString()) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }

        request.status = "rejected";
        await request.save();
        res.status(200).json({
            message: "Rejected",
            request
        })
        return


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const requestCancel = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { requestId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            res.status(400).json({
                message: "Invalid Request Id"
            })
            return
        }

        const userId = req.user;


        const request = await requestModel.findById(requestId);

        if (!request) {
            res.status(404).json({
                message: "Request Not Found"
            })
            return
        }

        // console.log(request.reciever);
        // console.log(request.requester);
        // console.log(req.user)

        if (request?.requester?.toString() !== userId?.toString()) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }


        const deleteRequest = await requestModel.findByIdAndDelete(requestId);

        res.status(200).json({
            messgae: "Cancelled"
        })
        return

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }
}

export const requestComplete = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.user;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid user id"
            })
            return
        }

        const { requestId } = req.params;

        const request = await requestModel.findById(requestId);

        if (!request) {
            res.status(404).json({
                message: "Request doesnt Exist"
            })
            return
        }

        if (request.status !== "accepted") {
            res.status(400).json({
                message: "Request is in process"
            })
            return
        }

        if (request.requester?.toString() === req.user?.toString()) {
            request.requesterMarkComplete = true;
        }
        else if (request.reciever?.toString() === req.user?.toString()) {
            request.recieverMarkComplete = true
        }
        else {
            res.status(400).json({
                message: "Forbidden"
            })
            return
        }



        await request.save();
        if (request.recieverMarkComplete && request.requesterMarkComplete) {
            res.status(200).json({
                message: "Request Complete and Deleted"
            })
            return
        }

        res.status(200).json({
            message: "Requested Mark Completed"
        })
        return

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            res.status(400).json({
                message: "Invalid Request Id"
            })
            return
        }

        const userId = req.user;
        const request = await requestModel.findById(requestId);

        if (!request) {
            res.status(404).json({
                message: "Request Not Found"
            })
            return
        }

        if (request.reciever?.toString() !== userId?.toString()) {
            res.status(403).json({
                message: "Forbidden"
            })
            return
        }

        const deleteRequest = await requestModel.findByIdAndDelete(requestId);
        res.status(200).json({
            message: "Request Deleted",
        })
        return

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
        return
    }

}