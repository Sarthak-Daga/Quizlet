import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();
    
    // Create a new user using Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), { status: 400 });
    }

    const user = data?.user;  // Access user through `data.user`

    if (!user) {
      return new Response(JSON.stringify({ error: 'User creation failed' }), { status: 400 });
    }

    // Insert the user role and reference to the auth user into the users table
    const { error: dbError } = await supabase.from('users').insert([
      {
        auth_user_id: user.id, // This is the user ID from Supabase Auth
        role, // 'student' or 'teacher'
      },
    ]);

    if (dbError) {
      return new Response(JSON.stringify({ error: dbError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}
