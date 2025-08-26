import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ENV } from '../config/env.config.js';

//* Generate JWT Token
const signToken = id => {
  return jwt.sign({ id }, ENV.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: ENV.JWT_EXPIRES_IN || '7d',
  });
};

//* Register Service
const registerUser = async ({ name, email, password, role, specialization }) => {
  if (!name || !email || !password || !role) {
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    specialization: role === 'doctor' ? specialization : undefined,
  });

  const token = signToken(user._id);
  return { user, token };
};

//* Login Service
const loginUser = async ({ email, password, role }) => {
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  if (user.role !== role) {
    throw new Error('Access denied for this role');
  }

  const token = signToken(user._id);
  return { user, token };
};

export { registerUser, loginUser };
