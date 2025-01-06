import express from 'express';
import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io} from '../lib/socket.js';
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user?._id; // Ensure req.user exists
        if (!loggedInUserId) {
            return res.status(400).json({ message: "User not logged in" });
        }

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers); // Directly send the filteredUsers array
    } catch (error) {
        console.error("Error in getting sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatID } = req.params; // ID of the user being chatted with
        const myId = req.user._id; // ID of the logged-in user


        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatID },
                { senderId: userToChatID, receiverId: myId },
            ],
        })

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getting messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Error uploading image:", uploadError);
                return res.status(500).json({ message: "Failed to upload image" });
            }
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

