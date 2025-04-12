// components/WebcamMonitor.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function WebcamMonitor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [alertCount, setAlertCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
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
          setIsReady(true);
        }

        // Face detection checks (simplified)
        setInterval(() => {
          if (!document.hasFocus()) {
            setAlertCount(prev => prev + 1);
            console.warn('User switched tabs!');
          }
          // Add real face detection with TensorFlow.js in production
        }, 5000);

      } catch (err) {
        console.error('Webcam error:', err);
        // Handle blocked webcam (e.g., prevent quiz submission)
      }
    };

    startWebcam();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg border">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm font-medium">
          {isReady ? 'Webcam Active' : 'Initializing...'}
        </span>
        {alertCount > 0 && (
          <span className="ml-auto bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
            Alerts: {alertCount}
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
  );
}