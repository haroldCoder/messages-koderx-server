"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyUser = (req, res, next) => {
    const { user, token } = req.query;
    if (user == null && !token)
        return res.status(404).send("user is not provided");
    if (user == process.env.USER_KEY) {
        jsonwebtoken_1.default.sign(user, process.env.USER_KEY);
        next();
    }
    else {
        if (user) {
            res.status(500).send("user is invalid");
        }
        jsonwebtoken_1.default.verify(token, process.env.USER_KEY, (err) => {
            console.log(err);
            if (err)
                res.status(500).send("Retry login or token invalid");
            next();
        });
    }
};
exports.default = VerifyUser;
