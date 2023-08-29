import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function UnauthenticatedPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');

  return <div className="text-center">Please sign in to see posts.</div>;
}

export default UnauthenticatedPage;
