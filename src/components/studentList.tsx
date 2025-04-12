export default function StudentListItem({ name, score }: { 
  name: string, 
  score: string 
}) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium
        parseInt(score) >= 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'`}>
        {score}
      </span>
    </div>
  );
}