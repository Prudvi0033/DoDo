import { useAuthStore } from "../stote/useAuthStore"; 
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useNoteStore = create((set) => ({
    notes: [],
    creatingNotes: false,
    updatingNotes: false,
    deletingNotes: false,

    createNotes: async (data) => {
        set({ creatingNotes: true });
        try {
            const response = await axiosInstance.post("/user/notes", data);
            set((state) => ({ notes: [...state.notes, response.data] }));
            toast.success("Created Notes");
            useAuthStore.getState().fetchNotes(); 
        } catch (error) {
            console.log("Error in Creating Notes", error);
            toast.error("Error in Creating Notes");
        } finally {
            set({ creatingNotes: false });
        }
    },


    deleteNotes: async (notesId) => {  
        set({ deletingNotes: true });
        try {
            await axiosInstance.delete(`/user/notes/${notesId}`);
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== notesId),
            }));
            toast.success("Deleted Note");
            useAuthStore.getState().fetchNotes(); 
        } catch (error) {
            console.log("Error in Deleting Notes", error);
            toast.error("Error in Deleting Notes");
        } finally {
            set({ deletingNotes: false });
        }
    },
}));
