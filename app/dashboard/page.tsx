import { Cloud, Image as ImageIcon, FileText, Settings, ShieldCheck, Folder } from 'lucide-react';

export default function Dashboard() {
  const apps = [
    { name: 'Onedrop Drive', icon: <Cloud className="text-blue-500 w-10 h-10" />, color: 'bg-white' },
    { name: 'Photos', icon: <ImageIcon className="text-pink-500 w-10 h-10" />, color: 'bg-white' },
    { name: 'Notes', icon: <FileText className="text-yellow-500 w-10 h-10" />, color: 'bg-white' },
    { name: 'Security', icon: <ShieldCheck className="text-green-500 w-10 h-10" />, color: 'bg-white' },
    { name: 'Settings', icon: <Settings className="text-gray-500 w-10 h-10" />, color: 'bg-white' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <nav className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <span className="font-bold text-lg">Onedrop</span>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full" />
      </nav>

      <main className="max-w-6xl mx-auto p-8 md:p-16">
        <h2 className="text-4xl font-bold mb-12">Good afternoon.</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {apps.map((app) => (
            <div key={app.name} className="flex flex-col items-center">
              <div className={`${app.color} w-24 h-24 rounded-[2rem] shadow-sm flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer border border-gray-100`}>
                {app.icon}
              </div>
              <span className="mt-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">{app.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Recent Dropped Files</h3>
          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer transition">
            <Folder className="text-blue-500" />
            <div>
              <p className="font-medium text-sm">Design_Assets_iOS26.zip</p>
              <p className="text-xs text-gray-400">1.2 GB • Just now</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
