// components/Sidebar.tsx
import SidebarButton from "./SidebarButton";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const navItems = [
    { icon: "📊", text: "Dashboard" },
    { icon: "📝", text: "Quizzes" },
    { icon: "📈", text: "Performance" },
    { icon: "⚙️", text: "Settings" },
  ];

  return (
    <aside className={`bg-blue-900 text-white w-${sidebarOpen ? "64" : "20"} transition-all duration-300 p-4`}>
      <div className="flex justify-between items-center mb-6">
        {sidebarOpen && <h1 className="text-lg font-bold">Student</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? "←" : "→"}
        </button>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <SidebarButton
            key={item.text}
            icon={<span className="text-lg">{item.icon}</span>}
            text={item.text}
            active={activeTab === item.text}
            sidebarOpen={sidebarOpen}
            onClick={() => setActiveTab(item.text)}
          />
        ))}
      </nav>
    </aside>
  );
}
