import mongoose from "mongoose";
import userModel from "../models/user.model";



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

async function seedDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/BookBarterDB")
        console.log("Connected to DB")
        const user = await userModel.insertMany(users);
        console.log(`User added successfully ${(await user).length}`)
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}


seedDatabase()