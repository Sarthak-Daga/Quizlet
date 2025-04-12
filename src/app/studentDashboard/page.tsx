"use client";
import { useState } from "react";
import Link from "next/link";
import SidebarButton from "@/components/SidebarButton";
import Section from "@/components/Section";
import QuizCard from "@/components/QuizCard";
import EmptyState from "@/components/EmptyState";
import CircularProgress from "@/components/circularProgress";
import PerformanceChart from "@/components/performanceChart";
import StatCard from "@/components/statCard";
import QuizListItem from "@/components/quizlistItems";
import StudentListItem from "@/components/studentList";
import Sidebar from "@/components/sidebar";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">{activeTab}</h1>
        {/* Tab-based content will go here */}
      </main>
    </div>
  );
}