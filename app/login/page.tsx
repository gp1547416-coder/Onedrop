'use client';

import React from 'react';
import { ChevronRight, ShieldCheck, Droplet, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OnedropSignUp() {
  const router = useRouter();

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd save the user data here.
    // For now, we head straight to the dashboard.
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-6 font-sans">
      {/* Top Left Back Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-blue-600 font-medium hover:opacity-70 transition"
      >
        <ArrowLeft size={18} /> Home
      </Link>

      {/* Main iCloud-style Card */}
      <div className="w-full max-w-[420px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white p-10 flex flex-col items-center">
        
        {/* Logo Icon */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6">
          <Droplet className="text-white fill-current w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Onedrop ID</h1>
        <p className="text-gray-500 text-sm mt-2 text-center">
          Create one account for all your files and secure data.
        </p>

        {/* Form Container */}
        <form onSubmit={handleContinue} className="w-full mt-8 space-y-3">
          <div className="space-y-1">
            <input 
              required
              type="text" 
              placeholder="First Name" 
              className="w-full px-5 py-4 bg-gray-100/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
            />
          </div>
          
          <div className="space-y-1">
            <input 
              required
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-5 py-4 bg-gray-100/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
            />
          </div>

          <div className="space-y-1">
            <input 
              required
              type="password" 
              placeholder="Password" 
              className="w-full px-5 py-4 bg-gray-100/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
            />
          </div>

          {/* Security Disclaimer Box */}
          <div className="flex items-start gap-3 mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <ShieldCheck className="text-blue-600 w-5 h-5 shrink-0" />
            <p className="text-[11px] text-blue-800 leading-tight">
              Your Onedrop ID is protected by end-to-end encryption. We never share your data with third parties.
            </p>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl mt-8 transition-all flex items-center justify-center gap-2 group shadow-md shadow-blue-100 active:scale-[0.98]"
          >
            Continue
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By clicking Continue, you agree to the Onedrop Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
