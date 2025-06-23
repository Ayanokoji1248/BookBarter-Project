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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_model_1 = require("../models/user.model");
var users = [
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
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, _b, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1.default.connect("mongodb://localhost:27017/BookBarterDB")];
                case 1:
                    _d.sent();
                    console.log("Connected to DB");
                    return [4 /*yield*/, user_model_1.default.insertMany(users)];
                case 2:
                    user = _d.sent();
                    _b = (_a = console).log;
                    _c = "User added successfully ".concat;
                    return [4 /*yield*/, user];
                case 3:
                    _b.apply(_a, [_c.apply("User added successfully ", [(_d.sent()).length])]);
                    process.exit(0);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    console.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
seedDatabase();
