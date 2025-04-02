import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to QuizApp</h1>
        <div className="space-y-4">
          <Link
            href="/teacherDashboard"
            className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Login as Teacher
          </Link>
          <Link
            href="/studentDashboard"
            className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Login as Student
          </Link>
        </div>
        <p className="mt-4 text-center text-gray-600">
  Don&#39;t have an account?{' '}
  <Link href="/signup" className="text-blue-600 hover:underline">
    Sign up
  </Link>
</p>
      </div>
    </div>
  );
}