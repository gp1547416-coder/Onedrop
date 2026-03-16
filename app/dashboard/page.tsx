'use client';
import React, { useState, useEffect } from 'react';
import { Cloud, Image as ImageIcon, FileText, Settings, ShieldCheck, Folder, Droplet, Plus, LogOut, X, ExternalLink, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('All'); // New state for filtering

  useEffect(() => {
    const user = localStorage.getItem('onedrop_user');
    if (!user) router.push('/login');

    const savedFiles = localStorage.getItem('onedrop_storage_files');
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, [router]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newFile = {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          url: reader.result,
          type: file.type
        };
        const updated = [newFile, ...uploadedFiles];
        setUploadedFiles(updated);
        localStorage.setItem('onedrop_storage_files', JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
    localStorage.setItem('onedrop_storage_files', JSON.stringify(updated));
  };

  // Logic to filter files based on the top buttons
  const filteredFiles = uploadedFiles.filter(file => {
    if (activeFilter === 'Photos') return file.type?.includes('image');
    if (activeFilter === 'Notes') return file.type?.includes('text') || file.type?.includes('pdf');
    return true; // 'All' or 'Drive' shows everything
  });

  const apps = [
    { name: 'Drive', filter: 'All', icon: <Cloud className="text-blue-500 w-10 h-10" /> },
    { name: 'Photos', filter: 'Photos', icon: <ImageIcon className="text-pink-500 w-10 h-10" /> },
    { name: 'Notes', filter: 'Notes', icon: <FileText className="text-yellow-500 w-10 h-10" /> },
    { name: 'Security', filter: 'Security', icon: <ShieldCheck className="text-green-500 w-10 h-10" /> },
    { name: 'Settings', filter: 'Settings', icon: <Settings className="text-gray-500 w-10 h-10" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="p-4 flex justify-between items-center bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveFilter('All')}>
          <Droplet className="text-blue-600 fill-current w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-gray-900">Onedrop</span>
        </div>
        <button onClick={() => { localStorage.removeItem('onedrop_user'); router.push('/'); }} className="p-2 text-gray-400 hover:text-red-500 transition">
          <LogOut size={20} />
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">{activeFilter === 'All' ? 'Dashboard' : activeFilter}</h2>
            {activeFilter !== 'All' && (
              <button onClick={() => setActiveFilter('All')} className="text-blue-600 text-sm font-medium mt-2 hover:underline">
                ← Back to All Files
              </button>
            )}
          </div>
          <label className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm cursor-pointer hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95">
            <Plus size={18} /> Import File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
        
        {/* App Grid - Now Functional */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mb-20">
          {apps.map((app) => (
            <div 
              key={app.name} 
              onClick={() => setActiveFilter(app.filter)}
              className={`flex flex-col items-center group cursor-pointer transition-transform active:scale-90`}
            >
              <div className={`w-24 h-24 rounded-[2rem] shadow-sm flex items-center justify-center transition-all duration-300 border-2 ${activeFilter === app.filter ? 'border-blue-500 bg-blue-50' : 'border-white bg-white group-hover:shadow-xl'}`}>
                {app.icon}
              </div>
              <span className={`mt-4 text-[10px] font-bold uppercase tracking-widest ${activeFilter === app.filter ? 'text-blue-600' : 'text-gray-400'}`}>
                {app.name}
              </span>
            </div>
          ))}
        </div>

        {/* Dynamic Files Section */}
        <section>
          <h3 className="text-2xl font-semibold mb-6">
            {activeFilter === 'All' ? 'Recent Drops' : `${activeFilter} Storage`}
          </h3>
          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-4 sm:p-8 shadow-sm border border-white min-h-[300px]">
            {filteredFiles.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                <Folder size={48} className="mb-4 opacity-10" />
                <p className="text-sm font-medium italic">
                  {activeFilter === 'All' ? 'Start importing files into OneDrop Storage.' : `No ${activeFilter} found.`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredFiles.map((file, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedFile(file)}
                    className="flex items-center gap-5 p-4 bg-white/50 hover:bg-white rounded-2xl border border-gray-100 transition cursor-pointer group"
                  >
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                      {file.type?.includes('image') ? <ImageIcon size={24} /> : <FileText size={24} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg leading-tight">{file.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{file.size} • {file.time}</p>
                    </div>
                    <button onClick={(e) => deleteFile(e, i)} className="p-2 text-gray-300 hover:text-red-500 transition">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Preview Modal remains the same... */}
      {selectedFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedFile(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
              <p className="font-bold text-gray-900 px-4 truncate">{selectedFile.name}</p>
              <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-6">
              {selectedFile.type?.includes('image') ? (
                <img src={selectedFile.url} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg" />
              ) : (
                <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-gray-200">
                  <FileText size={64} className="mx-auto text-blue-600 mb-4" />
                  <p className="text-lg font-bold">Preview not available</p>
                  <a href={selectedFile.url} download={selectedFile.name} className="mt-4 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Download</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
