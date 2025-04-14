"use client";
import { useEffect, useState } from "react";
import PerformanceCard from "@/components/performanceCard";

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
        const response = await fetch("/api/stdent/performance");
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setSubmissions(data);
      } catch (err: any) {
        setError("Failed to fetch performance data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p className="p-4">Loading performance data...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Performance</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          submissions.map((submission) => (
            <PerformanceCard
              key={submission.id}
              quizTitle={submission.quiz.title}
              score={submission.score}
              submittedAt={submission.submitted_at}
            />
          ))
        )}
      </div>
    </div>
  );
}
