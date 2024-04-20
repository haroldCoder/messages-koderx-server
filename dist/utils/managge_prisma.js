"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ManagePrisma {
    constructor() {
        this.comprobeConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.$connect()
                .then((res) => {
                console.log('DB conect succesfull');
                return 'DB conect succeful';
            })
                .catch((err) => {
                console.log('DB conect error: ', err);
                return 'DB conect error: ' + err;
            });
        });
        this.closeConnection = () => __awaiter(this, void 0, void 0, function* () {
            yield this.prismaClient.$disconnect();
        });
        this.prismaClient = new client_1.PrismaClient();
    }
}
exports.default = ManagePrisma;
