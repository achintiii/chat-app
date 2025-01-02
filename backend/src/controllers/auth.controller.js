import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    generateToken(newUser._id, res);

    // Respond with user data
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePicture: newUser.profilePicture || null,
    });
  } catch (error) {
    console.error("Error in user signup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture || null,
        });
    }
    catch (error){
        console.error("Error in user login:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out" });
  }
  catch (error) {
    console.error("Error in user logout:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;
        if (!profilePicture) {
            return res.status(400).json({ message: "Profile Pic is Required" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture:uploadResponse.secure_url}, { new: true });
    }
    catch(error){
        console.error("Error in user updateProfile:", error.message);
        res.status(500).json({ message: "Server error" });
    }


}
export const checkAuth = (req, res) => {
    try {
        res.status (200).json(req.user);

    }
    catch (error) {
        console.error("Error in user checkAuth:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}
