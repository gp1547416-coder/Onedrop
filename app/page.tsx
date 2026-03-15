'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Droplet } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already "signed in" in Local Storage
    const user = localStorage.getItem('onedrop_user');
    if (user) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f7] px-6">
      <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl">
        <Droplet className="text-white w-12 h-12 fill-current" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-4 text-center">Onedrop</h1>
      <p className="text-xl text-gray-500 mb-10 text-center max-w-md">
        The only place for your photos, files, and life.
      </p>
      <div className="flex flex-col sm:row gap-4 w-full max-w-xs justify-center">
        <Link href="/login" className="bg-blue-600 text-white px-10 py-4 rounded-full font-semibold text-center shadow-md">
          Sign In
        </Link>
      </div>
    </div>
  );
}
