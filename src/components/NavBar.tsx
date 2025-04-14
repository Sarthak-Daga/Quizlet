'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {createClient} from "@/lib/supabaseClient";

const Navbar = () => {
  const [user, setUser] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user?.id || null);
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/'); // Redirect to home
  };

  return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">QuizApp</h1>
          <div className="flex gap-4">
            {user ? (
                <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
            ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600">
                    Login
                  </Link>
                  <Link href="/signup" className="text-gray-600 hover:text-blue-600">
                    Signup
                  </Link>
                </>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
