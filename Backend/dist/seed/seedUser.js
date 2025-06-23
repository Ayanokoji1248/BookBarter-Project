"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const users = [
    // Plain password: "AlexPass123!"
    {
        fullName: "Alex Morgan",
        email: "alex.morgan@example.com",
        password: "$2b$10$TkQ1wWZzq3VlO7jJ8fY6EeK0mXgL2pN3rC4sD5vB6yH7iA9uRtS",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "New York, NY"
    },
    // Plain password: "Sophia#2023"
    {
        fullName: "Sophia Chen",
        email: "sophia.chen@example.com",
        password: "$2b$10$LpR9sMq2vWxYzAaBcDeFg.H5jK6l7mN8oP0Q1rS2tU3V4w5XyZ",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        location: "San Francisco, CA"
    },
    // Plain password: "Marcus!Secure9"
    {
        fullName: "Marcus Johnson",
        email: "marcus.j@example.com",
        password: "$2b$10$NzV4s5d6e7f8g9h0i1j2k.3l4m5n6o7p8q9r0s1t2u3v4w5x6y7z",
        profilePic: "",
        location: "Chicago, IL"
    },
    // Plain password: "Elena$Pass"
    {
        fullName: "Elena Rodriguez",
        email: "elena.rz@example.com",
        password: "$2b$10$AbCdEfGhIjKlMnOpQrStU.vWxYz0123456789aBcDeFgHiJkLmNo",
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
        location: "Los Angeles, CA"
    },
    // Plain password: "JamesWilson_1"
    {
        fullName: "James Wilson",
        email: "j.wilson@example.com",
        password: "$2b$10$ZyXwVuTsRqPoNiUlTyInOuHvJfKdLpOzIjQlPkOmNmLlIjQlUnBg",
        profilePic: "https://randomuser.me/api/portraits/men/19.jpg",
        location: "Austin, TX"
    },
    // Plain password: "OliviaK!2023"
    {
        fullName: "Olivia Kim",
        email: "okim@example.com",
        password: "$2b$10$QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlMmNnBbVvCcXxZz",
        profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
        location: "Seattle, WA"
    },
    // Plain password: "DannyBrown_7"
    {
        fullName: "Daniel Brown",
        email: "dan.b@example.com",
        password: "$2b$10$1a2b3c4d5e6f7g8h9i0j.KlMnOpQrStUvWxYz0123456789AbCd",
        profilePic: "",
        location: "Portland, OR"
    },
    // Plain password: "AishaPatel#5"
    {
        fullName: "Aisha Patel",
        email: "aisha.p@example.com",
        password: "$2b$10$PpOoIiUuYyTtRrEeWwQqAsSdDfFgGhHhJjKkLlMmNnBbVvCcXxZz",
        profilePic: "https://randomuser.me/api/portraits/women/53.jpg",
        location: "Miami, FL"
    },
    // Plain password: "BenTaylor_42"
    {
        fullName: "Benjamin Taylor",
        email: "ben.taylor@example.com",
        password: "$2b$10$AaBbCcDdEeFfGgHhIiJjKk.LlMmNnOoPpQqRrSsTtUuVvWwXxYyZ",
        profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
        location: "Boston, MA"
    },
    // Plain password: "ZaraKhan$3"
    {
        fullName: "Zara Khan",
        email: "zkhan@example.com",
        password: "$2b$10$QwErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcVbNm",
        profilePic: "https://randomuser.me/api/portraits/women/79.jpg",
        location: "Denver, CO"
    }
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb://localhost:27017/BookBarterDB");
            console.log("Connected to DB");
            const user = yield user_model_1.default.insertMany(users);
            console.log(`User added successfully ${(yield user).length}`);
            process.exit(0);
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    });
}
seedDatabase();
