import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class messagesControllers {
    req?: Request;
    res?: Response;
    private prismaClient: PrismaClient;

    constructor(req?: Request, res?: Response) {
        this.req = req;
        this.res = res;
        this.prismaClient = new PrismaClient();
    }

    getMessages = async (idcontact: string) => {
        try {
            const response = await this.prismaClient.messages.findMany({
                where: {
                    contactid: idcontact
                }
            })

            this.res?.status(200).json(response);
            return response;
        }
        catch(err){
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }

    createMessage = async(message: Messages) =>{
        try{
            const response = await this.prismaClient.messages.create({
                data: {
                    contactid: message.contactid,
                    message: message.messages,
                }
            })

            this.res?.status(200).json(response);
        }
        catch(err){
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }

    deleteMessage = async(idmsg: string) =>{
        try{
            await this.prismaClient.messages.deleteMany({
                where: {
                    id: idmsg
                }
            });

            this.res?.status(200).send(`message delete successfully`);
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

export default messagesControllers;