"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/statCard";
import PerformanceChart from "@/components/performanceChart";
import EmptyState from "@/components/EmptyState";

type PerformanceChartData = {
    date: string;
    score: number;
};

export default function StudentDashboardPage() {
    const [data, setData] = useState<{
        totalQuizzes: number;
        averageScore: number;
        attendance: number;
        performanceChartData: PerformanceChartData[];
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const res = await fetch("/api/stdent/dashboard");
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
                <StatCard title="Quizzes Attempted" value={data.totalQuizzes.toString()} icon="📝" />
                <StatCard title="Average Score" value={`${data.averageScore}%`} icon="📊" />
                <StatCard title="Attendance" value={`${data.attendance}%`} icon="🎯" />
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Performance Overview</h2>
                <PerformanceChart data={data.performanceChartData} />
            </div>
        </div>
    );
}
