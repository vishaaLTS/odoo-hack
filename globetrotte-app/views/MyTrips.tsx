
import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../types';
import { MapPin, Calendar, Trash2, Edit3, ChevronRight } from 'lucide-react';

interface MyTripsProps {
  trips: Trip[];
  onDelete: (id: string) => void;
}

export const MyTrips: React.FC<MyTripsProps> = ({ trips, onDelete }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">My Journeys</h1>
          <p className="text-slate-500 mt-2">Manage all your past and future adventures.</p>
        </div>
        <Link to="/create" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hidden md:block">
          New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">No trips yet</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Once you start planning your travels, they will appear here in your collection.</p>
          <Link to="/create" className="text-orange-500 font-bold hover:underline">Start your first plan</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img 
                  src={trip.coverPhoto || `https://picsum.photos/seed/${trip.id}/600/300`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={trip.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold truncate pr-4">{trip.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(trip.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg px-3 py-2 text-center flex-1 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Stops</p>
                    <p className="text-lg font-bold text-slate-800">{trip.stops.length}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg px-3 py-2 text-center flex-1 border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Status</p>
                    <p className="text-sm font-bold text-slate-800 capitalize">{trip.status}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onDelete(trip.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Link to={`/trip/${trip.id}`} className="p-2 text-slate-400 hover:text-orange-500 transition-colors">
                      <Edit3 className="w-5 h-5" />
                    </Link>
                  </div>
                  <Link 
                    to={`/trip/${trip.id}`} 
                    className="flex items-center gap-1 text-orange-500 font-bold hover:gap-2 transition-all"
                  >
                    Details <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
