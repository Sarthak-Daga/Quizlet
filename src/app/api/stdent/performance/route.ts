import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
  .from("submissions")
  .select("id, total_score, submitted_at, quiz:quizzes(title)");


    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten quiz array if Supabase returns it as an array
    const cleanedData = data.map((submission) => ({
      ...submission,
      quiz: Array.isArray(submission.quiz) ? submission.quiz[0] : submission.quiz,
    }));

    return NextResponse.json(cleanedData, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
