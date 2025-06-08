import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Intento de inicio de sesión para:', email);

  // Incluimos explícitamente el campo password que normalmente está excluido por select: false
const user = await User.findOne({ email }).select('+password');
  console.log('Usuario encontrado:', user ? 'Sí' : 'No');

  if (user) {
    console.log('Comparando contraseñas...');
    const isMatch = await user.matchPassword(password);
    console.log('¿Coinciden las contraseñas?', isMatch);
    
    if (isMatch) {
      console.log('Contraseña válida, generando token...');
      generateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return;
    }
  }
  
  console.log('Autenticación fallida');
  res.status(401);
  throw new Error('Correo electrónico o contraseña inválidos');
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(0), // Fecha en el pasado para eliminar la cookie
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };

  // Solo establecer el dominio en producción
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.domain = 'tudominio.com';
  } else {
    // Para desarrollo local
    cookieOptions.domain = 'localhost';
  }

  res.cookie('jwt', '', cookieOptions);
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

// Generate JWT and set it as an HTTP-Only cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax', // Cambiado de 'strict' a 'lax' para mejor compatibilidad
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
  };

  // Solo establecer el dominio en producción
  if (isProduction) {
    cookieOptions.domain = 'tudominio.com';
  } else {
    // Para desarrollo local
    cookieOptions.domain = 'localhost';
  }


  res.cookie('jwt', token, cookieOptions);
};

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
