import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser = require("body-parser");
import VerifyUser from "./middleware/main.middleware";

dotenv.config()

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.set("port", process.env.PORT || 1002)

app.use("/", require("./routes/login.route"))
app.use("/api/koder", VerifyUser, require("./routes/main.route"))

app.listen(app.get("port"), ()=>{
    console.log(`Server on port ${app.get("port")}`);
})