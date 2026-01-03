
export interface Activity {
  id: string;
  name: string;
  cost: number;
  category: 'Sightseeing' | 'Food' | 'Adventure' | 'Transport' | 'Stay' | 'Misc';
  description: string;
  duration: string;
  time?: string;
}

export interface Stop {
  id: string;
  city: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  coverPhoto?: string;
  stops: Stop[];
  status: 'planning' | 'upcoming' | 'completed';
}

export interface UserProfile {
  name: string;
  email: string;
  photo?: string;
  language: string;
  savedDestinations: string[];
}

export interface BudgetBreakdown {
  transport: number;
  stay: number;
  activities: number;
  meals: number;
  total: number;
}
