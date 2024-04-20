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
const users_controllers_1 = __importDefault(require("./users.controllers"));
const login_middleware_1 = __importDefault(require("../middleware/login.middleware"));
const express_1 = __importDefault(require("express"));
class LoginuserContollers extends users_controllers_1.default {
    constructor(req, res) {
        super();
        this.Loinguser = (user) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const users = yield this.prisma_client.user.findMany();
                users.map((us, index) => {
                    var _a;
                    if (user.username == us.username && user.password == us.password) {
                        console.log(us);
                        const token = (0, login_middleware_1.default)(express_1.default.request, express_1.default.response, true, Object.assign({ username: user.username, password: user.password }, (user.email ? { email: user.email } : { email: "" })), "d1");
                        (_a = this.res) === null || _a === void 0 ? void 0 : _a.status(200).json({ token: token });
                        return;
                    }
                });
            }
            catch (err) {
                console.log(err);
                (_a = this.res) === null || _a === void 0 ? void 0 : _a.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.req = req;
        this.res = res;
    }
}
exports.default = LoginuserContollers;
