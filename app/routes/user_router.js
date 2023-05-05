import express from "express";
import userController from "../controller/user_controller.js";
import validateLogin from "../utils/validate_login.js";
import verifyToken from "../utils/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/createUser", userController.createUser);

userRouter.post("/login", validateLogin, userController.login);

userRouter.get("/getData", verifyToken, userController.getData);

export default userRouter;
