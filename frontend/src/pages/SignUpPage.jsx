import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, Mail} from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { signup, isSignUp } = useAuthStore();

    const validateForm = () => {
        return formData.email.length > 0 && formData.password.length > 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Welcome Section */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-100">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <MessageSquare className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold text-primary">Create Account</h1>
                        <p className="text-sm text-primary/60">
                            Join us and start using our awesome service.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    Email Address
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="w-5 h-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                disabled={!validateForm()}
                                className="btn btn-primary w-full"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className = "text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to ="/login" className="text-primary">
                                Sign in
                            </Link>
                        </p>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
