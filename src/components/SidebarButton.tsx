function SidebarButton({ icon, text, active, sidebarOpen, onClick }: { 
  icon: React.ReactNode, 
  text: string, 
  active: boolean, 
  sidebarOpen: boolean,
  onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        active ? 'bg-blue-800 text-white' : 'hover:bg-blue-800/50 text-blue-100'
      }`}
    >
      <div className={`flex-shrink-0 ${active ? 'text-white' : 'text-blue-200'}`}>
        {icon}
      </div>
      {sidebarOpen && (
        <span className="font-medium">{text}</span>
      )}
    </button>
  );
}

export default SidebarButton;