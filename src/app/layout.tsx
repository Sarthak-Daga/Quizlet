// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
