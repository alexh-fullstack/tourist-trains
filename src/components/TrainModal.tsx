import React, { useEffect, useRef } from 'react';
import type { Train } from '../types/train';
import {
  formatPrice,
  formatDate,
  formatDuration,
  formatRouteShort,
} from '../utils/formatters';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Tag,
  Route,
  Ticket,
  ChevronRight,
} from 'lucide-react';

interface TrainModalProps {
  train: Train | null;
  isOpen: boolean;
  onClose: () => void;
  onTagClick?: (tag: string) => void;
}

export const TrainModal: React.FC<TrainModalProps> = ({
  train,
  isOpen,
  onClose,
  onTagClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !train) return null;

  const imageSrc = train.image || `images/${train.id}.jpg`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="train-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-900 w-full max-w-3xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all text-gray-900 dark:text-gray-100"
      >
        {/* Header with destination image background */}
        <div className="relative h-48 sm:h-56 bg-gray-900 text-white p-6 flex flex-col justify-end overflow-hidden">
          <img
            src={imageSrc}
            alt={train.name}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges & Title */}
          <div className="relative z-10 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#E21A1A] text-white">
                <MapPin className="w-3.5 h-3.5" />
                {train.region}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-black/60 text-gray-200 border border-white/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatDuration(train.duration_days)}
              </span>
            </div>

            <h2 id="train-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {train.name}
            </h2>

            <div className="text-xs sm:text-sm text-gray-200 font-medium">
              Маршрут: <span className="font-bold text-white">{formatRouteShort(train.route)}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-gray-200">
          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
              Описание туристического маршрута
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/70 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              {train.description}
            </p>
          </div>

          {/* Full Route Stops */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
              <Route className="w-4 h-4 text-[#E21A1A]" />
              <span>Остановки по маршруту ({train.route.length} станций)</span>
            </h4>
            <div className="flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 p-3 sm:p-4 rounded-lg">
              {train.route.map((city, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-xs sm:text-sm font-semibold text-gray-900 dark:text-white shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-[#E21A1A] text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{city}</span>
                  </div>
                  {idx < train.route.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Excursions Included */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Экскурсионная программа</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {train.excursions.map((excursion, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">{excursion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Departure Dates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E21A1A]" />
              <span>Все доступные даты отправления ({train.departures.length})</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {train.departures.map((dateStr, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-center flex flex-col items-center justify-center gap-1 hover:border-[#E21A1A] transition"
                >
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDate(dateStr)}</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 font-bold px-2 py-0.5 rounded">
                    Места доступны
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {train.tags && train.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Теги
              </h4>
              <div className="flex flex-wrap gap-2">
                {train.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      onTagClick?.(tag);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-[#E21A1A] dark:hover:text-red-300 text-gray-700 dark:text-gray-300 px-3 py-1 rounded transition cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-gray-400" />
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Price & External Buy Link */}
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Стоимость билета за тур</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">от</span>
              <span className="text-[#E21A1A] font-black">{formatPrice(train.price_from)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:inline-flex px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold transition cursor-pointer"
            >
              Закрыть
            </button>
            <a
              href={train.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E21A1A] hover:bg-[#C81010] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-150 transform active:scale-98"
            >
              <Ticket className="w-5 h-5" />
              <span>Купить билет</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
