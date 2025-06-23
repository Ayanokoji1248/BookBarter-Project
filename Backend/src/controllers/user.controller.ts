import { Request, Response, NextFunction } from "express"
import userModel from "../models/user.model";
import mongoose from "mongoose";

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(401).json({
                message: "Unauthorized"
            })
            return
        }

        const userData = await userModel.findById(id).select("-password").lean();

        if (!userData) {
            res.status(404).json({
                message: "Invalid User"
            })
            return
        }

        // const { password: _, ...user } = userData;
        res.status(200).json(userData);
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}