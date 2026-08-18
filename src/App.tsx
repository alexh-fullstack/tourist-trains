import React, { useState, useMemo, useEffect, useCallback } from 'react';
import trainsData from './data/trains.json';
import type { Train, FilterState } from './types/train';
import { getAvailableMonths, getAvailableRegions, getNearestDeparture } from './utils/formatters';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Filters } from './components/Filters';
import { TrainCard } from './components/TrainCard';
import { TrainModal } from './components/TrainModal';
import { EmptyState } from './components/EmptyState';
import { Footer } from './components/Footer';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedRegion: '',
  selectedMonth: '',
  sortBy: 'default',
};

const CatalogContent: React.FC = () => {
  const trains: Train[] = useMemo(() => trainsData.trains, []);
  const availableRegions = useMemo(() => getAvailableRegions(trains), [trains]);
  const availableMonths = useMemo(() => getAvailableMonths(trains), [trains]);

  // Read initial filter state from URL if available
  const [filters, setFilters] = useState<FilterState>(() => {
    if (typeof window === 'undefined') return INITIAL_FILTERS;
    const params = new URLSearchParams(window.location.search);
    return {
      searchQuery: params.get('q') || '',
      selectedRegion: params.get('region') || '',
      selectedMonth: params.get('month') || '',
      sortBy: (params.get('sort') as FilterState['sortBy']) || 'default',
    };
  });

  // Selected train for modal
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const trainId = params.get('train');
    if (trainId) {
      return trains.find((t) => t.id === trainId) || null;
    }
    return null;
  });

  // Sync state to URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (filters.searchQuery.trim()) params.set('q', filters.searchQuery.trim());
    if (filters.selectedRegion) params.set('region', filters.selectedRegion);
    if (filters.selectedMonth) params.set('month', filters.selectedMonth);
    if (filters.sortBy !== 'default') params.set('sort', filters.sortBy);
    if (selectedTrain) params.set('train', selectedTrain.id);

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState(null, '', newUrl);
  }, [filters, selectedTrain]);

  const handleFilterChange = useCallback((newPartial: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newPartial }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: tag,
    }));
  }, []);

  // Filter and sort trains
  const filteredTrains = useMemo(() => {
    let result = trains.filter((train) => {
      // 1. Search Query (matches name, description, tags, or cities in route)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.trim().toLowerCase();
        const matchesName = train.name.toLowerCase().includes(q);
        const matchesDesc = train.description.toLowerCase().includes(q);
        const matchesTags = train.tags.some((t) => t.toLowerCase().includes(q));
        const matchesRoute = train.route.some((c) => c.toLowerCase().includes(q));
        const matchesRegion = train.region.toLowerCase().includes(q);

        if (!matchesName && !matchesDesc && !matchesTags && !matchesRoute && !matchesRegion) {
          return false;
        }
      }

      // 2. Region filter
      if (filters.selectedRegion && train.region !== filters.selectedRegion) {
        return false;
      }

      // 3. Month filter (checks if train has departures in that YYYY-MM)
      if (filters.selectedMonth) {
        const hasDepartureInMonth = train.departures.some((dep) =>
          dep.startsWith(filters.selectedMonth)
        );
        if (!hasDepartureInMonth) {
          return false;
        }
      }

      return true;
    });

    // Sort logic
    if (filters.sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price_from - b.price_from);
    } else if (filters.sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price_from - a.price_from);
    } else if (filters.sortBy === 'duration_asc') {
      result = [...result].sort((a, b) => a.duration_days - b.duration_days);
    } else if (filters.sortBy === 'duration_desc') {
      result = [...result].sort((a, b) => b.duration_days - a.duration_days);
    } else if (filters.sortBy === 'departure_nearest') {
      result = [...result].sort((a, b) => {
        const dateA = getNearestDeparture(a.departures) || '9999-99-99';
        const dateB = getNearestDeparture(b.departures) || '9999-99-99';
        return dateA.localeCompare(dateB);
      });
    }

    return result;
  }, [trains, filters]);

  return (
    <div className="min-h-screen bg-[#F4F5F8] dark:bg-gray-950 flex flex-col font-sans text-gray-900 dark:text-gray-100 antialiased transition-colors duration-200">
      {/* Header */}
      <Header totalCount={trains.length} filteredCount={filteredTrains.length} />

      {/* Main Catalog View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          availableRegions={availableRegions}
          availableMonths={availableMonths}
          totalResults={filteredTrains.length}
        />

        {/* Train Cards Grid or Empty State */}
        {filteredTrains.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="region"
            aria-label="Список поездов"
          >
            {filteredTrains.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                onSelect={(t) => setSelectedTrain(t)}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        ) : (
          <EmptyState onReset={handleResetFilters} />
        )}
      </main>

      {/* Detail Modal */}
      <TrainModal
        train={selectedTrain}
        isOpen={Boolean(selectedTrain)}
        onClose={() => setSelectedTrain(null)}
        onTagClick={handleTagClick}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CatalogContent />
    </ThemeProvider>
  );
};

export default App;
