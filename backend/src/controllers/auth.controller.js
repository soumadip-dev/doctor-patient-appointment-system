import { registerUser, loginUser } from '../services/auth.service.js';
import { ENV } from '../config/env.config.js';

//* Register Controller
const register = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    const { user, token } = await registerUser({ name, email, password, role, specialization });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: ENV.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

//* Login Controller
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const { user, token } = await loginUser({ email, password, role });

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: ENV.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        specialization: user.specialization,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

//* Logout Controller
const logout = async (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'strict',
      secure: ENV.NODE_ENV === 'production',
    });

    res.status(200).json({ status: 'success', message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Something went wrong' });
  }
};

//* Controller to check if user is authenticated
const isAuthenticated = (req, res) => {
  try {
    // Send success response
    res.status(200).json({ status: 'success', message: 'User is authenticated', user: req.user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Something went wrong' });
  }
};
export { register, login, logout, isAuthenticated };
