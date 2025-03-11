"use client"
import { useState } from "react";
import { FaBook, FaChartBar, FaQuestionCircle, FaHome } from "react-icons/fa";

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-6">Quizlet</h1>
        <nav className="flex flex-col gap-4">
    <button onClick={() => setActiveTab("home")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
        <FaHome /> Home
        </button>
        <button onClick={() => setActiveTab("quizzes")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
        <FaBook /> Quizzes
        </button>
        <button onClick={() => setActiveTab("results")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
        <FaChartBar /> Results
        </button>
        <button onClick={() => setActiveTab("doubts")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
        <FaQuestionCircle /> Ask Doubts
    </button>
    </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6">
        {activeTab === "home" && (
            <section>
                <h2 className="text-xl font-bold">Welcome, Student!</h2>
            <p className="text-gray-600">Check your upcoming quizzes and scores here.</p>
    </section>
)}

    {activeTab === "quizzes" && (
        <section>
            <h2 className="text-xl font-bold">Available Quizzes</h2>
    <ul className="mt-4 space-y-2">
    <li className="p-3 bg-white shadow rounded">Math Quiz - 12th March</li>
    <li className="p-3 bg-white shadow rounded">Science Quiz - 15th March</li>
    </ul>
    </section>
    )}

    {activeTab === "results" && (
        <section>
            <h2 className="text-xl font-bold">Quiz Results</h2>
    <ul className="mt-4 space-y-2">
    <li className="p-3 bg-white shadow rounded">Math Quiz: 85%</li>
    <li className="p-3 bg-white shadow rounded">Science Quiz: 90%</li>
    </ul>
    </section>
    )}

    {activeTab === "doubts" && (
        <section>
            <h2 className="text-xl font-bold">Ask a Doubt</h2>
    <textarea className="w-full p-2 mt-2 border rounded" placeholder="Type your question..."></textarea>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </section>
    )}
    </main>
    </div>
);
};

export default StudentDashboard;
