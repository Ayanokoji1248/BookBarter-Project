import { Router } from "express";
import userMiddlware from "../middleware/user.middlware";
import { getUserProfile } from "../controllers/user.controller";
const userRouter = Router();

userRouter.get('/me', userMiddlware, getUserProfile)

export default userRouter;