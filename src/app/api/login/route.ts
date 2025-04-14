// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabaseServer' // Make sure this is correctly set up

export async function POST(req: Request) {
  const supabase = await createClient();
  try {
    const { email, password } = await req.json() // Get email and password from the request body

    // Use Supabase to authenticate the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ user: data.user })
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during login.' }, { status: 500 })
  }
}
