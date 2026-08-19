import React from 'react';
import type { Train } from '../types/train';
import { getNearestDeparture, getRouteDisplayInfo } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, MapPin, ArrowRight, Tag, ChevronRight, RotateCw } from 'lucide-react';

interface TrainCardProps {
  train: Train;
  onSelect: (train: Train) => void;
  onTagClick?: (tag: string) => void;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train, onSelect, onTagClick }) => {
  const { t, formatPriceLocal, formatDateLocal, formatDurationLocal } = useLanguage();
  const nearestDate = getNearestDeparture(train.departures);
  const routeInfo = getRouteDisplayInfo(train.route);
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
      aria-label={`${train.name}, ${train.region}`}
    >
      {/* Top Image with Badges (Region + Duration) */}
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
            {formatDurationLocal(train.duration_days)}
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
        <div className="space-y-2.5">
          {/* Block 1: Route (Soft muted border) */}
          <div
            aria-label={`${t.routeLabel} ${train.route.join(' → ')}`}
            className="bg-gray-50/80 dark:bg-[#202024]/80 border border-gray-200/60 dark:border-zinc-800/60 rounded-lg p-3"
          >
            <div className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                {routeInfo.isCircular && <RotateCw className="w-3.5 h-3.5 text-[#E21A1A] flex-shrink-0" />}
                <span>{t.routeLabel}</span>
              </span>
              <span className="text-gray-400 dark:text-zinc-500 font-normal text-[11px]">
                {train.route.length} {t.stationsCount}
              </span>
            </div>

            {/* Cities with arrow between them */}
            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
              <span className="truncate">{routeInfo.startCity}</span>
              <ArrowRight className="w-4 h-4 text-[#E21A1A] flex-shrink-0" />
              <span className="truncate">{routeInfo.endCity}</span>
            </div>
          </div>

          {/* Block 2: Nearest Departure Date (Soft muted border matching Block 1) */}
          <div className="bg-gray-50/80 dark:bg-[#202024]/80 border border-gray-200/60 dark:border-zinc-800/60 rounded-lg p-3 flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-zinc-300">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-zinc-400 flex-shrink-0" />
            <div className="flex items-center gap-1.5 truncate text-xs">
              <span className="text-gray-500 dark:text-zinc-400">{t.nearestDepartureLabel}</span>
              <strong className="font-bold text-gray-900 dark:text-white truncate">
                {nearestDate ? formatDateLocal(nearestDate, true) : t.onRequest}
              </strong>
            </div>
          </div>

          {/* Description preview */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 line-clamp-2 leading-relaxed pt-0.5">
            {train.description}
          </p>

          {/* Tags */}
          {train.tags && train.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
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
            <div className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">{t.modalPriceLabel}</div>
            <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
              <span className="text-xs text-gray-500 dark:text-zinc-400 font-normal">{t.priceFrom}</span>
              <span className="text-[#E21A1A] font-extrabold">{formatPriceLocal(train.price_from)}</span>
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
            <span>{t.detailsBtn}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
