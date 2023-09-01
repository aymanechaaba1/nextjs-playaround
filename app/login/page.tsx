'use client';

import { signIn } from 'next-auth/react';

function LoginPage() {
  return (
    <div className="grid place-content-center place-items-center">
      <button onClick={(e) => signIn('google')} className="">
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
