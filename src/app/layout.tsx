import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">QuizApp</h1>
            <div className="flex gap-4">
              <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
              <a href="/signup" className="text-gray-600 hover:text-blue-600">Signup</a>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}