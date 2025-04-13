// app/api/student/quizzes/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
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
