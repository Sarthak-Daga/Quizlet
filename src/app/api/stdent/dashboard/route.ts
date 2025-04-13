import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";  // Correctly import the initialized supabase client

// Mock student ID for now
const mockStudentId = "3ffb29d7-e71b-4bec-92d2-c91c9b5ae640";  // Replace with a mock UUID

export async function GET() {
    try {
        // Total quizzes attempted
        const { data: submissions, error: subError } = await supabase
            .from("submissions")
            .select("*")
            .eq("student_id", mockStudentId);

        if (subError) throw subError;

        const totalQuizzes = submissions.length;
        const totalScore = submissions.reduce((sum, sub) => sum + sub.total_score, 0);
        const averageScore = totalQuizzes > 0 ? totalScore / totalQuizzes : 0;

        // Attendance
        const { data: attendanceData, error: attError } = await supabase
            .from("attendance")
            .select("*")
            .eq("student_id", mockStudentId);

        if (attError) throw attError;

        const totalDays = attendanceData.length;
        const presentDays = attendanceData.filter(a => a.status === "present").length;
        const attendance = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

        // Prepare performance chart (mock for now)
        const performanceChartData = submissions.map((sub) => ({
            quiz: `Quiz ${sub.quiz_id.slice(0, 4)}`,  // Slice to match the format you want
            score: sub.total_score,
        }));

        return NextResponse.json({
            totalQuizzes,
            averageScore: averageScore.toFixed(2),
            attendance: attendance.toFixed(2),
            performanceChartData,
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
