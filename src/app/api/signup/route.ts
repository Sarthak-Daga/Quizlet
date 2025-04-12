import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // 1. Create a new user using Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !data?.user) {
      return new Response(JSON.stringify({ error: authError?.message || 'Signup failed' }), { status: 400 });
    }

    const user = data.user;

    // 2. Insert user role into your `users` table
    const { error: insertError } = await supabase.from('users').insert([
      {
        auth_user_id: user.id,
        role, // either "student" or "teacher"
      },
    ]);

    if (insertError) {
      return new Response(JSON.stringify({ error: insertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
