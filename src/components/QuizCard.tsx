import Link from "next/link";

export default function QuizCard({ quiz, actionText, actionHref, actionColor, additionalInfo }: { 
  quiz: {
    id: string;
    title: string;
    category: string;
    difficulty?: string;
    questions?: number;
    duration?: string;
    date?: string;
    score?: string;
  }, 
  actionText: string, 
  actionHref: string, 
  actionColor: string,
  additionalInfo?: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{quiz.title}</h3>
            <div className="flex gap-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {quiz.category}
              </span>
              {quiz.difficulty && (
                <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                  quiz.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  quiz.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {quiz.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {quiz.duration && (
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {quiz.duration}
          </div>
        )}
        
        {additionalInfo}
        
        <Link
          href={actionHref}
          className={`mt-4 block text-center text-white py-2 px-4 rounded-md transition ${actionColor}`}
        >
          {actionText}
        </Link>
      </div>
    </div>
  );
}
