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
exports.deleteRequest = exports.requestComplete = exports.requestCancel = exports.requestReject = exports.requestAccept = exports.recievedRequest = exports.requestsOfUser = exports.requestByUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_model_1 = __importDefault(require("../models/book.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const request_model_1 = __importDefault(require("../models/request.model"));
const requestByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const { requestMessage } = req.body;
        if (!bookId || !mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                message: "Invalid Book Id"
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
        const requestAlready = yield request_model_1.default.findOne({
            $and: [
                { requester: req.user },
                { book: bookId }
            ]
        });
        // console.log(requestAlready)
        if (requestAlready) {
            res.status(400).json({
                message: "Book Already requested"
            });
            return;
        }
        const userId = req.user;
        const user = yield user_model_1.default.findById(userId);
        if ((userId === null || userId === void 0 ? void 0 : userId.toString()) === book.owner.toString()) {
            res.status(400).json({
                message: "You cannot request your own book"
            });
            return;
        }
        const request = yield request_model_1.default.create({
            requestMessage,
            requester: userId,
            reciever: book.owner,
            book: bookId
        });
        user === null || user === void 0 ? void 0 : user.requestMade.push(request._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).json({
            message: "Request Made Successfully",
            request
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
exports.requestByUser = requestByUser;
const requestsOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                message: "User Not Found"
            });
            return;
        }
        const request = yield request_model_1.default.find({ requester: userId }).populate([
            {
                path: "reciever",
                select: "-password"
            },
            {
                path: "book",
            }
        ]);
        res.status(200).json({
            request
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
exports.requestsOfUser = requestsOfUser;
const recievedRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        if (!userId) {
            res.status(400).json({
                message: "Unauthorized User",
            });
            return;
        }
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(400).json({
                message: "Invalid User",
            });
            return;
        }
        const requests = yield request_model_1.default.find({ reciever: userId }).populate({
            path: "requester book",
            select: "-password"
        });
        res.status(200).json({
            message: "All Request recieved",
            requests
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
exports.recievedRequest = recievedRequest;
const requestAccept = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { requestId } = req.params;
        if (!requestId || !mongoose_1.default.Types.ObjectId.isValid(requestId)) {
            res.status(404).json({
                message: "Invalid Request"
            });
            return;
        }
        const request = yield request_model_1.default.findById(requestId);
        if (!request) {
            res.status(400).json({
                message: "Invalid Request"
            });
            return;
        }
        if (((_a = request.reciever) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.toString())) {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
        if (request.status !== "pending") {
            res.status(409).json({
                message: "Request already processed"
            });
        }
        request.status = "accepted";
        yield request.save();
        res.status(200).json({
            message: "Accepted",
            request
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.requestAccept = requestAccept;
const requestReject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { requestId } = req.params;
        if (!requestId || !mongoose_1.default.Types.ObjectId.isValid(requestId)) {
            res.status(404).json({
                message: "Invalid Request"
            });
            return;
        }
        const request = yield request_model_1.default.findById(requestId);
        if (!request) {
            res.status(400).json({
                message: "Invalid Request"
            });
            return;
        }
        if (((_a = request.reciever) === null || _a === void 0 ? void 0 : _a.toString()) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.toString())) {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
        request.status = "rejected";
        yield request.save();
        res.status(200).json({
            message: "Rejected",
            request
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.requestReject = requestReject;
const requestCancel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { requestId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(requestId)) {
            res.status(400).json({
                message: "Invalid Request Id"
            });
            return;
        }
        const userId = req.user;
        const request = yield request_model_1.default.findById(requestId);
        if (!request) {
            res.status(404).json({
                message: "Request Not Found"
            });
            return;
        }
        // console.log(request.reciever);
        // console.log(request.requester);
        // console.log(req.user)
        if (((_a = request === null || request === void 0 ? void 0 : request.requester) === null || _a === void 0 ? void 0 : _a.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
        const deleteRequest = yield request_model_1.default.findByIdAndDelete(requestId);
        res.status(200).json({
            messgae: "Cancelled"
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.requestCancel = requestCancel;
const requestComplete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const userId = req.user;
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({
                message: "Invalid user id"
            });
            return;
        }
        const { requestId } = req.params;
        const request = yield request_model_1.default.findById(requestId);
        if (!request) {
            res.status(404).json({
                message: "Request doesnt Exist"
            });
            return;
        }
        if (request.status !== "accepted") {
            res.status(400).json({
                message: "Request is in process"
            });
            return;
        }
        if (((_a = request.requester) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b.toString())) {
            request.requesterMarkComplete = true;
        }
        else if (((_c = request.reciever) === null || _c === void 0 ? void 0 : _c.toString()) === ((_d = req.user) === null || _d === void 0 ? void 0 : _d.toString())) {
            request.recieverMarkComplete = true;
        }
        else {
            res.status(400).json({
                message: "Forbidden"
            });
            return;
        }
        yield request.save();
        if (request.recieverMarkComplete && request.requesterMarkComplete) {
            res.status(200).json({
                message: "Request Complete and Deleted"
            });
            return;
        }
        res.status(200).json({
            message: "Requested Mark Completed"
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.requestComplete = requestComplete;
const deleteRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { requestId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(requestId)) {
            res.status(400).json({
                message: "Invalid Request Id"
            });
            return;
        }
        const userId = req.user;
        const request = yield request_model_1.default.findById(requestId);
        if (!request) {
            res.status(404).json({
                message: "Request Not Found"
            });
            return;
        }
        if (((_a = request.reciever) === null || _a === void 0 ? void 0 : _a.toString()) !== (userId === null || userId === void 0 ? void 0 : userId.toString())) {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
        const deleteRequest = yield request_model_1.default.findByIdAndDelete(requestId);
        res.status(200).json({
            message: "Request Deleted",
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
        return;
    }
});
exports.deleteRequest = deleteRequest;
