import dao from "../services/dao.js";
import { SignJWT, jwtVerify } from "jose";
import md5 from "md5";

const controller = {};

controller.createUser = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res
      .status(400)
      .send("Something is wrong with the body data entered");
  }
  try {
    const user = await dao.getUserByEmail(email);

    if (user.length > 0) {
      return res.status(409).send("User already exists");
    }
    const addUser = await dao.addUser(req.body);
    return res.json({
      status: 200,
      success: true,
      data: addUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the user");
  }
};

controller.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .send("Something is wrong with the body data entered");
  try {
    let user = await dao.getUserByEmail(email);

    if (user.length <= 0) return res.status(404).send("user is not registered");

    const clientPassword = md5(password);

    [user] = user;

    if (user.password != clientPassword)
      return res.status(401).send("wrong password");
    const jwtConstructor = new SignJWT({
      id: user.id,
      email,
    });
    const encoder = new TextEncoder();

    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(encoder.encode(process.env.JWT_SECRET));

    return res.send({ jwt });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      success: false,
      error: error.message,
    });
  }
};

controller.getData = async (req, res) => {
  try {
    const userData = await dao.userData();

    return res.json({
      status: 200,
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      success: false,
      error: error.message,
    });
  }
};

export default controller;
