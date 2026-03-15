import { ArrowRight, Droplet } from 'lucide-react';

export default function OnedropLogin() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853')] bg-cover bg-center flex items-center justify-center p-6">
      {/* Frosted Glass Card */}
      <div className="w-full max-auto max-w-[400px] backdrop-blur-2xl bg-white/80 rounded-[2rem] p-10 shadow-2xl border border-white/20">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
            <Droplet className="text-white w-10 h-10 fill-current" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Onedrop</h1>
          <p className="text-gray-500 mt-2 text-center">Sign in with your Onedrop ID to manage your data.</p>
        </div>

        <form className="mt-10 space-y-4">
          <input 
            type="email" 
            placeholder="Onedrop ID" 
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
          />
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
            Continue <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button className="text-blue-600 text-sm font-medium hover:underline">Forgot password?</button>
          <div className="h-[1px] w-full bg-gray-200" />
          <p className="text-sm text-gray-500">
            Don't have an ID? <span className="text-blue-600 font-medium cursor-pointer">Create yours now.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
