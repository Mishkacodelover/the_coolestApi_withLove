import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user_router.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use("/", userRouter);
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

app.listen(port, console.log(`Server is running on port ${port} `));
