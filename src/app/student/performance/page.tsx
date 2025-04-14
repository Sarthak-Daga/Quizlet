"use client";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  score: number;
  submitted_at: string;
  quiz: {
    title: string;
  };
}

export default function PerformancePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("/api/stdent/performance");
        if (!res.ok) throw new Error("Failed to fetch performance data");

        const data = await res.json();
        setSubmissions(data);
      } catch (err: any) {
        console.error(err);
        setError("Error loading performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p className="p-4">Loading performance...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Performance</h1>
      {submissions.length === 0 ? (
        <p>No quiz submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((submission) => (
            <li
              key={submission.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{submission.quiz.title}</h2>
              <p className="text-sm text-gray-600">
                Submitted: {new Date(submission.submitted_at).toLocaleString()}
              </p>
              <p className="text-blue-600 font-medium">Score: {submission.score}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
