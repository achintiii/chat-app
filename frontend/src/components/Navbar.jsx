import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header className="bg-base-100 border-b border-black border-opacity-10 p-4 flex justify-between items-center">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Logo Section */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold text-primary">Chat App</h1>
                        </Link>
                    </div>

                    {/* User Actions Section */}
                    <div className="flex items-center gap-4">
                        {authUser ? (
                            <div className="flex items-center gap-4">
                                {/* Profile Picture */}
                                <Link to="/profile" className="hover:opacity-80 transition-all">
                                    <img
                                        src={authUser?.photoURL || "logo192.png"}
                                        alt="User"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </Link>

                                {/* Settings Button */}
                                <Link
                                    to="/settings"
                                    className="btn btn-secondary hover:bg-secondary/80"
                                >
                                    Settings
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={logout}
                                    className="btn btn-primary hover:bg-primary/80"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                {/* Login and Signup Buttons */}
                                <Link to="/login" className="btn btn-primary">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
