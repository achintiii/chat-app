import express from 'express';
import {login, logout, signup} from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';
import {updateProfile} from '../controllers/auth.controller.js';
import {checkAuth} from '../controllers/auth.controller.js';
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth)

export default router;
