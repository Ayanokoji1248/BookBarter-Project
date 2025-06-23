import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    location: {
        type: String,
    },
    Books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    requestMade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }],
    requestRecieved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }]
}, {
    timestamps: true
})

const userModel = mongoose.model("User", userSchema);

export default userModel