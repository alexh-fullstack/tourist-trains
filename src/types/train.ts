export interface Train {
  id: string;
  name: string;
  region: string;
  route: string[];
  duration_days: number;
  departures: string[];
  price_from: number;
  tags: string[];
  description: string;
  excursions: string[];
  buy_url: string;
}

export interface TrainsData {
  trains: Train[];
}

export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'duration_asc' | 'duration_desc' | 'departure_nearest';

export interface FilterState {
  searchQuery: string;
  selectedRegion: string;
  selectedMonth: string;
  sortBy: SortOption;
}
