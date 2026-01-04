import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { CustomError } from "../middlewares/CustomError.js";

export const login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError(400, "Missing Fields");
  }

  let user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(401, "Invalid Credentials");
  }

  let match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new CustomError(401, "Invalid Credentials");
  }

  let token = generateToken(user);

  return res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
  });
};

export const signup = async (req, res) => {
  let { username, email, password, role } = req.body;

  if (!username || !email || !password)
    throw new CustomError(400, "Missing Fields");

  let user = await User.findOne({ email });

  if (user) throw new CustomError(400, "User Already Exists");

  user = await User.create({
    username: username,
    email: email,
    password: await bcrypt.hash(password, 10),
    role: role,
  });

  const token = generateToken(user);
  return res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};
