
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { MyTrips } from './views/MyTrips';
import { CreateTrip } from './views/CreateTrip';
import { ItineraryBuilder } from './views/ItineraryBuilder';
import { Profile } from './views/Profile';
import { Trip } from './types';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gt_trips');
    if (saved) {
      setTrips(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gt_trips', JSON.stringify(trips));
    }
  }, [trips, isLoaded]);

  const addTrip = (newTrip: Trip) => setTrips([newTrip, ...trips]);
  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };
  const deleteTrip = (id: string) => setTrips(trips.filter(t => t.id !== id));

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard trips={trips} />} />
          <Route path="/my-trips" element={<MyTrips trips={trips} onDelete={deleteTrip} />} />
          <Route path="/create" element={<CreateTrip onSave={addTrip} />} />
          <Route path="/trip/:id" element={<ItineraryBuilder trips={trips} onUpdate={updateTrip} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
