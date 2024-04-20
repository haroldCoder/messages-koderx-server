"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const router = (0, express_1.Router)();
router.route("/main/users")
    .get((req, res) => {
    new users_controllers_1.default(req, res).getAllUsers();
})
    .post((req, res) => {
    const user = req.body;
    new users_controllers_1.default(req, res).createUser(user);
});
router.route("/main/user/:id")
    .patch((req, res) => {
    const { id } = req.params;
    const user = req.body;
    new users_controllers_1.default(req, res).updateUser(id, user);
})
    .delete((req, res) => {
    const { id } = req.params;
    new users_controllers_1.default(req, res).deleleteUser(id);
});
module.exports = router;
