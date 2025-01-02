import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';

const app = express();
app.use("/api/auth", authRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mernstack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.get('/', (req, res) => {
    res.send('Hello, MERN stack backend!');
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
