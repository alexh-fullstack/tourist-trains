import React from 'react';
import type { Train } from '../types/train';
import {
  formatPrice,
  formatDate,
  formatDuration,
  formatRouteShort,
  getNearestDeparture,
} from '../utils/formatters';
import { Calendar, Clock, MapPin, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
  onTagClick?: (tag: string) => void;
}

// Region style badges
const regionColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  'Северо-Запад': {
    bg: 'bg-cyan-50',
    text: 'text-cyan-800',
    border: 'border-cyan-200',
    gradient: 'from-cyan-600 to-blue-700',
  },
  'Юг': {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-orange-600',
  },
  'Сибирь': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    gradient: 'from-emerald-600 to-teal-700',
  },
  'Центр': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
    gradient: 'from-indigo-600 to-violet-700',
  },
};

export const TrainCard: React.FC<TrainCardProps> = ({ train, onSelect, onTagClick }) => {
  const nearestDate = getNearestDeparture(train.departures);
  const routeShort = formatRouteShort(train.route);
  const styling = regionColors[train.region] || {
    bg: 'bg-slate-50',
    text: 'text-slate-800',
    border: 'border-slate-200',
    gradient: 'from-slate-700 to-slate-900',
  };

  return (
    <article
      onClick={() => onSelect(train)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(train);
        }
      }}
      className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label={`Поезд ${train.name}, регион ${train.region}`}
    >
      {/* Top Banner Accent */}
      <div className={`h-2.5 w-full bg-gradient-to-r ${styling.gradient}`} />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styling.bg} ${styling.text} ${styling.border}`}
          >
            <MapPin className="w-3 h-3" />
            {train.region}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            <Clock className="w-3 h-3 text-slate-500" />
            {formatDuration(train.duration_days)}
          </span>
        </div>

        {/* Train Name */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
          {train.name}
        </h3>

        {/* Route (first -> last city) */}
        <div
          aria-label={`Маршрут: ${routeShort}`}
          className="mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3"
        >
          <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
            <span>Маршрут:</span>
            <span className="text-slate-400">({train.route.length} станций)</span>
          </div>
          <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 flex-wrap">
            <span>{train.route[0]}</span>
            <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{train.route[train.route.length - 1]}</span>
          </div>
        </div>

        {/* Nearest Departure Date */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-700 bg-amber-50/60 border border-amber-200/50 px-3 py-2 rounded-xl">
          <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-xs sm:text-sm">
            <span className="text-slate-500">Ближайший выезд:</span>
            <span className="font-semibold text-slate-900">
              {nearestDate ? formatDate(nearestDate, true) : 'По запросу'}
            </span>
          </div>
        </div>

        {/* Description preview */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {train.description}
        </p>

        {/* Tags */}
        {train.tags && train.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 pt-2">
            {train.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer Price & Action CTA */}
      <div className="p-5 sm:p-6 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
        <div>
          <div className="text-xs text-slate-500 font-medium">Цена за тур</div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-baseline gap-1">
            <span className="text-xs text-slate-500 font-normal">от</span>
            <span className="text-indigo-700 font-black">{formatPrice(train.price_from)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(train);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 group-hover:shadow-indigo-600/40 transition-all duration-200 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Подробнее</span>
        </button>
      </div>
    </article>
  );
};
