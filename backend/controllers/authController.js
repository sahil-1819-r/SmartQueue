import User from '../models/User.model.js';
import Organization from '../models/Organization.model.js';
import { log } from '../utils/logger.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body, role: 'user' });
    log('AUTH', `Register request for user: ${user.email}`);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const registerOrg = async (req, res, next) => {
  try {
    const { orgName, ...rest } = req.body;
    const organization = await Organization.create({
      name: orgName,
      description: rest.description,
      address: rest.address,
    });

    const owner = await User.create({
      ...rest,
      role: 'orgOwner',
      organization: organization._id,
    });

    log('AUTH', `Register request for org: ${orgName}`);
    res.status(201).json({ user: owner, organization });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    log('AUTH', `Login attempt for email: ${req.body.email || 'N/A'}`);
    const { email, password } = req.body;
    
    if (!email || !password) {
      log('AUTH', 'Login failed: Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email }).populate('organization');
    if (!user) {
      log('AUTH', `Login failed: User not found for email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      log('AUTH', `Login failed: Invalid password for email: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    log('AUTH', `Login successful for user: ${user.email}`);
    res.json({ user });
  } catch (error) {
    log('AUTH', `Login error: ${error.message}`);
    next(error);
  }
};
