import React from 'react'
import { MessageSquare } from 'lucide-react';
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
        <div className = "max-w-md text-center space-y-6">
            <div className="flex justify-center gap-4 mb-4">
                <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-bounce">
                        <MessageSquare className="w-8 h-8 text-primary" />
                        </div>

                </div>
            </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to My Chat Application</h2>
        <p className="text-lg text-zinc-500">Select a chat to start messaging</p>
    </div>
  )
}

export default NoChatSelected