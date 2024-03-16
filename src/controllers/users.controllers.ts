import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class UserControllers{
    req: Request
    res: Response
    private prisma_client: PrismaClient

    constructor(req: Request, res: Response){
        this.req = req;
        this.res = res;
        this.prisma_client = new PrismaClient();
        this.prisma_client.$connect();
    }

    getAllUsers = async() =>{
        try{
           const response = await this.prisma_client.user.findMany(); 
           this.res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            this.res.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }
}

export default UserControllers;