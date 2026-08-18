import React from 'react';
import { Search, X, Filter, RotateCcw, Calendar, MapPin, ArrowUpDown } from 'lucide-react';
import type { FilterState, SortOption } from '../types/train';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  availableRegions: string[];
  availableMonths: { key: string; label: string }[];
  totalResults: number;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableRegions,
  availableMonths,
  totalResults,
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery.trim()) ||
    Boolean(filters.selectedRegion) ||
    Boolean(filters.selectedMonth) ||
    filters.sortBy !== 'default';

  return (
    <section
      aria-label="Фильтры и поиск туров"
      className="bg-white dark:bg-[#18181B] rounded-xl shadow-xs border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 mb-8 transition-colors duration-200"
    >
      <div className="flex flex-col gap-5">
        {/* Top bar: Search input + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Search bar */}
          <div className="relative md:col-span-8">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              role="searchbox"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Поиск поезда по названию, городу или тегу..."
              aria-label="Поиск по названию поезда"
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#202024] hover:bg-gray-100/70 dark:hover:bg-[#27272C] focus:bg-white dark:focus:bg-[#202024] border border-gray-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E21A1A]/20 focus:border-[#E21A1A] transition duration-150"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                aria-label="Очистить поиск"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              aria-label="Сортировка"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="w-full pl-10 pr-8 py-2.5 sm:py-3 bg-gray-50 dark:bg-[#202024] hover:bg-gray-100/70 dark:hover:bg-[#27272C] focus:bg-white dark:focus:bg-[#202024] border border-gray-300 dark:border-zinc-700 rounded-lg text-sm sm:text-base text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#E21A1A]/20 focus:border-[#E21A1A] transition duration-150 cursor-pointer appearance-none"
            >
              <option value="default" className="dark:bg-[#202024]">Сортировка по умолчанию</option>
              <option value="price_asc" className="dark:bg-[#202024]">Сначала дешевле</option>
              <option value="price_desc" className="dark:bg-[#202024]">Сначала дороже</option>
              <option value="departure_nearest" className="dark:bg-[#202024]">По ближайшей дате</option>
              <option value="duration_asc" className="dark:bg-[#202024]">По длительности (короткие)</option>
              <option value="duration_desc" className="dark:bg-[#202024]">По длительности (длинные)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Region Filter */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-[#E21A1A]" />
            <span>Регион:</span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по региону">
            <button
              type="button"
              onClick={() => onFilterChange({ selectedRegion: '' })}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                filters.selectedRegion === ''
                  ? 'bg-[#E21A1A] text-white shadow-xs font-semibold'
                  : 'bg-gray-100 dark:bg-[#202024] text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-[#2A2A30]'
              }`}
            >
              Все регионы
            </button>
            {availableRegions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => onFilterChange({ selectedRegion: region })}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                  filters.selectedRegion === region
                    ? 'bg-[#E21A1A] text-white shadow-xs font-semibold'
                    : 'bg-gray-100 dark:bg-[#202024] text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-[#2A2A30]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Departure Month Filter */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-[#E21A1A]" />
            <span>Месяц отправления:</span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по месяцу отправления">
            <button
              type="button"
              onClick={() => onFilterChange({ selectedMonth: '' })}
              className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                filters.selectedMonth === ''
                  ? 'bg-[#2B303A] dark:bg-zinc-700 text-white shadow-xs font-semibold'
                  : 'bg-gray-100 dark:bg-[#202024] text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-[#2A2A30]'
              }`}
            >
              Все месяцы
            </button>
            {availableMonths.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => onFilterChange({ selectedMonth: key })}
                className={`px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                  filters.selectedMonth === key
                    ? 'bg-[#2B303A] dark:bg-zinc-700 text-white shadow-xs font-semibold'
                    : 'bg-gray-100 dark:bg-[#202024] text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-[#2A2A30]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stats and Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-zinc-800 text-xs sm:text-sm text-gray-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
            <span>
              Показано маршрутов: <strong className="text-gray-900 dark:text-white font-semibold">{totalResults}</strong>
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E21A1A] hover:text-[#C81010] bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 px-3 py-1.5 rounded-md transition duration-150 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сбросить все фильтры</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
