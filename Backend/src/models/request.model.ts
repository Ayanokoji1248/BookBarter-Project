import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    recieverMarkComplete: {
        type: Boolean,
        default: false
    },
    requesterMarkComplete: {
        type: Boolean,
        default: false,
    },
    requestMessage: {
        type: String,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, {
    timestamps: true
})

const requestModel = mongoose.model("Request", requestSchema);

export default requestModel;