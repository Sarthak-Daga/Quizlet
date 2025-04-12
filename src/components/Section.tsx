export default function Section({ title, icon, children }: { 
  title: string, 
  icon: string, 
  children: React.ReactNode 
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      {children}
    </section>
  );
}