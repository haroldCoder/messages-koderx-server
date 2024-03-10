import { Router, Request, Response } from "express";
import LoginUser from "../middleware/login.middleware";
const router = Router();


router.route("/login")
.get((req: Request, res: Response)=>{
    LoginUser(req, res);
})

module.exports = router;