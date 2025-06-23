import express from "express";
import authRouter from "./routes/auth.route";
import dotenv from "dotenv"
import dbConnection from "./config/dbConnection";
import bookRouter from "./routes/book.route";
import userRouter from "./routes/user.route";
import requestRouter from "./routes/request.route";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.use('/api/request', requestRouter)

async function main() {
    try {
        await dbConnection()
        app.listen(3000, () => {
            console.log("Server running on 3000")
        })
    } catch (error) {
        console.log("Error", error)
    }
}


main()