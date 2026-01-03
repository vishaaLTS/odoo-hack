
import React, { useState } from 'react';
import { User, Mail, Globe, Shield, Trash2, Camera, MapPin } from 'lucide-react';

export const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane.explorer@globetrotter.com',
    location: 'San Francisco, CA',
    language: 'English',
    memberSince: 'January 2024'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-slate-100 pb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 border-4 border-white shadow-lg overflow-hidden">
              <img src="https://picsum.photos/seed/jane/200" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-slate-500 mb-4">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full text-xs font-semibold text-slate-600 border border-slate-200">
                <MapPin className="w-3 h-3" /> {user.location}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full text-xs font-semibold text-slate-600 border border-slate-200">
                <Globe className="w-3 h-3" /> {user.language}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full text-xs font-semibold text-slate-600 border border-slate-200">
                <Shield className="w-3 h-3" /> Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <User className="text-orange-500 w-5 h-5" />
              Account Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={e => setUser({...user, name: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={user.email} 
                  onChange={e => setUser({...user, email: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-orange-500 w-5 h-5" />
              Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Display Language</label>
                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500">
                  <option>English (US)</option>
                  <option>French</option>
                  <option>Japanese</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Currency</label>
                <select className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-orange-500">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>JPY (¥)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">Member since {user.memberSince}</p>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors">
              Sign Out
            </button>
            <button className="px-6 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
