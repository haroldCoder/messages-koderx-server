"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controllers_1 = __importDefault(require("../controllers/messages.controllers"));
const router = (0, express_1.Router)();
router.route("/main/msgs/:idcontact")
    .get((req, res) => {
    const { idcontact } = req.params;
    new messages_controllers_1.default(req, res).getMessages(idcontact);
});
router.route("/main/msg")
    .post((req, res) => {
    const message_body = req.body;
    console.log(message_body);
    new messages_controllers_1.default(req, res).createMessage(message_body);
});
module.exports = router;
