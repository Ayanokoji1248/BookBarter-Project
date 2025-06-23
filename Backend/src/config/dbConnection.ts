import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Connected to DB")

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default dbConnection;