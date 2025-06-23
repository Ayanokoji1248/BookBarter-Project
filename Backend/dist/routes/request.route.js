"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middlware_1 = __importDefault(require("../middleware/user.middlware"));
const request_controller_1 = require("../controllers/request.controller");
const requestRouter = (0, express_1.Router)();
requestRouter.post("/:bookId", user_middlware_1.default, request_controller_1.requestByUser);
requestRouter.get("/sent", user_middlware_1.default, request_controller_1.requestsOfUser);
requestRouter.get('/recieved', user_middlware_1.default, request_controller_1.recievedRequest);
requestRouter.post('/:requestId/accept', user_middlware_1.default, request_controller_1.requestAccept);
requestRouter.post('/:requestId/reject', user_middlware_1.default, request_controller_1.requestReject);
requestRouter.post('/:requestId/complete', user_middlware_1.default, request_controller_1.requestComplete);
// For Receiver
requestRouter.post('/:requestId/delete', user_middlware_1.default, request_controller_1.deleteRequest);
requestRouter.delete('/:requestId', user_middlware_1.default, request_controller_1.requestCancel);
exports.default = requestRouter;
