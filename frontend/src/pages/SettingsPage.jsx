import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hello, how are you?", isSent: false },
    { id: 2, content: "I'm good, how about you?", isSent: true },
];

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className="space-y-6">
                {/* Theme Selection Section */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-zinc-500">
                        Choose a theme for the application
                    </p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {THEMES.map((t) => (
                        <button
                            key={t}
                            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                                theme === t
                                    ? "bg-base-200 border border-primary"
                                    : "hover:bg-base-200/50"
                            }`}
                            onClick={() => setTheme(t)}
                        >
                            {/* Theme Preview */}
                            <div
                                className="relative h-8 w-full rounded-md overflow-hidden"
                                data-theme={t}
                            >
                                <div className="absolute inset-0 flex gap-1">
                                    <div className="h-full w-1/4 bg-primary"></div>
                                    <div className="h-full w-1/4 bg-secondary"></div>
                                    <div className="h-full w-1/4 bg-accent"></div>
                                    <div className="h-full w-1/4 bg-neutral"></div>
                                </div>
                            </div>
                            {/* Theme Name */}
                            <span className="text-[11px] font-medium truncate w-full text-center">
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
