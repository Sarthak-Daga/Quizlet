import { supabase } from '@/lib/supabaseClient'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const authUserId = searchParams.get('authUserId')

    if (!authUserId) {
      return new Response(JSON.stringify({ error: 'authUserId is required' }), { status: 400 })
    }

    // Query the users table based on the auth_user_id (not email)
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('auth_user_id', authUserId)  // Query by the auth_user_id
      .single()  // Ensure we get a single result

    if (error || !data) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }

    const role = data.role
    return new Response(JSON.stringify({ role }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user role' }), { status: 500 })
  }
}
