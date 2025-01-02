import express from 'express';
const router = express.Router();

// Signup route
router.get('/signup', (req, res) => {
    res.send('Signup route');
});

// Login route
router.get('/login', (req, res) => {
    res.send('Login route');
});

// Logout route
router.get('/logout', (req, res) => {
    res.send('Logout route');
});

export default router;
