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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ContactControllers {
    constructor(req, res) {
        this.getContacts = (iduser) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield this.prismaClient.contact.findMany({
                    where: { user1Id: iduser },
                    select: {
                        id: true,
                        user1: true,
                        user2: true
                    }
                });
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
        this.createContact = (user1, user2) => __awaiter(this, void 0, void 0, function* () {
            var _c, _d;
            try {
                const response = yield this.prismaClient.contact.create({
                    data: {
                        user1Id: user1,
                        user2Id: user2
                    }
                });
                (_c = this.res) === null || _c === void 0 ? void 0 : _c.status(200).json(response);
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
        this.deleteContact = (user1, user2) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f;
            try {
                const response = yield this.prismaClient.contact.deleteMany({
                    where: {
                        user1Id: user1,
                        user2Id: user2
                    }
                });
                (_e = this.res) === null || _e === void 0 ? void 0 : _e.status(200).json(response);
            }
            catch (err) {
                console.log(err);
                (_f = this.res) === null || _f === void 0 ? void 0 : _f.status(500).json({
                    "message": "An ocurred error",
                    "error": err
                });
            }
        });
        this.res = res;
        this.req = req;
        this.prismaClient = new client_1.PrismaClient();
    }
}
exports.default = ContactControllers;
