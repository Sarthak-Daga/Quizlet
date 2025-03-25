"use client"
import { useState } from "react";
import { FaChalkboardTeacher, FaBook, FaUsers, FaClipboardList } from "react-icons/fa";

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-6">Quizlet</h1>
                <nav className="flex flex-col gap-4">
                    <button onClick={() => setActiveTab("home")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                        <FaChalkboardTeacher /> Home
                    </button>
                    <button onClick={() => setActiveTab("quizzes")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                        <FaBook /> Manage Quizzes
                    </button>
                    <button onClick={() => setActiveTab("students")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                        <FaUsers /> Student Attendance
                    </button>
                    <button onClick={() => setActiveTab("marks")} className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded">
                        <FaClipboardList /> Assign Marks
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {activeTab === "home" && (
                    <section>
                        <h2 className="text-xl font-bold">Welcome, Teacher!</h2>
                        <p className="text-gray-600">Manage quizzes, track attendance, and assign marks.</p>
                    </section>
                )}

                {activeTab === "quizzes" && (
                    <section>
                        <h2 className="text-xl font-bold">Manage Quizzes</h2>
                        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">+ Create New Quiz</button>
                        <ul className="mt-4 space-y-2">
                            <li className="p-3 bg-white shadow rounded">Math Quiz - 12th March</li>
                            <li className="p-3 bg-white shadow rounded">Science Quiz - 15th March</li>
                        </ul>
                    </section>
                )}

                {activeTab === "students" && (
                    <section>
                        <h2 className="text-xl font-bold">Student Attendance</h2>
                        <ul className="mt-4 space-y-2">
                            <li className="p-3 bg-white shadow rounded">John Doe - Present</li>
                            <li className="p-3 bg-white shadow rounded">Jane Smith - Absent</li>
                        </ul>
                    </section>
                )}

                {activeTab === "marks" && (
                    <section>
                        <h2 className="text-xl font-bold">Assign Marks</h2>
                        <ul className="mt-4 space-y-2">
                            <li className="p-3 bg-white shadow rounded flex justify-between">
                                <span>John Doe</span>
                                <input type="number" className="w-16 p-1 border rounded" placeholder="Marks" />
                            </li>
                            <li className="p-3 bg-white shadow rounded flex justify-between">
                                <span>Jane Smith</span>
                                <input type="number" className="w-16 p-1 border rounded" placeholder="Marks" />
                            </li>
                        </ul>
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Submit Marks</button>
                    </section>
                )}
            </main>
        </div>
    );
};

export default TeacherDashboard;
