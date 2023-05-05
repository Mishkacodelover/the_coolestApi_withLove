import { jwtVerify } from "jose";
import { TextEncoder } from "util";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed. No token provided." });
    }

    const key = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Authentication failed." });
  }
};

export default verifyToken;
