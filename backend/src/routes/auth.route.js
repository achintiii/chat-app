import express from 'express';
import {login, logout, signup} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';
const router = express.Router();

// Signup route
router.get('/signup', signup);

// Login route
router.get('/login', login);

// Logout route
router.get('/logout', logout);

//router.put("/update-profile", protectRoute, updateProfile);

export default router;
