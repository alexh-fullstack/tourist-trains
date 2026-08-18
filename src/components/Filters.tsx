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
    <section aria-label="Фильтры и поиск туров" className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 mb-8">
      <div className="flex flex-col gap-5">
        {/* Top bar: Search input + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Search bar */}
          <div className="relative md:col-span-8">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              role="searchbox"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Поиск поезда по названию, городу или тегу..."
              aria-label="Поиск по названию поезда"
              className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                aria-label="Очистить поиск"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              aria-label="Сортировка"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
              className="w-full pl-10 pr-8 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition duration-150 cursor-pointer appearance-none"
            >
              <option value="default">Сортировка по умолчанию</option>
              <option value="price_asc">Сначала дешевле</option>
              <option value="price_desc">Сначала дороже</option>
              <option value="departure_nearest">По ближайшей дате</option>
              <option value="duration_asc">По длительности (короткие)</option>
              <option value="duration_desc">По длительности (длинные)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Region Filter */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            <span>Регион:</span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по региону">
            <button
              type="button"
              onClick={() => onFilterChange({ selectedRegion: '' })}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                filters.selectedRegion === ''
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-600 ring-offset-1'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              Все регионы
            </button>
            {availableRegions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => onFilterChange({ selectedRegion: region })}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                  filters.selectedRegion === region
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-600 ring-offset-1'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Departure Month Filter */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Месяц отправления:</span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по месяцу отправления">
            <button
              type="button"
              onClick={() => onFilterChange({ selectedMonth: '' })}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                filters.selectedMonth === ''
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/30 ring-2 ring-violet-600 ring-offset-1'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              Все месяцы
            </button>
            {availableMonths.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => onFilterChange({ selectedMonth: key })}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                  filters.selectedMonth === key
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/30 ring-2 ring-violet-600 ring-offset-1'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stats and Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span>
              Показано маршрутов: <strong className="text-slate-900 font-semibold">{totalResults}</strong>
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3 py-1.5 rounded-lg transition duration-150 cursor-pointer"
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
