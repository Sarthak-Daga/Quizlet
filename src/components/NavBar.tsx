// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">QuizApp</h1>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link href="/signup" className="text-gray-600 hover:text-blue-600">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
