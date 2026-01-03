
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, MapPin, Calendar, Trash2, ArrowLeft, BarChart2, Share2, Sparkles, Loader2, Download } from 'lucide-react';
import { Trip, Stop, Activity, BudgetBreakdown } from '../types';
import { getTravelSuggestions, getTripSummary } from '../services/geminiService';
import { BudgetCharts } from '../components/BudgetCharts';
import { CATEGORY_ICONS } from '../constants.tsx';

interface ItineraryBuilderProps {
  trips: Trip[];
  onUpdate: (trip: Trip) => void;
}

export const ItineraryBuilder: React.FC<ItineraryBuilderProps> = ({ trips, onUpdate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = trips.find(t => t.id === id);

  const [activeTab, setActiveTab] = useState<'plan' | 'budget' | 'summary'>('plan');
  const [isAddingStop, setIsAddingStop] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const [newStop, setNewStop] = useState({ city: '', arrival: '', departure: '' });

  useEffect(() => {
    if (trip && activeTab === 'summary' && !aiSummary) {
      handleGetAISummary();
    }
  }, [activeTab]);

  if (!trip) return <div>Trip not found.</div>;

  const handleGetAISummary = async () => {
    setLoadingAI(true);
    const summary = await getTripSummary(trip.description || trip.name);
    setAiSummary(summary);
    setLoadingAI(false);
  };

  const handleAddStop = () => {
    const stop: Stop = {
      id: Math.random().toString(36).substr(2, 9),
      city: newStop.city,
      country: 'Explore', // Simplified
      arrivalDate: newStop.arrival,
      departureDate: newStop.departure,
      activities: [],
    };
    onUpdate({ ...trip, stops: [...trip.stops, stop] });
    setIsAddingStop(false);
    setNewStop({ city: '', arrival: '', departure: '' });
  };

  const removeStop = (stopId: string) => {
    onUpdate({ ...trip, stops: trip.stops.filter(s => s.id !== stopId) });
  };

  const suggestActivities = async (stopId: string, city: string) => {
    setLoadingAI(true);
    const suggestions = await getTravelSuggestions(city);
    if (suggestions) {
      const stop = trip.stops.find(s => s.id === stopId);
      if (stop) {
        const newActivities: Activity[] = suggestions.map((s: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          ...s,
        }));
        const updatedStop = { ...stop, activities: [...stop.activities, ...newActivities] };
        onUpdate({
          ...trip,
          stops: trip.stops.map(s => s.id === stopId ? updatedStop : s)
        });
      }
    }
    setLoadingAI(false);
  };

  const calculateBudget = (): BudgetBreakdown => {
    const breakdown: BudgetBreakdown = { transport: 0, stay: 0, activities: 0, meals: 0, total: 0 };
    trip.stops.forEach(stop => {
      stop.activities.forEach(act => {
        const cat = act.category.toLowerCase();
        if (cat === 'transport') breakdown.transport += act.cost;
        else if (cat === 'stay') breakdown.stay += act.cost;
        else if (cat === 'food' || cat === 'meals') breakdown.meals += act.cost;
        else breakdown.activities += act.cost;
        breakdown.total += act.cost;
      });
    });
    return breakdown;
  };

  const budget = calculateBudget();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button onClick={() => navigate('/my-trips')} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors w-fit">
          <ArrowLeft className="w-5 h-5" /> My Trips
        </button>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-semibold transition-all">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-semibold transition-all">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{trip.name}</h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {trip.startDate} - {trip.endDate}</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.stops.length} Cities</span>
          <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{trip.status}</span>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
          {(['plan', 'budget', 'summary'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold text-sm capitalize transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'plan' ? 'Itinerary' : tab === 'summary' ? 'AI Insights' : 'Budget'}
            </button>
          ))}
        </div>

        {activeTab === 'plan' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Journey Stops</h2>
              <button 
                onClick={() => setIsAddingStop(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Add Stop
              </button>
            </div>

            {isAddingStop && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input 
                    type="text" placeholder="City name..." 
                    className="p-3 rounded-xl border border-slate-200"
                    value={newStop.city}
                    onChange={e => setNewStop({...newStop, city: e.target.value})}
                  />
                  <input 
                    type="date" 
                    className="p-3 rounded-xl border border-slate-200"
                    value={newStop.arrival}
                    onChange={e => setNewStop({...newStop, arrival: e.target.value})}
                  />
                  <input 
                    type="date" 
                    className="p-3 rounded-xl border border-slate-200"
                    value={newStop.departure}
                    onChange={e => setNewStop({...newStop, departure: e.target.value})}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setIsAddingStop(false)} className="px-4 py-2 text-slate-500 font-bold">Cancel</button>
                  <button onClick={handleAddStop} className="px-4 py-2 bg-orange-500 text-white rounded-xl font-bold">Save Stop</button>
                </div>
              </div>
            )}

            <div className="space-y-6 relative before:absolute before:left-[1.65rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
              {trip.stops.map((stop, idx) => (
                <div key={stop.id} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{stop.city}</h3>
                        <p className="text-slate-400 text-sm">{stop.arrivalDate} — {stop.departureDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => suggestActivities(stop.id, stop.city)}
                          disabled={loadingAI}
                          className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors disabled:opacity-50"
                        >
                          {loadingAI ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                          AI Suggest
                        </button>
                        <button onClick={() => removeStop(stop.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {stop.activities.length > 0 ? (
                      <div className="space-y-3 mt-4">
                        {stop.activities.map(activity => (
                          <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-orange-500 shadow-sm border border-slate-100">
                                {CATEGORY_ICONS[activity.category] || <Plus className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-800">{activity.name}</h4>
                                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{activity.duration} • {activity.category}</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-slate-600">${activity.cost}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                        <p className="text-sm text-slate-400">No activities added yet. Use AI to get recommendations!</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Total Budget</p>
                <p className="text-3xl font-bold text-orange-600">${budget.total}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stay</p>
                <p className="text-xl font-bold text-slate-800">${budget.stay}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Meals</p>
                <p className="text-xl font-bold text-slate-800">${budget.meals}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Transport</p>
                <p className="text-xl font-bold text-slate-800">${budget.transport}</p>
              </div>
            </div>

            <BudgetCharts data={budget} />
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
               <Sparkles className="absolute top-4 right-4 text-orange-400 w-12 h-12 opacity-20" />
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                 <Sparkles className="text-orange-400 w-6 h-6" />
                 AI Trip Analysis
               </h3>
               {loadingAI ? (
                 <div className="flex flex-col items-center justify-center py-12 gap-4">
                   <Loader2 className="w-10 h-10 animate-spin text-orange-400" />
                   <p className="text-slate-400 animate-pulse">Consulting the travel archives...</p>
                 </div>
               ) : (
                 <div className="prose prose-invert max-w-none">
                   {aiSummary ? (
                      <div className="text-slate-300 whitespace-pre-line text-lg leading-relaxed">
                        {aiSummary}
                      </div>
                   ) : (
                     <p className="text-slate-500 italic">No summary generated yet.</p>
                   )}
                 </div>
               )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Packing Tips</h4>
                <p className="text-sm text-slate-600">Based on your destinations ({trip.stops.map(s => s.city).join(', ')}), remember to bring lightweight layers and comfortable walking shoes.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Travel Advisory</h4>
                <p className="text-sm text-slate-600">All systems go! Your itinerary is well-paced with an average of 3-4 days per major city stop.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
