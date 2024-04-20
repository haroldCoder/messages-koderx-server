import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { Expired } from "../types/token";

const LoginUser = (req?: Request, res?: Response, returned: boolean = false,
    { username, password, email }: { username: string, password: string, email: string } = { username: "", password: "", email: "" },
    expired: keyof Expired = "h1") => {
   let exp: Expired = {h1: '1h',
   h6: '6h',
   h12: '12h',
   d1: '1d',
   d6: '6d',
   d12: '12d',
   d30: '30d',
   never: null};
    
    if (returned) {
        if (!username && !password) throw new Error("user or password is not provided")
        
        const token = jwt.sign({ "user": username, "password": password, "email": email }, process.env.USER_KEY as string, { expiresIn: exp[expired]?.toString() })
    
        return token;
    }
    else {
        const { user, password, email }: string | any = req?.query;

        if (!user && !password) res?.status(500).send("user or password is not provided");

        const token = jwt.sign({ "user": user, "password": password, "email": email }, process.env.USER_KEY as string, { expiresIn: '1h' })

        res?.status(200).json({
            "token": token
        })
    }
}

export default LoginUser;