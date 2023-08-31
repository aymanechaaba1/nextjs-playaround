import { PostgrestResponse } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/auth/login');

  const { data: posts }: PostgrestResponse<Post> = await supabase
    .from('posts')
    .select()
    .order('created_at', { ascending: false });

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      {posts?.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </main>
  );
}
