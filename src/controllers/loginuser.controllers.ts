import { Request, Response } from "express";
import UserControllers from "./users.controllers";
import LoginUser from "../middleware/login.middleware";
import express from "express"

class LoginuserContollers extends UserControllers{
    req?: Request;
    res?: Response;

    constructor(req?: Request, res?: Response){
        super();
        this.req = req;
        this.res = res;
    }

    Loinguser = async(user: User) =>{
        try{
            const users : Array<User> = await this.prisma_client.user.findMany()

            users.map((us, index)=>{
                if(user.username == us.username && user.password == us.password){
                    console.log(us);
                    
                    const token = LoginUser(express.request, express.response, true, {username: user.username, password: user.password, ...(user.email ? {email: user.email} : {email: ""})}, "d1")
                    this.res?.status(200).json({token: token});
                    return;
                }
            })
        }
        catch(err){
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }
}

export default LoginuserContollers;