// app/api/student/quiz/[id]/route.ts
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const quizId = params.id;

  const { data: questions, error } = await supabase
    .from("questions")
    .select("id, question_text, options, marks")
    .eq("quiz_id", quizId);

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ questions }, { status: 200 });
}
