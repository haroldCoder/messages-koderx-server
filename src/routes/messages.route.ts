import { Router, Request, Response } from "express";
import messagesControllers from "../controllers/messages.controllers";

const router = Router();

router.route("/main/msgs/:idcontact")
.get((req: Request, res: Response)=>{
    const {idcontact} = req.params;

    new messagesControllers(req, res).getMessages(idcontact);
})

router.route("/main/msg")
.post((req: Request, res: Response)=>{
    const message_body: Messages = req.body;
    console.log(message_body);
    
    new messagesControllers(req, res).createMessage(message_body);
})

module.exports = router