import { Router, Request, Response } from "express";
import LoginUser from "../middleware/login.middleware";
import LoginuserContollers from "../controllers/loginuser.controllers";
const router = Router();


router.route("/login")
.get((req: Request, res: Response)=>{
    LoginUser(req, res);
})

router.route("/login/user")
.post((req: Request, res: Response)=>{
    const user: User = req.body;
    console.log(user);
    
    new LoginuserContollers(req, res).Loinguser(user);
})

module.exports = router;