import { Router, Request, Response } from "express";
import ContactControllers from "../controllers/contact.controllers";
const router = Router();

router.route("/main/contacts/:iduser")
.get((req: Request, res: Response)=>{
    const {iduser} = req.params;

    new ContactControllers(req, res).getContacts(iduser);
})

router.route("/main/contact")
.post((req: Request, res: Response)=>{
    const {iduser1}: {iduser1: string} = req.body;
    const {iduser2}: {iduser2: string} = req.body;

    new ContactControllers(req, res).createContact(iduser1, iduser2);
})

module.exports = router;