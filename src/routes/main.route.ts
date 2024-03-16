import { Router, Request, Response } from "express";
import UserControllers from "../controllers/users.controllers";
const router = Router();


router.route("/main/users")
.get((req: Request, res: Response)=>{
    new UserControllers(req, res).getAllUsers();
})

.post((req: Request, res: Response)=>{
    const user: User = req.body;

    new UserControllers(req, res).createUser(user);
})

router.route("/main/user/:id")

.patch((req: Request, res: Response)=>{
    const {id} = req.params;
    const user: User = req.body;

    new UserControllers(req, res).updateUser(id, user);
})

.delete((req: Request, res: Response)=>{
    const {id} = req.params;

    new UserControllers(req, res).deleleteUser(id);
})

module.exports = router;