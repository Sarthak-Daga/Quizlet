import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select className="w-full p-2 border rounded">
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}