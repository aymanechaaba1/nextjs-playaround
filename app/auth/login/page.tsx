import useSupabase from '@/hooks/useSupabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function LoginPage() {
  const signInAction = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) return;

    const supabase = createServerActionClient({ cookies });

    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    redirect('/');
  };

  const signUpAction = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) return;

    const supabase = createServerActionClient({ cookies });

    await supabase.auth.signUp({
      email,
      password,
    });

    redirect('/');
  };

  return (
    <div className="">
      <form action={signInAction} className="flex flex-col p-5 gap-4">
        <input
          type="email"
          placeholder="email..."
          className="border rounded-lg py-2 px-3"
          name="email"
        />
        <input
          type="password"
          placeholder="password..."
          className="border rounded-lg py-2 px-3"
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-lg text-white text-center font-medium py-2 hover:shadow-lg"
        >
          Sign In
        </button>
        <button
          formAction={signUpAction}
          className="py-2 bg-blue-600 text-white text-center font-medium rounded-lg hover:shadow-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
