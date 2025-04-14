import React from "react";

interface PerformanceCardProps {
  quizTitle: string;
  score: number;
  submittedAt: string;
}

export default function PerformanceCard({
  quizTitle,
  score,
  submittedAt,
}: PerformanceCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 bg-white">
      <h2 className="text-xl font-semibold text-blue-600">{quizTitle}</h2>
      <p className="mt-2 text-gray-700">
        <span className="font-medium">Score:</span> {score}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Submitted on:</span>{" "}
        {new Date(submittedAt).toLocaleString()}
      </p>
    </div>
  );
}
