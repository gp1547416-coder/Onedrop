import Link from 'next/link';
import { Droplet } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f7]">
      <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center mb-8 shadow-xl">
        <Droplet className="text-white w-12 h-12 fill-current" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-4">Onedrop</h1>
      <p className="text-xl text-gray-500 mb-10 text-center max-w-md">
        The only place for your photos, files, and life.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
          Sign In
        </Link>
        <Link href="/dashboard" className="bg-white border border-gray-300 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition">
          Demo
        </Link>
      </div>
    </div>
  );
}
