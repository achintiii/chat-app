import React from 'react'
import {X} from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import {useAuthStore} from '../store/useAuthStore';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-betweeen">
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePicture || "logo192.png"} alt={selectedUser.fullName}/>
                    </div>
                </div>
                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                        {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                    </p>
                </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="p-2 rounded-full hover:bg-base-200 transition-colors">
                <X className="w-6 h-6 text-base-content" />
            </button>
        </div>
    </div>
  )
}

export default ChatHeader