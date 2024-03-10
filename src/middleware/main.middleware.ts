import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

const VerifyUser = (req: Request, res: Response, next: NextFunction) => {
    const { user, token }: any = req.query;
    if (user! == null && !token) return res.status(404).send("user is not provided");
    
    if (user == process.env.USER_KEY) {
        jwt.sign(user, process.env.USER_KEY!);
        next();
    }
    else {
        if (user) {
            res.status(500).send("user is invalid");
        }
        jwt.verify(token, process.env.USER_KEY as string, (err: any) => {
            console.log(err);
            if (err) res.status(500).send("Retry login or token invalid");
            next();
        })
    }
    
}

export default VerifyUser