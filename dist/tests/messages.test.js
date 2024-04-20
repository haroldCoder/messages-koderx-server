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
const express_1 = require("express");
const contact_controllers_1 = __importDefault(require("../controllers/contact.controllers"));
const globals_1 = require("@jest/globals");
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
let contactController;
let userController;
(0, globals_1.beforeAll)(() => {
    contactController = new contact_controllers_1.default(express_1.request, express_1.response);
    userController = new users_controllers_1.default(express_1.request, express_1.response);
});
(0, globals_1.it)('create a new contact', () => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = {
        username: "Harold",
        email: "haroldc2000@gmail.com",
        password: "harold123",
        tel: "3006397804"
    };
    const user2 = {
        username: "Juan",
        email: "juanc2000@gmail.com",
        password: "juan123",
        tel: "3116397804"
    };
    const resuser1 = yield userController.createUser(user1);
    const resuser2 = yield userController.createUser(user2);
    console.log(contactController.createContact(resuser1 === null || resuser1 === void 0 ? void 0 : resuser1.id, resuser2 === null || resuser2 === void 0 ? void 0 : resuser2.id));
}));
