import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    // Check authentication status
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get("http://localhost:5001/api/auth/check");
            set({ authUser: response.data });
        } catch (error) {
            console.error(error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // Signup function
    signup: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("http://localhost:5001/api/auth/signup", formData);
            toast.success("Account created successfully!");
            set({ authUser: res.data });
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Error during signup");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // Login function
    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("http://localhost:5001/api/auth/login", formData);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("Invalid email or password. Please try again.");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // Logout function
    logout: async () => {
        try {
            await axiosInstance.post("http://localhost:5001/api/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Error during logout");
        }
    },

    // Update profile
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("http://localhost:5001/api/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
            
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
