"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  marks: number;
}

export default function QuizDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // question_id => selected_option

  useEffect(() => {
    const fetchQuestions = async () => {
      console.log("Quiz ID:", id); // DEBUG
      try {
        const res = await fetch(`/api/student/quiz/${id}`);
        console.log("Response:", res); // DEBUG
        if (!res.ok) throw new Error("Failed to load quiz");
        const data = await res.json();
        console.log("Data:", data); // DEBUG
        setQuestions(data.questions);
      } catch (err: any) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) fetchQuestions(); // ✅ Important: Only fetch if ID is available
  }, [id]);
  

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    // TODO: send to backend for evaluation if needed
  };

  if (loading) return <p>Loading quiz...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-6 border p-4 rounded shadow-sm">
          <p className="font-semibold">{idx + 1}. {q.question_text}</p>
          <div className="mt-2 space-y-1">
            {q.options.map((opt, i) => {
              const optionLabel = String.fromCharCode(65 + i); // A, B, C, D...
              return (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q.id}
                    value={optionLabel}
                    checked={answers[q.id] === optionLabel}
                    onChange={() => handleOptionSelect(q.id, optionLabel)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">{optionLabel}. {opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Quiz
      </button>
    </div>
  );
}
function setError(message: any) {
  throw new Error("Function not implemented.");
}

