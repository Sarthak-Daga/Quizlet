// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarButton from "./SidebarButton";

export default function Sidebar({
                                  sidebarOpen,
                                  setSidebarOpen,
                                }: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { icon: "📊", text: "Dashboard", href: "/student/dashboard" },
    { icon: "📝", text: "Quizzes", href: "/student/quizzes" },
    { icon: "📈", text: "Performance", href: "/student/performance" },
    { icon: "⚙️", text: "Settings", href: "/student/settings" },
  ];

  return (
      <aside
          className={`bg-blue-900 text-white ${
              sidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 p-4`}
      >
        <div className="flex justify-between items-center mb-6">
          {sidebarOpen && <h1 className="text-lg font-bold">Student</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
              <Link key={item.text} href={item.href}>
                <SidebarButton
                    icon={<span className="text-lg">{item.icon}</span>}
                    text={item.text}
                    active={pathname === item.href}
                    sidebarOpen={sidebarOpen}
                    onClick={() => {}} // No-op, since routing handles tab switch
                />
              </Link>
          ))}
        </nav>
      </aside>
  );
}
