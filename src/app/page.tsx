
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentDashboard from "./studentDashboard/page";
import TeacherDashboard from "./teacherDashboard/page";

// Define a TypeScript interface for the user
interface User {
    name: string;
    role: "teacher" | "student";
}

// Simulated authentication (Replace with Supabase Auth later)
const mockUser: User = {
    name: "John Doe",
    role: "teacher", // Change to "student" to test student dashboard
};

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null); // ✅ Fix: Define type

    useEffect(() => {
        // Simulating fetching user data (Replace with Supabase auth logic)
        setTimeout(() => {
            if (!mockUser) {
                router.push("/login"); // Redirect to login if not authenticated
            } else {
                setUser(mockUser); // ✅ Now TypeScript knows user is of type User
            }
        }, 1000);
    }, [router]);

    if (!user) return <p className="text-center mt-10">Loading...</p>;

    return <div>{user.role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}</div>;
}
