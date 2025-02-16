import { useAuthStore } from "../store/useAuthStore"; // Import authStore

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
            useAuthStore.getState().fetchNotes(); // Refresh notes
        } catch (error) {
            console.log("Error in Creating Notes", error);
            toast.error("Error in Creating Notes");
        } finally {
            set({ creatingNotes: false });
        }
    },

    editNotes: async (notesId, data) => {  
        set({ updatingNotes: true });
        try {
            const response = await axiosInstance.put(`/user/notes/${notesId}`, data);
            set((state) => ({
                notes: state.notes.map((note) =>
                    note._id === notesId ? response.data : note
                ),
            }));
            toast.success("Updated Note");
            useAuthStore.getState().fetchNotes(); // Refresh notes
        } catch (error) {
            console.log("Error in Updating Notes", error);
            toast.error("Error in Updating Notes");
        } finally {
            set({ updatingNotes: false });
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
            useAuthStore.getState().fetchNotes(); // Refresh notes
        } catch (error) {
            console.log("Error in Deleting Notes", error);
            toast.error("Error in Deleting Notes");
        } finally {
            set({ deletingNotes: false });
        }
    },
}));
