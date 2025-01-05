import React, { useState, useRef } from 'react';
import { X, Image } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) {
            return;
        }
        try {
            await sendMessage({ text: text.trim(), image: imagePreview });
            
            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
        }
    };
    

    const isSendDisabled = !text.trim() && !imagePreview; // Disable button if no text or image

    return (
        <div className="p-4 w-full">
            {/* Image preview section */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1 bg-base-200 rounded-full"
                            type="button"
                        >
                            <X className="w-4 h-4 text-base-content" />
                        </button>
                    </div>
                </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    {/* Text input */}
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    {/* File input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* Image upload button */}
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle ${
                            imagePreview ? "text-emerald-500" : "text-zinc-400"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>

                {/* Send button */}
                <button
                    type="submit"
                    className="btn btn-primary btn-sm sm:btn-md"
                    disabled={isSendDisabled} // Disable based on condition
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
