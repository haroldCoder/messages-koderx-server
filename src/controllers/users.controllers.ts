import { PrismaClient } from "@prisma/client";
import { Request, Response, request } from "express";
import expres from "express";
import LoginUser from "../middleware/login.middleware";

class UserControllers{
    req?: Request
    res?: Response
    protected prisma_client: PrismaClient
    private arrayErrors: Array<{state: number, desc: string}>;

    constructor(req?: Request, res?: Response){
        this.req = req;
        this.res = res;
        this.prisma_client = new PrismaClient();
        this.prisma_client.$connect();
        this.arrayErrors = [
            {state: 0, desc: "Username is undefined"},
            {state: 0, desc: "Email is undefined"},
            {state: 0, desc: "Password is undefined"},
            {state: 0, desc: "Cell phone is undefined"}
        ]
    }

    getAllUsers = async() =>{
        try{
           const response = await this.prisma_client.user.findMany(); 
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

    createUser = async(user: User): Promise<User | undefined> =>{
        if(!user.username){
            this.arrayErrors[0].state = 1;
        }
        if(!user.email){
            this.arrayErrors[1].state = 1;
        }
        if(!user.password){
            this.arrayErrors[2].state = 1;
        }
        if(!user.tel){
            this.arrayErrors[3].state = 1;
        }

        this.arrayErrors.some((e)=>{
            if(e.state == 1){
                this.res?.status(500).json({"err": e.desc});
                return;
            }
        })

        try {
            const response = await this.prisma_client.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    tel: user.tel,
                }
            })

            const token = LoginUser(request, expres.response, true, {username: user.username, email: user.email, password: user.password}, "h6")

            this.res?.status(200).json({
                user: response,
                token: token
            })
            return response;
        } catch (err) {
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }

    updateUser = async(id: string, user: User) =>{
        this.arrayErrors = [{state: 0, desc: "id user is undefined"}];

        if(!id){
            this.arrayErrors[0].state = 1;
        }

        this.arrayErrors.some((ae)=>{
            if(ae.state == 1){
                this.res?.status(500).json({"err": ae.desc});
                return;
            }
        });

        try {
            await this.prisma_client.user.update({
                where: {
                    id: id
                },
                data: {
                    ...(user.username && {username: user.username}),
                    ...(user.email && {email: user.email}),
                    ...(user.password && {password: user.password}),
                    ...(user.tel && {tel: user.tel})
                }
            })

            this.res?.status(200).send(`user ${user.username} is update`);
        } catch (err) {
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }

    deleleteUser = async(id: string) =>{
        try {
            await this.prisma_client.user.delete({
                where: {
                    id: id
                }
            })

            this.res?.status(200).send("user deleted");
        } catch (err) {
            console.log(err);
            this.res?.status(500).json({
                "message": "An ocurred error",
                "error": err
            });
        }
    }
}

export default UserControllers;