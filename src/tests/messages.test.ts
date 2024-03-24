import { request, response } from "express";
import ContactControllers from "../controllers/contact.controllers";
import {expect, it, beforeAll} from "@jest/globals"
import UserControllers from "../controllers/users.controllers";

let contactController: ContactControllers;
let userController: UserControllers;

beforeAll(()=>{
    contactController = new ContactControllers(request, response);
    userController = new UserControllers(request, response)
})

it('create a new contact', async()=>{
    const user1 = <User>{
        username: "Harold",
        email: "haroldc2000@gmail.com",
        password: "harold123",
        tel: "3006397804"
    }

    const user2 = <User>{
        username: "Juan",
        email: "juanc2000@gmail.com",
        password: "juan123",
        tel: "3116397804"
    }

    const resuser1: User | undefined = await userController.createUser(user1);
    const resuser2: User | undefined = await userController.createUser(user2);

    console.log(contactController.createContact(resuser1?.id!, resuser2?.id!));
})