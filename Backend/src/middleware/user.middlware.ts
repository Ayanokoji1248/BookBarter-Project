import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'


declare global {
    namespace Express {
        interface Request {
            user?: string
        }
    }
}

const userMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    if (!token) {
        res.status(400).json({
            message: "Token not provided",
        })
    }

    const decoded = (jwt.verify(token as string, process.env.JWT_SECRET as string)) as JwtPayload

    req.user = decoded.id;
    next()

}

export default userMiddlware