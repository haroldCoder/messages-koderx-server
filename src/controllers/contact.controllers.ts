import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class ContactControllers {
    private prismaClient: PrismaClient;
    req?: Request;
    res?: Response;

    constructor(req?: Request, res?: Response) {
        this.res = res;
        this.req = req;
        this.prismaClient = new PrismaClient();
    }

    getContacts = async (iduser: string) => {
        try {
            const response = await this.prismaClient.contact.findMany({
                select: {
                    user1: true,
                    user2: true
                },
                where: { user1Id: iduser },

            });

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

    createContact = async(user1: string, user2: string) =>{
        try{
            const response = await this.prismaClient.contact.create({
                data: {
                    user1Id: user1,
                    user2Id: user2
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

    deleteContact = async(user1: string, user2: string) =>{
        try{
            const response = await this.prismaClient.contact.deleteMany({
                where: {
                    user1Id: user1,
                    user2Id: user2
                }
            });

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
}

export default ContactControllers;