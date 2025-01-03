import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get("http://localhost:5001/api/auth/check");
            set({ authUser: response.data});
        } catch (error) {
            console.log(error);
            set({ authUser: null });

        }
        finally {
            set({ isCheckingAuth: false });
        }
    },
}));
