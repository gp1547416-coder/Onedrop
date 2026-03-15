'use client';
import React, { useState } from 'react';
import { HardDrive, Search, Plus, Folder, File, MoreHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OnedropDrive() {
  const [isDragging, setIsDragging] = useState(false);

  // Mock data for files
  const files = [
    { name: 'Vacation_Photos', type: 'folder', size: '--', date: 'Mar 12, 2026' },
    { name: 'Project_Onedrop_Specs.pdf', type: 'file', size: '2.4 MB', date: 'Today' },
    { name: 'System_Backup.zip', type: 'file', size: '850 MB', date: 'Yesterday' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Sidebar + Main Content Layout */}
      <div className="flex h-screen">
        
        {/* iPad-style Sidebar */}
        <aside className="w-72 bg-[#f5f5f7] border-r border-gray-200 p-6 hidden md:flex flex-col">
          <Link href="/dashboard" className="flex items-center gap-2 mb-10 text-blue-600 font-semibold">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium cursor-pointer">
              <HardDrive size={20} /> Onedrop Drive
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-200 rounded-lg cursor-pointer transition">
              <Folder size={20} /> Recents
            </div>
          </div>

          <div className="mt-auto p-4 bg-gray-200/50 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Storage</p>
            <div className="h-1.5 w-full bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[65%]" />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">32.5 GB of 50 GB used</p>
          </div>
        </aside>

        {/* Main Drive Area */}
        <main 
          className={`flex-1 flex flex-col transition-colors ${isDragging ? 'bg-blue-50' : 'bg-white'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); alert('File dropped! Ready for Vercel Blob integration.'); }}
        >
          {/* Top Bar */}
          <header className="h-16 border-b border-gray-100 flex items-center justify-between px-8">
            <h2 className="text-xl font-bold">Onedrop Drive</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input placeholder="Search" className="bg-gray-100 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none w-64" />
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                <Plus size={24} />
              </button>
            </div>
          </header>

          {/* Grid View */}
          <div className="p-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 overflow-y-auto">
            {files.map((file) => (
              <div key={file.name} className="group flex flex-col items-center text-center cursor-pointer">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {file.type === 'folder' ? (
                    <Folder className="w-24 h-24 text-blue-400 fill-blue-50 group-hover:scale-105 transition-transform shadow-sm" />
                  ) : (
                    <File className="w-20 h-20 text-gray-300 fill-gray-50 group-hover:scale-105 transition-transform" />
                  )}
                </div>
                <span className="mt-2 text-sm font-medium px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition">
                  {file.name}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                  {file.size} • {file.date}
                </span>
              </div>
            ))}
          </div>

          {/* Floating Drop Hint for iPad */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10 border-4 border-dashed border-blue-500 m-4 rounded-[3rem] pointer-events-none">
              <p className="text-2xl font-bold text-blue-600">Drop files to save to Onedrop</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
