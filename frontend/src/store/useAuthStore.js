import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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
            const response = await axiosInstance.post("http://localhost:5001/api/auth/signup", formData);
            set({ authUser: response.data });
            console.log("Signup successful", response.data);
        } catch (error) {
            console.error("Error during signup:", error);
        } finally {
            set({ isSigningUp: false });
        }
    },
}));
