"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import QuizCard from "@/components/QuizCard"; // adjust path if needed

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty?: string;
  duration?: string;
  description?: string;
  created_at: string;
}

export default function StudentQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("/api/stdent/quizzes");
        const json = await res.json();
  
        if (!res.ok) throw new Error(json.error || "Error fetching");
  
        setQuizzes(json.quizzes);
      } catch (err: any) {
        setError("Error fetching quizzes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuizzes();
  }, []);
  

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>

      {quizzes.length === 0 ? (
        <p>No quizzes available at the moment.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={{
                id: quiz.id,
                title: quiz.title,
                category: quiz.category || "General",
                difficulty: quiz.difficulty || "Medium",
                duration: quiz.duration || "15 mins",
              }}
              actionText="Attempt Quiz"
              actionHref={`/student/quiz/${quiz.id}`}
              actionColor="bg-blue-500"
              additionalInfo={
                quiz.description ? (
                  <p className="text-sm text-gray-600 mt-2">{quiz.description}</p>
                ) : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
