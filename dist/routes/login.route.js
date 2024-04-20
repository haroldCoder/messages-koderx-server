"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_middleware_1 = __importDefault(require("../middleware/login.middleware"));
const loginuser_controllers_1 = __importDefault(require("../controllers/loginuser.controllers"));
const router = (0, express_1.Router)();
router.route("/login")
    .get((req, res) => {
    (0, login_middleware_1.default)(req, res);
});
router.route("/login/user")
    .post((req, res) => {
    const user = req.body;
    console.log(user);
    new loginuser_controllers_1.default(req, res).Loinguser(user);
});
module.exports = router;
