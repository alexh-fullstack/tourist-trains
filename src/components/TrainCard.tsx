import React from 'react';
import type { Train } from '../types/train';
import {
  formatPrice,
  formatDate,
  formatDuration,
  formatRouteShort,
  getNearestDeparture,
} from '../utils/formatters';
import { Calendar, Clock, MapPin, ArrowRight, Tag, ChevronRight } from 'lucide-react';

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
  onTagClick?: (tag: string) => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train, onSelect, onTagClick }) => {
  const nearestDate = getNearestDeparture(train.departures);
  const routeShort = formatRouteShort(train.route);
  const imageSrc = train.image || `images/${train.id}.jpg`;

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
      className="group relative bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-zinc-800 shadow-xs hover:shadow-lg hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E21A1A]"
      aria-label={`Поезд ${train.name}, регион ${train.region}`}
    >
      {/* Top Image with Badge Overlay */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <img
          src={imageSrc}
          alt={train.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#E21A1A] text-white shadow-sm">
            <MapPin className="w-3 h-3" />
            {train.region}
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 backdrop-blur-sm text-white border border-white/20">
            <Clock className="w-3 h-3 text-amber-300" />
            {formatDuration(train.duration_days)}
          </span>
        </div>

        {/* Name over bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm group-hover:text-red-200 transition-colors">
            {train.name}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Route (first -> last city) */}
          <div
            aria-label={`Маршрут: ${routeShort}`}
            className="bg-gray-50 dark:bg-[#202024] border border-gray-100 dark:border-zinc-800 rounded-lg p-3"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1 flex items-center justify-between">
              <span>Маршрут тура:</span>
              <span className="text-gray-400 dark:text-zinc-500 font-normal">{train.route.length} станций</span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
              <span>{train.route[0]}</span>
              <ArrowRight className="w-4 h-4 text-[#E21A1A] flex-shrink-0" />
              <span>{train.route[train.route.length - 1]}</span>
            </div>
          </div>

          {/* Nearest Departure Date */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-zinc-300 bg-red-50/70 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-[#E21A1A] flex-shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 text-xs">
              <span className="text-gray-500 dark:text-zinc-400">Ближайший выезд:</span>
              <strong className="font-bold text-gray-900 dark:text-white">
                {nearestDate ? formatDate(nearestDate, true) : 'По запросу'}
              </strong>
            </div>
          </div>

          {/* Description preview */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
            {train.description}
          </p>

          {/* Tags */}
          {train.tags && train.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {train.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(tag);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-100 dark:bg-[#202024] hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-[#E21A1A] dark:hover:text-red-300 text-gray-600 dark:text-zinc-300 px-2 py-0.5 rounded transition cursor-pointer"
                >
                  <Tag className="w-2.5 h-2.5 text-gray-400" />
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Price & Action */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">Стоимость</div>
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
              <span className="text-xs text-gray-500 dark:text-zinc-400 font-normal">от</span>
              <span className="text-[#E21A1A] font-extrabold">{formatPrice(train.price_from)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(train);
            }}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-[#E21A1A] hover:bg-[#C81010] text-white shadow-xs transition duration-150 cursor-pointer"
          >
            <span>Подробнее</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
