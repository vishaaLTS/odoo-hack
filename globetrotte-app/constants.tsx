
import React from 'react';
import { Plane, Utensils, Hotel, MapPin, Activity as ActivityIcon, MoreHorizontal } from 'lucide-react';

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Transport: <Plane className="w-4 h-4" />,
  Food: <Utensils className="w-4 h-4" />,
  Stay: <Hotel className="w-4 h-4" />,
  Sightseeing: <MapPin className="w-4 h-4" />,
  Adventure: <ActivityIcon className="w-4 h-4" />,
  Misc: <MoreHorizontal className="w-4 h-4" />,
};

export const MOCK_CITIES = [
  { name: 'Paris', country: 'France', costIndex: 'High', popularity: 5 },
  { name: 'Tokyo', country: 'Japan', costIndex: 'Medium', popularity: 5 },
  { name: 'Bali', country: 'Indonesia', costIndex: 'Low', popularity: 4 },
  { name: 'Rome', country: 'Italy', costIndex: 'Medium', popularity: 5 },
  { name: 'New York', country: 'USA', costIndex: 'High', popularity: 5 },
];

export const APP_THEME = {
  primary: '#f97316', // orange-500
  secondary: '#0f172a', // slate-900
};
