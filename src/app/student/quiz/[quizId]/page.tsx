"use client";

import { useEffect, useState } from "react";

interface Question {
  id: string;
  question_text: string;
  options: string[];
  marks: number;
}

interface QuizData {
  questions: Question[];
}

export default function QuizPage() {
  const [data, setData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"initial" | "fetching" | "success" | "error">("initial");

  const [answers, setAnswers] = useState<Record<string, string>>({}); // To store user answers

  useEffect(() => {
    console.log("Starting fetch with hardcoded ID");
    setStatus("fetching");

    const hardcodedId = "f19e3f8d-9f0d-45c5-a1ae-b2e73cd8cd9b";
    const url = `/api/stdent/quiz/${hardcodedId}`;
    console.log("Fetching from URL:", url);

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then(res => {
          console.log("Response status:", res.status);
          if (!res.ok) {
            throw new Error(`API returned ${res.status}`);
          }
          return res.json();
        })
        .then((json: QuizData) => {
          console.log("Fetched data:", json);
          setData(json);
          setStatus("success");
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setError(err instanceof Error ? err.message : String(err));
          setStatus("error");
        });
  }, []);

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    console.log("User answers:", answers);
    // You can handle the submission logic here, such as sending answers to the backend for evaluation
  };

  console.log("Render state:", { status, hasData: !!data, error });

  if (status === "fetching") {
    return <div>Loading quiz data...</div>;
  }

  if (status === "error") {
    return <div>Error loading quiz: {error}</div>;
  }

  if (!data || !data.questions || data.questions.length === 0) {
    return <div>No quiz questions found</div>;
  }

  return (
      <div style={{ padding: "20px" }}>
        <h1>Quiz (Hardcoded ID)</h1>
        {data.questions.map((question) => (
            <div key={question.id} style={{ marginBottom: "20px" }}>
              <h3>{question.question_text}</h3>
              <div>
                {question.options.map((option, index) => (
                    <label key={index} style={{ display: "block", marginBottom: "10px" }}>
                      <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleOptionChange(question.id, option)}
                      />
                      {option}
                    </label>
                ))}
              </div>
            </div>
        ))}
        <button onClick={handleSubmit}>Submit</button>
      </div>
  );
}
