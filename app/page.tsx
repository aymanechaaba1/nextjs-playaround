import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = getServerSession(authOptions);

  console.log(session);

  return (
    <main className="p-5 flex flex-col justify-center items-center"></main>
  );
}
