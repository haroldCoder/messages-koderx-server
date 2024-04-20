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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const login_middleware_1 = __importDefault(require("../middleware/login.middleware"));
class UserControllers {
    constructor(req, res) {
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield this.prisma_client.user.findMany();
                (_a = this.res) === null || _a === void 0 ? void 0 : _a.status(200).json(response);
            }
            catch (err) {
                console.log(err);
                (_b = this.res) === null || _b === void 0 ? void 0 : _b.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            if (!user.username) {
                this.arrayErrors[0].state = 1;
            }
            if (!user.email) {
                this.arrayErrors[1].state = 1;
            }
            if (!user.password) {
                this.arrayErrors[2].state = 1;
            }
            if (!user.tel) {
                this.arrayErrors[3].state = 1;
            }
            this.arrayErrors.some((e) => {
                var _a;
                if (e.state == 1) {
                    (_a = this.res) === null || _a === void 0 ? void 0 : _a.status(500).json({ "err": e.desc });
                    return;
                }
            });
            try {
                const response = yield this.prisma_client.user.create({
                    data: {
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        tel: user.tel,
                    }
                });
                const token = (0, login_middleware_1.default)(express_1.request, express_2.default.response, true, { username: user.username, email: user.email, password: user.password }, "h6");
                (_c = this.res) === null || _c === void 0 ? void 0 : _c.status(200).json({
                    user: response,
                    token: token
                });
                return response;
            }
            catch (err) {
                console.log(err);
                (_d = this.res) === null || _d === void 0 ? void 0 : _d.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.updateUser = (id, user) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            this.arrayErrors = [{ state: 0, desc: "id user is undefined" }];
            if (!id) {
                this.arrayErrors[0].state = 1;
            }
            this.arrayErrors.some((ae) => {
                var _a;
                if (ae.state == 1) {
                    (_a = this.res) === null || _a === void 0 ? void 0 : _a.status(500).json({ "err": ae.desc });
                    return;
                }
            });
            try {
                yield this.prisma_client.user.update({
                    where: {
                        id: id
                    },
                    data: Object.assign(Object.assign(Object.assign(Object.assign({}, (user.username && { username: user.username })), (user.email && { email: user.email })), (user.password && { password: user.password })), (user.tel && { tel: user.tel }))
                });
                (_e = this.res) === null || _e === void 0 ? void 0 : _e.status(200).send(`user ${user.username} is update`);
            }
            catch (err) {
                console.log(err);
                (_f = this.res) === null || _f === void 0 ? void 0 : _f.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.deleleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            var _g, _h;
            try {
                yield this.prisma_client.user.delete({
                    where: {
                        id: id
                    }
                });
                (_g = this.res) === null || _g === void 0 ? void 0 : _g.status(200).send("user deleted");
            }
            catch (err) {
                console.log(err);
                (_h = this.res) === null || _h === void 0 ? void 0 : _h.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.req = req;
        this.res = res;
        this.prisma_client = new client_1.PrismaClient();
        this.prisma_client.$connect();
        this.arrayErrors = [
            { state: 0, desc: "Username is undefined" },
            { state: 0, desc: "Email is undefined" },
            { state: 0, desc: "Password is undefined" },
            { state: 0, desc: "Cell phone is undefined" }
        ];
    }
}
exports.default = UserControllers;
