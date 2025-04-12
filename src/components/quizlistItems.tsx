export default function QuizListItem({ title, date, questions }: { 
  title: string, 
  date: string, 
  questions: string 
}) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{date} • {questions} questions</p>
      </div>
      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">published</span>
    </div>
  );
}