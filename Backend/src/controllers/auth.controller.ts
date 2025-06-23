import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { z } from "zod"


const registerUserSchema = z.object({
    fullName: z.string().min(2).max(50),
    // lastName: z.string().min(2).max(50),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const loginUserSchema = z.object({
    email: z.string().email("Invalid Email format"),
    password: z.string()
})

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { fullName, email, password, location } = req.body;

        const userParse = registerUserSchema.safeParse(req.body);

        if (!userParse.success) {
            res.status(400).json({
                error: userParse.error.flatten().fieldErrors,
                message: "All Fields are required"
            })
            return
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            res.status(400).json({
                message: "User Already Exist"
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await userModel.create({
            fullName,
            email,
            password: hashedPassword,
            location,
        })

        const { password: _, ...userData } = user.toObject();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)

        res.status(201).json({
            user: userData,
            token: token
        })
        return
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const emailParse = loginUserSchema.safeParse(req.body);

        if (!emailParse.success) {
            res.status(401).json({
                message: "Invalid Credentials",
                errors: emailParse.error.flatten().fieldErrors
            })
            return
        }

        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const comparePass = await bcrypt.compare(password, userExist.password);

        if (!comparePass) {
            res.status(400).json({
                message: "Invalid Credentials"
            })
            return
        }

        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET as string)

        const { password: _, ...user } = userExist.toObject();

        res.status(200).json({
            user,
            token
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