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

    // Signup function (stubbed for now)
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
    logout: async (data) => {
        try {
            await axiosInstance.post("http://localhost:5001/api/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error("Error during logout:");
        }
    },
    login: async (formData) => {
        try {
            set({ isLoggingIn: true });
            const res = await axiosInstance.post("http://localhost:5001/api/auth/login", formData);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        }
        catch (error) {
            console.error("Error during login:", error);
            toast.error("Error during login");
        }
        finally {
            set({ isLoggingIn: false });
        }
    },
}));
