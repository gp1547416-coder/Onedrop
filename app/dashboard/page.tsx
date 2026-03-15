'use client';
import React, { useState, useEffect } from 'react';
import { Cloud, Image, FileText, Settings, ShieldCheck, Folder, Droplet, Plus, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string, time: string}[]>([]);

  // Auto-login check
  useEffect(() => {
    const user = localStorage.getItem('onedrop_user');
    if (!user) router.push('/login');
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('onedrop_user');
    router.push('/');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setUploadedFiles([newFile, ...uploadedFiles]);
    }
  };

  const apps = [
    { name: 'Drive', icon: <Cloud className="text-blue-500 w-10 h-10" /> },
    { name: 'Photos', icon: <Image className="text-pink-500 w-10 h-10" /> },
    { name: 'Notes', icon: <FileText className="text-yellow-500 w-10 h-10" /> },
    { name: 'Security', icon: <ShieldCheck className="text-green-500 w-10 h-10" /> },
    { name: 'Settings', icon: <Settings className="text-gray-500 w-10 h-10" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="p-4 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Droplet className="text-blue-600 fill-current w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">Onedrop</span>
        </div>
        <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-500 transition">
          <LogOut size={20} />
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Dashboard</h2>
          <label className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm cursor-pointer hover:bg-blue-700 transition flex items-center gap-2 shadow-md shadow-blue-100">
            <Plus size={18} /> Import File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white w-24 h-24 rounded-[2rem] shadow-sm flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-white">
                {app.icon}
              </div>
              <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{app.name}</span>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <h3 className="text-2xl font-semibold mb-6">Recent Drops</h3>
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-sm border border-white min-h-[200px]">
            {uploadedFiles.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 text-gray-400">
                <Folder size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-sm">No files imported yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center gap-5 p-4 bg-white/50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg leading-none mb-1">{file.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{file.size} • {file.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
