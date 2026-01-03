
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, PlusCircle, User, BarChart2, Globe } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/my-trips', icon: <Map className="w-5 h-5" />, label: 'My Trips' },
    { path: '/create', icon: <PlusCircle className="w-5 h-5" />, label: 'Plan' },
    { path: '/profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg">
              <Globe className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">GlobeTrotter</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  location.pathname === item.path ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden flex justify-around py-3 px-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-orange-500' : 'text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
