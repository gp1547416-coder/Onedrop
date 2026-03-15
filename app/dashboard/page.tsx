'use client';
import React, { useState, useEffect } from 'react';
import { Cloud, Image as ImageIcon, FileText, Settings, ShieldCheck, Folder, Droplet, Plus, LogOut, X, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string, time: string, url: string, type: string}[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('onedrop_user');
    if (!user) router.push('/login');
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file); // This creates the viewable link
      const newFile = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        url: blobUrl,
        type: file.type
      };
      setUploadedFiles([newFile, ...uploadedFiles]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Navigation */}
      <nav className="p-4 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Droplet className="text-blue-600 fill-current w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">Onedrop</span>
        </div>
        <button onClick={() => { localStorage.removeItem('onedrop_user'); router.push('/'); }} className="p-2 text-gray-400 hover:text-red-500 transition">
          <LogOut size={20} />
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <label className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm cursor-pointer hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200">
            <Plus size={18} /> Import File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        
        {/* App Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-20">
          {[
            { name: 'Drive', icon: <Cloud className="text-blue-500 w-10 h-10" /> },
            { name: 'Photos', icon: <ImageIcon className="text-pink-500 w-10 h-10" /> },
            { name: 'Notes', icon: <FileText className="text-yellow-500 w-10 h-10" /> },
            { name: 'Security', icon: <ShieldCheck className="text-green-500 w-10 h-10" /> },
            { name: 'Settings', icon: <Settings className="text-gray-500 w-10 h-10" /> },
          ].map((app) => (
            <div key={app.name} className="flex flex-col items-center group cursor-pointer">
              <div className="bg-white w-24 h-24 rounded-[2rem] shadow-sm flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border border-white">
                {app.icon}
              </div>
              <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{app.name}</span>
            </div>
          ))}
        </div>

        {/* Files List */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">Recent Drops</h3>
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-4 sm:p-8 shadow-sm border border-white min-h-[300px]">
            {uploadedFiles.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                <Folder size={48} className="mb-4 opacity-10" />
                <p className="text-sm font-medium">Drop files from your iPad to begin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {uploadedFiles.map((file, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedFile(file)}
                    className="flex items-center gap-5 p-4 bg-white/50 hover:bg-white rounded-2xl border border-gray-100 transition cursor-pointer group"
                  >
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                      {file.type.includes('image') ? <ImageIcon size={24} /> : <FileText size={24} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg leading-tight">{file.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{file.size} • {file.time}</p>
                    </div>
                    <ExternalLink size={18} className="text-gray-300 group-hover:text-blue-600 transition" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* iPad-style Quick Look Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedFile(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-full">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
              <p className="font-bold text-gray-900 px-4 truncate">{selectedFile.name}</p>
              <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-gray-200 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-6">
              {selectedFile.type.includes('image') ? (
                <img src={selectedFile.url} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg" />
              ) : (
                <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-200">
                  <FileText size={64} className="mx-auto text-blue-600 mb-4" />
                  <p className="text-lg font-bold mb-4">Preview not available for this type</p>
                  <a href={selectedFile.url} download={selectedFile.name} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
