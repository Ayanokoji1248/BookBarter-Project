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
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const request_route_1 = __importDefault(require("./routes/request.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/auth', auth_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/book', book_route_1.default);
app.use('/api/request', request_route_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, dbConnection_1.default)();
            app.listen(3000, () => {
                console.log("Server running on 3000");
            });
        }
        catch (error) {
            console.log("Error", error);
        }
    });
}
main();
