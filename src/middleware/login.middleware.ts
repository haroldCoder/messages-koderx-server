import jwt from "jsonwebtoken";
import { Request, Response} from "express"

const LoginUser = (req: Request, res: Response) =>{
    const {user, password} : string | any = req.query;

    if(!user && !password) res.status(500).send("user or password is not provided");

    const token = jwt.sign({"user": user, "password": password}, process.env.USER_KEY as string, {expiresIn: '1h'})

    res.status(200).json({
        "token": token
    })
}

export default LoginUser;