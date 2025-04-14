// app/api/student/quizzes/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from("quizzes")
      .select("*") // only published quizzes

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ quizzes: data }, { status: 200 });
  } catch (err: any) {
    console.error("Server error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
