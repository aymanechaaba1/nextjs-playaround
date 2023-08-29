'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

function Header() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    router.refresh();
  };

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 justify-between py-2 px-4">
      <div className="flex-1"></div>
      <button
        onClick={handleLogin}
        className="bg-blue-500 py-2 px-4 text-center text-white rounded-lg hover:shadow-lg"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white text-center rounded-lg hover:shadow-lg py-2 px-3"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
