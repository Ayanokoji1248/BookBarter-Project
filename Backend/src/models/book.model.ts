import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    condition: {
        type: String,
        enum: ["new", "good", "fair", "poor"]
    },
    availability: {
        type: String,
        enum: ["lend", "barter", "buy"],
        default: "lend",
        required: true
    },
    price: { type: Number },
    description: { type: String },
    photo: {
        type: String,
        default: "https://yourcdn.com/default-book.png"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});


const bookModel = mongoose.model("Book", bookSchema);

export default bookModel;