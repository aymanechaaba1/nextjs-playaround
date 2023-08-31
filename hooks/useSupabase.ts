import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default function useSupabase(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return;

  const supabase = createServerActionClient({ cookies });

  return [email, password, supabase];
}
