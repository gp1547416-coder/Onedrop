import React from 'react';
import { Cloud, Image, FileText, Settings, ShieldCheck, Folder, Droplet } from 'lucide-react';

export default function Dashboard() {
  const apps = [
    { name: 'Onedrop Drive', icon: <Cloud className="text-blue-500 w-10 h-10" /> },
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
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full shadow-inner" />
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold tracking-tight mb-12">Good afternoon.</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white w-24 h-24 rounded-[2rem] shadow-sm flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-white">
                {app.icon}
              </div>
              <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{app.name}</span>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <h3 className="text-2xl font-semibold mb-6">Recent Drops</h3>
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 shadow-sm border border-white">
            <div className="flex items-center gap-5 p-4 hover:bg-gray-50/50 rounded-2xl transition group">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                <Folder size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-lg">Work_Assets_March.zip</p>
                <p className="text-sm text-gray-400 font-medium">1.4 GB • Just now</p>
              </div>
              <button className="text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition">View</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
