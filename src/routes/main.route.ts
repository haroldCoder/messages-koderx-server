import { Router, Request, Response } from "express";
import UserControllers from "../controllers/users.controllers";
const router = Router();


router.route("/main/users")
.get((req: Request, res: Response)=>{
    new UserControllers(req, res).getAllUsers();
})

module.exports = router;