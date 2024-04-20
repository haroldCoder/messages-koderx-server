"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controllers_1 = __importDefault(require("../controllers/contact.controllers"));
const router = (0, express_1.Router)();
router.route("/main/contacts/:iduser")
    .get((req, res) => {
    const { iduser } = req.params;
    new contact_controllers_1.default(req, res).getContacts(iduser);
});
router.route("/main/contact")
    .post((req, res) => {
    const { iduser1 } = req.body;
    const { iduser2 } = req.body;
    new contact_controllers_1.default(req, res).createContact(iduser1, iduser2);
});
module.exports = router;
