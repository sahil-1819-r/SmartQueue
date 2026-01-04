import jwt from "jsonwebtoken";
import { CustomError } from "./CustomError.js";
import "dotenv/config";

const auth = async (req, res) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new CustomError(401, "Not Authorized");
  }

  const token = header.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decode;
  return next();
};

export default auth;