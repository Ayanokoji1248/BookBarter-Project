import { Router } from "express";
import userMiddlware from "../middleware/user.middlware";
import { deleteRequest, recievedRequest, requestAccept, requestByUser, requestCancel, requestComplete, requestReject, requestsOfUser } from "../controllers/request.controller";

const requestRouter = Router();

requestRouter.post("/:bookId", userMiddlware, requestByUser)


requestRouter.get("/sent", userMiddlware, requestsOfUser)
requestRouter.get('/recieved', userMiddlware, recievedRequest)


requestRouter.post('/:requestId/accept', userMiddlware, requestAccept)
requestRouter.post('/:requestId/reject', userMiddlware, requestReject);
requestRouter.post('/:requestId/complete', userMiddlware, requestComplete)
// For Receiver
requestRouter.post('/:requestId/delete', userMiddlware, deleteRequest)

requestRouter.delete('/:requestId', userMiddlware, requestCancel);

export default requestRouter