"use client";

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';


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
    const params = useParams();
    const quizId = params?.quiz_id as string;
  const [data, setData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"initial" | "fetching" | "success" | "error">("initial");

  const [answers, setAnswers] = useState<Record<string, string>>({}); // To store user answers

    useEffect(() => {
        if (!quizId) return;

        console.log("Fetching quiz ID:", quizId);
        setStatus("fetching");

        const url = `/api/student/quiz/${quizId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`API returned ${res.status}`);
                return res.json();
            })
            .then((json: Question[]) => {
                console.log("Fetched quiz data:", json);
                setData({ question: json }); // wrap it in the expected shape
                setStatus("success");
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : String(err));
                setStatus("error");
            });

    }, [quizId]);


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

  console.log("Render state:", {status, hasData: !!data, error});

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
      <div style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "40px auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        <h1 style={{
          fontSize: "28px",
          marginBottom: "30px",
          textAlign: "center",
          color: "#333"
        }}>
          🧠 Quiz Time!
        </h1>

        {data.questions.map((question) => (
            <div
                key={question.id}
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
                }}
            >
              <h3 style={{marginBottom: "15px", color: "#222"}}>{question.question_text}</h3>
              <div>
                {question.options.map((option, index) => (
                    <label
                        key={index}
                        style={{
                          display: "block",
                          marginBottom: "10px",
                          padding: "10px 15px",
                          backgroundColor:
                              answers[question.id] === option ? "#d0f0c0" : "#f0f0f0",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: "background-color 0.2s ease"
                        }}
                    >
                      <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleOptionChange(question.id, option)}
                          style={{marginRight: "10px"}}
                      />
                      {option}
                    </label>
                ))}
              </div>
            </div>
        ))}

        <button
            onClick={handleSubmit}
            style={{
              display: "block",
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3"}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#007bff"}
        >
          🚀 Submit Quiz
        </button>
      </div>
  );
}