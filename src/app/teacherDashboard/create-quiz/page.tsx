'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{
    text: '',
    options: ['', ''],
    correctAnswer: 0
  }]);

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: ['', ''],
      correctAnswer: 0
    }]);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Quiz</h1>
        <Link 
          href="/teacherDashboard" 
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quiz title"
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-8 p-4 border rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Question {qIndex + 1}</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].text = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter question"
              />
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-gray-700 mb-2">Options</label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={question.correctAnswer === oIndex}
                    onChange={() => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].correctAnswer = oIndex;
                      setQuestions(newQuestions);
                    }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].options[oIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}
              <button
                onClick={() => addOption(qIndex)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Option
              </button>
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add Question
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
}