import React from "react";
import { Camera } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePicture: base64Image });
        };

    };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primary">Profile</h1>
                        <p className="text-primary/60">Update your profile information</p>
                    </div>
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || authUser.profilePicture || "logo192.png"}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4"
                            />
                            <label
                                htmlFor="profilePicture"
                                className={`absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer ${
                                    isUpdatingProfile ? "pointer-events-none opacity-50" : ""
                                }`}
                            >
                                <Camera className="w-6 h-6 text-white" />
                                <input
                                    type="file"
                                    id="profilePicture"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile ? "Uploading..." : "Click to upload a new profile picture"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
