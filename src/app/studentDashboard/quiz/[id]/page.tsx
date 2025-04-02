'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function QuizPage() {
  // Mock quiz data
  const quiz = {
    title: 'Math Quiz',
    questions: [
      {
        text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
      },
      {
        text: 'What is the square root of 16?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
      },
    ],
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [score, setScore] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tab locking and security measures
  useEffect(() => {
    if (!quizStarted) return;

    // Setup tab/window switching detection
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        setViolationCount(prev => prev + 1);
        alert('Warning: Switching tabs/windows is not allowed!');
      }
    };

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'Tab' || e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        setViolationCount(prev => prev + 1);
      }
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        setViolationCount(prev => prev + 1);
      }
    };

    // Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setViolationCount(prev => prev + 1);
    };

    // Request fullscreen
    const requestFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.error('Fullscreen error:', err);
      }
    };

    // Setup event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    requestFullscreen();

    // Webcam setup
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user',
            width: 640,
            height: 480 
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setWebcamActive(true);
        }

        // Periodic face detection check (simplified)
        const faceCheckInterval = setInterval(() => {
          if (!document.hasFocus()) {
            setViolationCount(prev => prev + 1);
          }
          // In production, add real face detection here
        }, 5000);

        return () => {
          clearInterval(faceCheckInterval);
          stream.getTracks().forEach(track => track.stop());
        };
      } catch (err) {
        console.error('Webcam error:', err);
        alert('Webcam access is required for this quiz!');
      }
    };

    startWebcam();

    // Warn before leaving
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? This may end your quiz.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.exitFullscreen().catch(console.error);
    };
  }, [quizStarted]);

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const calculateScore = () => {
    // Block submission if too many violations
    if (violationCount > 3) {
      alert('Quiz submission blocked due to multiple violations');
      return;
    }

    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Quiz Instructions</h1>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-1 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p>You must keep this tab active and visible at all times</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-1 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                </svg>
              </div>
              <p>Webcam must remain on and focused on your face</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-1 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <p>No external devices or assistance allowed</p>
            </div>
          </div>
          <button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Webcam Monitor */}
      <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg border z-50">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${webcamActive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm font-medium">
            {webcamActive ? 'Webcam Active' : 'Webcam Offline'}
          </span>
          {violationCount > 0 && (
            <span className="ml-auto bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
              Violations: {violationCount}
            </span>
          )}
        </div>
        <video 
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-40 h-30 object-cover rounded border"
        />
      </div>

      {/* Violation Warning */}
      {violationCount > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <p className="font-medium text-red-800">
            Warning: You have {violationCount} violation{violationCount !== 1 ? 's' : ''}. 
            {violationCount > 2 && ' Further violations may result in quiz termination.'}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="text-gray-600">
          Time remaining: 15:00
        </div>
      </div>

      {score === null ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h2>
            <p className="text-gray-800">{quiz.questions[currentQuestion].text}</p>
          </div>

          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded cursor-pointer ${
                  selectedOptions[currentQuestion] === index
                    ? 'bg-blue-100 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Previous
              </button>
            )}
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={calculateScore}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                disabled={violationCount > 3}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            Your score: {score} out of {quiz.questions.length}
          </p>
          <Link
            href="/studentDashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}