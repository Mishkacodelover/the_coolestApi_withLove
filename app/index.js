import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user_router.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use("/", userRouter);

app.listen(process.env.PORT || 3000, console.log(`Server is running `));
