import { PrismaClient } from "@prisma/client";

class ManagePrisma {
    private prismaClient;

    constructor(){
        this.prismaClient = new PrismaClient(); 
    }

    comprobeConnection = async() =>{
        await this.prismaClient.$connect()
        .then((res)=>{
            console.log('DB conect succesfull');
            return 'DB conect succeful'
        })
        .catch((err)=>{
            console.log('DB conect error: ', err);
            return 'DB conect error: '+err
        })
    }

    closeConnection = async() =>{
        await this.prismaClient.$disconnect();
    }
}

export default ManagePrisma;