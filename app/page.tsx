import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PostgrestResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/unauthenticated');

  const { data: posts }: PostgrestResponse<Post> = await supabase
    .from('posts')
    .select()
    .order('created_at', { ascending: false });

  console.log(posts);

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 items-start md:grid-cols-3 lg:grid-cols-4 gap-4 md:max-w-6xl mx-auto">
        {posts?.map((task) => (
          <div key={task.id} className="rounded-lg border py-2 px-4 space-y-2">
            <p className="text-xs text-gray-400">{task.id}</p>
            <p className="text-sm">
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).format(new Date(task.created_at))}
            </p>
            <h1 className="text-2xl font-medium">{task.title}</h1>
            <p>{task.description}</p>

            <form action="" className="flex items-center justify-end gap-4">
              <Link prefetch={false} href={`/edit/${task.id}`}>
                <PencilSquareIcon className="w-5 h05 text-gray-800 hover:text-blue-500" />
              </Link>
              <button
                formAction={async (formData: FormData) => {
                  'use server';
                  await supabase.from('posts').delete().eq('id', task.id);
                }}
              >
                <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-600" />
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
