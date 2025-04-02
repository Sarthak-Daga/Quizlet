'use client';

import { useState, useEffect } from 'react';
import { 
  FaChalkboardTeacher, 
  FaBook, 
  FaUsers, 
  FaClipboardList,
  FaPlus,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import Link from 'next/link';

// Mock data types
type Quiz = {
  id: string;
  name: string;
  date: string;
  questions: number;
  status: 'draft' | 'published' | 'archived';
};

type Student = {
  id: string;
  name: string;
  attendance: 'present' | 'absent';
  date: string;
  marks?: number;
};

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<'home' | 'quizzes' | 'students' | 'marks'>('home');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQuizzes([
        { id: '1', name: 'Math Quiz', date: '12th March 2024', questions: 10, status: 'published' },
        { id: '2', name: 'Science Quiz', date: '15th March 2024', questions: 8, status: 'draft' },
        { id: '3', name: 'History Test', date: '18th March 2024', questions: 15, status: 'published' },
      ]);

      setStudents([
        { id: 'S001', name: 'John Doe', attendance: 'present', date: '12th March 2024', marks: 85 },
        { id: 'S002', name: 'Jane Smith', attendance: 'absent', date: '12th March 2024', marks: 0 },
        { id: 'S003', name: 'Alex Johnson', attendance: 'present', date: '12th March 2024', marks: 92 },
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Handle quiz status change
  const handleQuizStatus = (id: string, newStatus: Quiz['status']) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, status: newStatus } : quiz
    ));
  };

  // Handle mark update
  const handleMarkUpdate = (studentId: string, newMark: number) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, marks: newMark } : student
    ));
  };

  // Stats calculation
  const stats = {
    totalQuizzes: quizzes.length,
    publishedQuizzes: quizzes.filter(q => q.status === 'published').length,
    totalStudents: students.length,
    attendanceRate: Math.round(
      (students.filter(s => s.attendance === 'present').length / students.length) * 100
    ) || 0,
    averageMark: Math.round(
      students.reduce((sum, student) => sum + (student.marks || 0), 0) / students.length
    ) || 0
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaChalkboardTeacher /> Quizlet Pro
        </h1>
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex items-center gap-3 p-3 rounded transition ${activeTab === 'home' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <FaChalkboardTeacher className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('quizzes')} 
            className={`flex items-center gap-3 p-3 rounded transition ${activeTab === 'quizzes' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <FaBook className="w-5 h-5" /> Manage Quizzes
          </button>
          <button 
            onClick={() => setActiveTab('students')} 
            className={`flex items-center gap-3 p-3 rounded transition ${activeTab === 'students' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <FaUsers className="w-5 h-5" /> Student Management
          </button>
          <button 
            onClick={() => setActiveTab('marks')} 
            className={`flex items-center gap-3 p-3 rounded transition ${activeTab === 'marks' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            <FaClipboardList className="w-5 h-5" /> Gradebook
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'home' && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
                    <p className="text-gray-600">Welcome back! Heres your overview.</p>
                  </div>
                  <div className="flex gap-3">
                    <Link 
                      href="/teacherDashboard/create-quiz" 
                      className="btn-primary flex items-center gap-2"
                    >
                      <FaPlus /> New Quiz
                    </Link>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard 
                    title="Total Quizzes" 
                    value={stats.totalQuizzes} 
                    icon={<FaBook className="text-blue-500" />}
                  />
                  <StatCard 
                    title="Published" 
                    value={stats.publishedQuizzes} 
                    icon={<FaCheck className="text-green-500" />}
                  />
                  <StatCard 
                    title="Students" 
                    value={stats.totalStudents} 
                    icon={<FaUsers className="text-purple-500" />}
                  />
                  <StatCard 
                    title="Attendance Rate" 
                    value={`${stats.attendanceRate}%`} 
                    icon={<FaChartLine className="text-orange-500" />}
                  />
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Recent Quizzes</h3>
                      <Link href="/teacherDashboard/quizzes" className="text-blue-600 hover:underline text-sm">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {quizzes.slice(0, 3).map(quiz => (
                        <div key={quiz.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{quiz.name}</p>
                            <p className="text-sm text-gray-500">{quiz.date} • {quiz.questions} questions</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            quiz.status === 'published' ? 'bg-green-100 text-green-800' :
                            quiz.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {quiz.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">Top Students</h3>
                      <Link href="/teacherDashboard/marks" className="text-blue-600 hover:underline text-sm">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {students
                        .filter(s => s.marks && s.marks > 80)
                        .sort((a, b) => (b.marks || 0) - (a.marks || 0))
                        .slice(0, 3)
                        .map(student => (
                          <div key={student.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.id}</p>
                            </div>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {student.marks}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Quiz Management</h2>
                    <p className="text-gray-600">Create, edit, and manage your quizzes</p>
                  </div>
                  <Link 
                    href="/teacherDashboard/create-quiz" 
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaPlus /> New Quiz
                  </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {quizzes.map(quiz => (
                          <tr key={quiz.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{quiz.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{quiz.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{quiz.questions}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={quiz.status}
                                onChange={(e) => handleQuizStatus(quiz.id, e.target.value as Quiz['status'])}
                                className={`text-xs rounded-full px-3 py-1 ${
                                  quiz.status === 'published' ? 'bg-green-100 text-green-800' :
                                  quiz.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}
                              >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                              <Link 
                                href={`/teacherDashboard/quizzes/${quiz.id}/edit`}
                                className="text-blue-600 hover:text-blue-800 p-1"
                                title="Edit"
                              >
                                <FaEdit />
                              </Link>
                              <button 
                                className="text-red-600 hover:text-red-800 p-1"
                                title="Delete"
                                onClick={() => setQuizzes(quizzes.filter(q => q.id !== quiz.id))}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Student Management</h2>
                    <p className="text-gray-600">View and manage student attendance</p>
                  </div>
                  <button className="btn-secondary flex items-center gap-2">
                    <FaPlus /> Add Student
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{student.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                student.attendance === 'present' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {student.attendance === 'present' ? 'Present' : 'Absent'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button 
                                className={`p-1 rounded-full ${
                                  student.attendance === 'present' 
                                    ? 'text-red-600 hover:bg-red-50' 
                                    : 'text-green-600 hover:bg-green-50'
                                }`}
                                onClick={() => {
                                  setStudents(students.map(s =>
                                    s.id === student.id 
                                      ? { ...s, attendance: s.attendance === 'present' ? 'absent' : 'present' } 
                                      : s
                                  ));
                                }}
                                title={student.attendance === 'present' ? 'Mark Absent' : 'Mark Present'}
                              >
                                {student.attendance === 'present' ? <FaTimes /> : <FaCheck />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Marks Tab */}
            {activeTab === 'marks' && (
              <section className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Gradebook</h2>
                    <p className="text-gray-600">Assign and manage student marks</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-secondary">
                      Export Grades
                    </button>
                    <button className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{student.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">Math Quiz</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={student.marks || ''}
                                onChange={(e) => handleMarkUpdate(student.id, parseInt(e.target.value) || 0)}
                                className="w-20 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {student.marks ? (
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  student.marks >= 90 ? 'bg-green-100 text-green-800' :
                                  student.marks >= 70 ? 'bg-blue-100 text-blue-800' :
                                  student.marks >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {student.marks >= 90 ? 'A' :
                                   student.marks >= 70 ? 'B' :
                                   student.marks >= 50 ? 'C' : 'D'}
                                </span>
                              ) : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

// StatCard Component
function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}