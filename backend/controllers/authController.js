import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Organization from '../models/Organization.model.js';
import { log } from '../utils/logger.js';

const createToken = (user) =>
  jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

export const registerUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, role: 'user' });
    log('AUTH', `Register request for user: ${user.email}`);
    res.status(201).json({ token: createToken(user), user });
  } catch (error) {
    next(error);
  }
};

export const registerOrg = async (req, res, next) => {
  try {
    const { orgName, location, ...rest } = req.body;
    const organization = await Organization.create({
      name: orgName,
      description: rest.description,
      location,
    });

    const owner = await User.create({
      ...rest,
      role: 'orgOwner',
      organization: organization._id,
    });

    log('AUTH', `Register request for org: ${orgName}`);
    res.status(201).json({ token: createToken(owner), user: owner, organization });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('organization');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = createToken(user);
    log('AUTH', `Login request for user: ${user.email}`);
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};
