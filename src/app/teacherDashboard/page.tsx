"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/statCard"; // Your custom stat card component
import EmptyState from "@/components/EmptyState"; // Your empty state component

type TeacherDashboardData = {
    totalQuizzes: number;
    publishedQuizzes: number;
    totalStudents: number;
    attendanceRate: number;
    averageMark: number;
};

export default function TeacherDashboardPage() {
    const [data, setData] = useState<TeacherDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await fetch("/api/teacher/stats"); // Correct API endpoint for teacher
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!data) return <EmptyState message="No dashboard data found." />;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Quizzes" value={data.totalQuizzes.toString()} icon="📝" />
                <StatCard title="Total Students" value={data.totalStudents.toString()} icon="👩‍🎓" />
                <StatCard title="Attendance Rate" value={`${data.attendanceRate}%`} icon="🎯" />
                <StatCard title="Average Mark" value={`${data.averageMark}%`} icon="📊" />
            </div>
        </div>
    );
}
