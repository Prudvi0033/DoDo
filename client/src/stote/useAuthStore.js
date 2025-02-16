import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    notes: [],
    gettingNotes: false,
    isRegistering: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/profile");
            set({ authUser: response.data });
        } catch (error) {
            set({ authUser: null });
            console.log("Auth Check Failed:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (data) => {
        set({ isRegistering: false })
        try {
            const response = await axiosInstance.post("/auth/register", data)
            set({ authUser: response })
            toast.success("Succesfully Registered")
        } catch (error) {
            toast.error("Error in Registration")
            console.log("Error in Registration", error)
        } finally {
            set({ isRegistering: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("Login Successful");
        } catch (error) {
            toast.error("Error in Login");
            console.log("Error in Login:", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout Successful");
        } catch (error) {
            toast.error("Error in Logout");
            console.log("Error in Logout:", error);
        }
    },

    fetchNotes: async (search) => {
        set({ gettingNotes: true })
        try {
            const response = await axiosInstance.get(`http://localhost:8000/api/user/notes?filter=${search}`);
            set({notes: response.data.notes});
        } catch (error) {
            console.log("Error in getting notes");
            toast.error("Error in getting notes")
        } finally {
            set({ gettingNotes: false })
        }
    }
}));
