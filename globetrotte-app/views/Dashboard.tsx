
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Compass, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import { Trip } from '../types';
import { MOCK_CITIES } from '../constants';

export const Dashboard: React.FC<{ trips: Trip[] }> = ({ trips }) => {
  const upcomingTrip = trips.find(t => t.status === 'upcoming' || t.status === 'planning');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Hero */}
      <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl bg-slate-900 flex items-center px-8 md:px-12">
        <img 
          src="https://picsum.photos/seed/travel/1200/400" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Where to next, Explorer?</h1>
          <p className="text-slate-200 text-lg mb-8">Your next journey starts with a single step. Plan, track, and enjoy your global adventures with GlobeTrotter.</p>
          <Link 
            to="/create" 
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-orange-200/50"
          >
            <Plus className="w-5 h-5" />
            Plan New Trip
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent/Upcoming Trip Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="text-orange-500 w-6 h-6" />
              Your Next Adventure
            </h2>
            <Link to="/my-trips" className="text-orange-500 font-semibold text-sm hover:underline">View All</Link>
          </div>

          {upcomingTrip ? (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={upcomingTrip.coverPhoto || `https://picsum.photos/seed/${upcomingTrip.id}/800/400`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={upcomingTrip.name}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase">
                  {upcomingTrip.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{upcomingTrip.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{upcomingTrip.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">{upcomingTrip.startDate} — {upcomingTrip.endDate}</span>
                  <Link 
                    to={`/trip/${upcomingTrip.id}`} 
                    className="text-orange-500 font-bold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <Compass className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-2xl p-12 text-center">
              <Compass className="w-12 h-12 text-orange-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-orange-900">No active trips</h3>
              <p className="text-orange-700/70 mb-6">You haven't planned any trips yet. Let's dream up your next getaway!</p>
              <Link to="/create" className="text-orange-600 font-bold underline">Start Planning</Link>
            </div>
          )}
        </div>

        {/* Quick Insights & Suggestions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="text-orange-500 w-5 h-5" />
              Budget Insights
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Average Daily Spend</span>
                <span className="font-bold text-slate-900">$142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Total Planned Trips</span>
                <span className="font-bold text-slate-900">{trips.length}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                <div className="bg-orange-500 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">75% of yearly travel budget used</p>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-orange-400 w-5 h-5" />
              Trending Now
            </h3>
            <div className="space-y-4">
              {MOCK_CITIES.slice(0, 3).map((city, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-orange-400 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{city.name}</h4>
                    <p className="text-slate-400 text-xs">{city.country} • Popular</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
