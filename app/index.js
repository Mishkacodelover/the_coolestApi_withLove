import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user_router.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/", userRouter);

app.listen(process.env.PORT || 3000);
