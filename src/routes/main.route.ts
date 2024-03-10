import { Router, Request, Response } from "express";
const router = Router();


router.route("/main")
.get((req: Request, res: Response)=>{
    res.status(200).json("Hello world")
})

module.exports = router;