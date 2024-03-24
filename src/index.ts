import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser = require("body-parser");
import VerifyUser from "./middleware/main.middleware";
import ManagePrisma from "./utils/managge_prisma";

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());

app.set("port", process.env.PORT || 1002)

app.use("/", require("./routes/login.route"))
app.use("/api/v1", VerifyUser, require("./routes/main.route"))
app.use("/api/v1", VerifyUser, require("./routes/contact.route"))

app.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
    new ManagePrisma().comprobeConnection();
})
