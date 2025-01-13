import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
    messages: [], 
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            console.log('Fetched users:', res.data); // Debugging log
            set({ users: res.data }); // Update users
        } catch (error) {
            console.error('Error fetching users:', error); // Log error
            toast.error('Failed to fetch users');
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log('Fetched messages:', res.data); // Debugging log
            set({ messages: res.data }); // Update messages
        } catch (error) {
            console.error('Error fetching messages:', error); // Log error
            toast.error('Failed to fetch messages');
            
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    
    subscribeToMessages: () => {
        const {selectedUser} = get()
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        });
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },


    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] }); // Update messages
        }
        catch (error) {
            console.error('Error sending message:', error); // Log error
            toast.error('Failed to send message');
        }
    },
    setSelectedUser: (selectedUser) => 
        set({ selectedUser }),
        

}));
