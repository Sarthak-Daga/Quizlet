'use client';
import { useState } from 'react';
import Link from 'next/link';
import SidebarButton from '@/components/SidebarButton';
import Section from '@/components/Section';
import QuizCard from '@/components/QuizCard';
import EmptyState from '@/components/EmptyState';
import CircularProgress from '@/components/circularProgress';
import PerformanceChart from '@/components/performanceChart';
import StatCard from '@/components/statCard';
import QuizListItem from '@/components/quizlistItems';
import StudentListItem from '@/components/studentList';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data
  const quizCategories = ['All', 'Math', 'Science', 'History'];
  
  const availableQuizzes = [
    { id: '1', title: 'Algebra Basics', category: 'Math', difficulty: 'Easy', questions: 5, duration: '10 mins' },
    { id: '2', title: 'Chemistry Fundamentals', category: 'Science', difficulty: 'Medium', questions: 8, duration: '15 mins' },
  ];
  // Mock gradesheet data
  const gradesheetData = [
  { subject: 'Mathematics', score: 82, total: 100, grade: 'A' },
  { subject: 'Science', score: 65, total: 100, grade: 'B' },
  { subject: 'History', score: 48, total: 100, grade: 'D' },
  { subject: 'English', score: 73, total: 100, grade: 'B' },
  { subject: 'Computer Science', score: 91, total: 100, grade: 'A' },
];
  const upcomingQuizzes = [
    { id: '3', title: 'Physics Midterm', category: 'Science', date: '2023-12-15' },
  ];

  const completedQuizzes = [
    { id: '4', title: 'Trigonometry Quiz', category: 'Math', score: '8/10', date: '2023-11-10' },
    { id: '5', title: 'World History', category: 'History', score: '6/8', date: '2023-11-05' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Johnson', score: 95, completed: 12 },
    { rank: 2, name: 'Sarah Williams', score: 92, completed: 10 },
    { rank: 3, name: 'You', score: 88, completed: 8 },
    { rank: 4, name: 'Michael Brown', score: 85, completed: 9 },
  ];

  // Progress data
  const progressData = {
    overallScore: 82,
    categoryScores: [
      { category: 'Math', score: 85, total: 100 },
      { category: 'Science', score: 78, total: 100 },
      { category: 'History', score: 80, total: 100 },
    ],
    recentPerformance: [
      { date: 'Nov 1', score: 75 },
      { date: 'Nov 8', score: 82 },
      { date: 'Nov 15', score: 88 },
    ],
  };

  // Enrolled courses data
  const enrolledCourses = [
    {
      id: '1',
      title: 'Mathematics 101',
      code: 'MATH101',
      instructor: 'Dr. Smith',
      progress: 75,
      nextLesson: 'Algebra Fundamentals',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      thumbnail: '/math-thumbnail.jpg',
      description: 'Introduction to core mathematical concepts including algebra, geometry, and calculus.'
    },
    {
      id: '2',
      title: 'Computer Science Fundamentals',
      code: 'CS101',
      instructor: 'Prof. Johnson',
      progress: 42,
      nextLesson: 'Data Structures',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      thumbnail: '/cs-thumbnail.jpg',
      description: 'Learn the basics of programming, algorithms, and computer systems.'
    },
    {
      id: '3',
      title: 'History of Science',
      code: 'HIST205',
      instructor: 'Dr. Williams',
      progress: 90,
      nextLesson: 'Modern Scientific Discoveries',
      startDate: '2023-09-01',
      endDate: '2023-12-15',
      thumbnail: '/history-thumbnail.jpg',
      description: 'Explore the development of scientific thought through the ages.'
    },
  ];

  // Filter quizzes
  const filteredQuizzes = availableQuizzes.filter(quiz => {
    const matchesCategory = activeCategory === 'All' || quiz.category === activeCategory;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Updated color to match image */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#1D4ED8] text-white p-4 flex flex-col`}>
        <div className="p-4 border-b border-blue-700 flex items-center justify-between">
          {sidebarOpen ? (
            <h2 className="text-xl font-bold text-white">Quizlet Pro</h2>
          ) : (
            <h2 className="text-xl font-bold text-white">QP</h2>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-blue-800 text-white"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <SidebarButton 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            text="Dashboard"
            active={activeTab === 'dashboard'}
            sidebarOpen={sidebarOpen}
            onClick={() => setActiveTab('dashboard')}
          />
          
          <SidebarButton 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            text="Gradesheet"
            active={activeTab === 'gradesheet'}
            sidebarOpen={sidebarOpen}
            onClick={() => setActiveTab('gradesheet')}
          />
          
          <SidebarButton 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            text="Courses"
            active={activeTab === 'courses'}
            sidebarOpen={sidebarOpen}
            onClick={() => setActiveTab('courses')}
          />

          <SidebarButton 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            text="Upcoming Quizzes"
            active={activeTab === 'upcoming'}
            sidebarOpen={sidebarOpen}
            onClick={() => setActiveTab('upcoming')}
          />
        </nav>
        
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
              U
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-medium text-white">User Name</p>
                <p className="text-xs text-blue-200">Student</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'quizzes' && 'My Quizzes'}
              {activeTab === 'gradesheet' && 'Gradesheet'}
              {activeTab === 'courses' && 'Courses'}
              {activeTab === 'upcoming' && 'Upcoming Quizzes'}
              {activeTab === 'progress' && 'Progress'}
              {activeTab === 'leaderboard' && 'Leaderboard'}
            </h1>
          </div>

          {activeTab === 'quizzes' && (
            <>
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    className="w-full p-2 pl-8 border rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg
                    className="absolute left-2 top-3 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                  {quizCategories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full whitespace-nowrap ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Quizzes */}
              <Section title="Available Quizzes" icon="✅">
                {filteredQuizzes.length === 0 ? (
                  <EmptyState message="No quizzes available" />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQuizzes.map(quiz => (
                      <QuizCard 
                        key={quiz.id}
                        quiz={quiz}
                        actionText="Start Quiz"
                        actionHref={`/studentDashboard/quiz/${quiz.id}`}
                        actionColor="bg-blue-600 hover:bg-blue-700"
                      />
                    ))}
                  </div>
                )}
              </Section>

              {/* Upcoming Quizzes */}
              <Section title="Upcoming Quizzes" icon="📅">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingQuizzes.map(quiz => (
                    <QuizCard 
                      key={quiz.id}
                      quiz={quiz}
                      actionText="View Details"
                      actionHref="#"
                      actionColor="bg-gray-600 hover:bg-gray-700"
                      additionalInfo={
                        <div className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Scheduled:</span> {quiz.date}
                        </div>
                      }
                    />
                  ))}
                </div>
              </Section>

              {/* Completed Quizzes */}
              <Section title="Completed Quizzes" icon="🏆">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedQuizzes.map(quiz => (
                    <QuizCard 
                      key={quiz.id}
                      quiz={quiz}
                      actionText="Review"
                      actionHref="#"
                      actionColor="bg-purple-600 hover:bg-purple-700"
                      additionalInfo={
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            parseInt(quiz.score) >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            Score: {quiz.score}
                          </span>
                          <div className="text-sm text-gray-600 mt-1">
                            Completed: {quiz.date}
                          </div>
                        </div>
                      }
                    />
                  ))}
                </div>
              </Section>
            </>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-8">
              {/* Overall Progress */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32">
                    <CircularProgress percentage={progressData.overallScore} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{progressData.overallScore}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Average Score</h3>
                    <p className="text-gray-600">Across all completed quizzes</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        progressData.overallScore >= 80 ? 'bg-green-100 text-green-800' : 
                        progressData.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {progressData.overallScore >= 80 ? 'Excellent' : 
                         progressData.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category-wise Progress */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Performance by Category</h2>
                <div className="space-y-4">
                  {progressData.categoryScores.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{category.category}</span>
                        <span>{category.score}/{category.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            category.score >= 80 ? 'bg-green-600' : 
                            category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${(category.score/category.total)*100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Trend */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Performance</h2>
                <div className="h-64">
                  <PerformanceChart data={progressData.recentPerformance} />
                </div>
              </div>
            </div>
          )}
            {activeTab === 'previousQuizzes' && (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-6">Previous Quizzes</h2>
    
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search previous quizzes..."
          className="w-full p-2 pl-8 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          className="absolute left-2 top-3 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {['All', 'Math', 'Science', 'History'].map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {completedQuizzes.map(quiz => (
        <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{quiz.title}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {quiz.category}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                parseInt(quiz.score) >= 80 ? 'bg-green-100 text-green-800' : 
                parseInt(quiz.score) >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {quiz.score}
              </span>
            </div>
            
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Completed: {quiz.date}</span>
            </div>
            
            <div className="mt-4 flex justify-between">
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </Link>
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
          {activeTab === 'leaderboard' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">Class Leaderboard</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quizzes Completed</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaderboard.map((student) => (
                      <tr 
                        key={student.rank} 
                        className={student.name === 'You' ? 'bg-blue-50' : ''}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-sm font-medium ${
                            student.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            student.rank === 2 ? 'bg-gray-100 text-gray-800' :
                            student.rank === 3 ? 'bg-amber-100 text-amber-800' :
                            'bg-white'
                          }`}>
                            {student.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                              student.name === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}>
                              {student.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.score}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{student.completed}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Quizzes" value="3" icon="📊" />
                <StatCard title="Published" value="2" icon="✅" />
                <StatCard title="Students" value="3" icon="👥" />
                <StatCard title="Attendance Rate" value="67%" icon="📅" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Quizzes</h2>
                <div className="space-y-3">
                  <QuizListItem title="Math Quiz" date="12th March 2024" questions="10" />
                  <QuizListItem title="Science Quiz" date="15th March 2024" questions="8" />
                  <QuizListItem title="History Test" date="18th March 2024" questions="15" />
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                    View All →
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Top Students</h2>
                <div className="space-y-3">
                  <StudentListItem name="Alex Johnson" score="92%" />
                  <StudentListItem name="John Doe" score="85%" />
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                    View All →
                  </button>
                </div>
              </div>
            </div>
          )}

{activeTab === 'gradesheet' && (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Gradesheet</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-500">Term: Spring 2024</span>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Overall Performance</h3>
          <p className="text-sm text-gray-600">Based on all completed assessments</p>
        </div>
        <div className="relative w-20 h-20">
          <CircularProgress percentage={82} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold">82%</span>
          </div>
        </div>
      </div>
    </div>

    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Score</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Progress</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {gradesheetData.map((subject, index) => {
            const percentage = (subject.score / subject.total) * 100;
            let status, color, progressColor;
            if (percentage > 75) {
              status = 'Excellent';
              color = 'bg-green-100 text-green-800';
              progressColor = 'bg-green-500';
            } else if (percentage >= 50 && percentage <= 75) {
              status = 'Good';
              color = 'bg-yellow-100 text-yellow-800';
              progressColor = 'bg-yellow-500';
            } else {
              status = 'Needs Work';
              color = 'bg-red-100 text-red-800';
              progressColor = 'bg-red-500';
            }
            
            return (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                      {subject.subject.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{subject.subject}</div>
                      <div className="text-sm text-gray-500">Credit: 3.0</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{subject.score}/{subject.total}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color.replace('text-', '')}`}>
                    {subject.grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
                    {status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${progressColor}`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Average Score</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-blue-600">72.5%</span>
          <span className="ml-2 text-sm text-blue-500 mb-1">+2.5% from last term</span>
        </div>
        <div className="mt-4 h-2 w-full bg-blue-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '72.5%' }}></div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Highest Score</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-green-600">91%</span>
          <span className="ml-2 text-sm text-green-500 mb-1">Computer Science</span>
        </div>
        <div className="mt-3 flex items-center">
          <span className="text-sm text-green-700">Top performer in class</span>
          <svg className="ml-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Lowest Score</h3>
        <div className="flex items-end">
          <span className="text-3xl font-bold text-amber-600">48%</span>
          <span className="ml-2 text-sm text-amber-500 mb-1">History</span>
        </div>
        <div className="mt-3 flex items-center">
          <span className="text-sm text-amber-700">Needs improvement</span>
          <svg className="ml-2 h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <div className="mt-6 flex justify-end">
      <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
        <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Download Report
      </button>
    </div>
  </div>
)}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Your Enrolled Courses</h2>
                
                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No courses enrolled</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
                    <div className="mt-6">
                      <Link
                        href="#"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Browse Courses
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                        <div className="relative h-40 bg-blue-50 flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-lg font-bold text-white">{course.title}</h3>
                            <p className="text-sm text-blue-100">{course.code}</p>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.progress >= 80 ? 'bg-green-100 text-green-800' :
                              course.progress >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {course.progress}% Complete
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  course.progress >= 80 ? 'bg-green-500' : 
                                  course.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Next Lesson:</span>
                              <span className="font-medium">{course.nextLesson}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Start Date:</span>
                              <span>{course.startDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">End Date:</span>
                              <span>{course.endDate}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-2">
                            <Link
                              href={`/studentDashboard/courses/${course.id}`}
                              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
                            >
                              Continue
                            </Link>
                            <button className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md transition">
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Recommended Courses Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recommended Courses</h2>
                  <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All →
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Recommended course cards... */}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Upcoming Quizzes</h2>
              <div className="space-y-3">
                {upcomingQuizzes.map(quiz => (
                  <QuizListItem 
                    key={quiz.id}
                    title={quiz.title}
                    date={quiz.date}
                    questions="--"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}