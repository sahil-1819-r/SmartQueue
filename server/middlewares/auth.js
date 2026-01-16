import jwt from "jsonwebtoken";
import { CustomError } from "./CustomError.js";
import "dotenv/config";

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new CustomError(401, "Not Authorized");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    return next();
  } catch (err) {
    throw new CustomError(401, err.message);
  }
};

export default auth;
