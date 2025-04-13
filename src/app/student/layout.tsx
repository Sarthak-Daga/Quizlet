// student/layout.tsx
"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
