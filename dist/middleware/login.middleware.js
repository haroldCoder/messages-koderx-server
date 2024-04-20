"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginUser = (req, res, returned = false, { username, password, email } = { username: "", password: "", email: "" }, expired = "h1") => {
    var _a;
    let exp = { h1: '1h',
        h6: '6h',
        h12: '12h',
        d1: '1d',
        d6: '6d',
        d12: '12d',
        d30: '30d',
        never: null };
    if (returned) {
        if (!username && !password)
            throw new Error("user or password is not provided");
        const token = jsonwebtoken_1.default.sign({ "user": username, "password": password, "email": email }, process.env.USER_KEY, { expiresIn: (_a = exp[expired]) === null || _a === void 0 ? void 0 : _a.toString() });
        return token;
    }
    else {
        const { user, password, email } = req === null || req === void 0 ? void 0 : req.query;
        if (!user && !password)
            res === null || res === void 0 ? void 0 : res.status(500).send("user or password is not provided");
        const token = jsonwebtoken_1.default.sign({ "user": user, "password": password, "email": email }, process.env.USER_KEY, { expiresIn: '1h' });
        res === null || res === void 0 ? void 0 : res.status(200).json({
            "token": token
        });
    }
};
exports.default = LoginUser;
