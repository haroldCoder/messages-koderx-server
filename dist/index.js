"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const main_middleware_1 = __importDefault(require("./middleware/main.middleware"));
const managge_prisma_1 = __importDefault(require("./utils/managge_prisma"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.set("port", process.env.PORT || 1002);
app.use("/", require("./routes/login.route"));
app.use("/api/v1", main_middleware_1.default, require("./routes/main.route"));
app.use("/api/v1", main_middleware_1.default, require("./routes/contact.route"));
app.use("/api/v1", main_middleware_1.default, require("./routes/messages.route"));
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
    new managge_prisma_1.default().comprobeConnection();
});
