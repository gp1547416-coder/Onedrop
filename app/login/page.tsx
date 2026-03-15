'use client';
import React, { useState } from 'react';
import { ChevronRight, Droplet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnedropSignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save "Sign In" status to Local Storage
    localStorage.setItem('onedrop_user', JSON.stringify({ email: email, loggedIn: true }));
    
    // Take them to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white p-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
          <Droplet className="text-white fill-current w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Onedrop ID</h1>
        
        <form onSubmit={handleContinue} className="w-full mt-8 space-y-3">
          <input 
            required
            type="email" 
            placeholder="name@example.com" 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 bg-gray-100/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            required
            type="password" 
            placeholder="Password" 
            className="w-full px-5 py-4 bg-gray-100/50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl mt-8 flex items-center justify-center gap-2"
          >
            Continue <ChevronRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
