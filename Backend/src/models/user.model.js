"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Book"
        }],
    requestMade: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Request"
        }],
    requestRecieved: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Request"
        }]
}, {
    timestamps: true
});
var userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
