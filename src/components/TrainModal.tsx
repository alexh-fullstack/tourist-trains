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
  Sparkles,
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
      // Focus modal
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

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
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
        className="relative bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all"
      >
        {/* Header with gradient & badges */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5" />
              {train.region}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/60 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {formatDuration(train.duration_days)}
            </span>
          </div>

          <h2 id="train-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            {train.name}
          </h2>

          <div className="mt-2 text-sm text-indigo-200 font-medium flex items-center gap-2">
            <span>Маршрут:</span>
            <span className="text-white font-semibold">{formatRouteShort(train.route)}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              О путешествии
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {train.description}
            </p>
          </div>

          {/* Full Route Stops */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Route className="w-4 h-4 text-indigo-600" />
              <span>Остановки по маршруту ({train.route.length})</span>
            </h4>
            <div className="flex flex-wrap items-center gap-2 bg-indigo-50/50 border border-indigo-100 p-3 sm:p-4 rounded-xl">
              {train.route.map((city, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-200/60 rounded-lg text-xs sm:text-sm font-semibold text-slate-800 shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{city}</span>
                  </div>
                  {idx < train.route.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Excursions Included */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Экскурсионная программа</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {train.excursions.map((excursion, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-950 text-xs sm:text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{excursion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Departure Dates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Все даты отправления ({train.departures.length})</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {train.departures.map((dateStr, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center justify-center gap-1 hover:border-indigo-300 transition"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-900">{formatDate(dateStr)}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/70 font-semibold px-2 py-0.5 rounded-full">
                    Места доступны
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {train.tags && train.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Теги тура
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
                    className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 hover:bg-indigo-100 hover:text-indigo-800 text-slate-700 px-3 py-1 rounded-lg transition cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-slate-400" />
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Price & External Buy Link */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-500 font-medium">Стоимость билета</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-900 flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-sm font-medium text-slate-500">от</span>
              <span>{formatPrice(train.price_from)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:inline-flex px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-sm font-semibold transition cursor-pointer"
            >
              Закрыть
            </button>
            <a
              href={train.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-200 transform active:scale-95"
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
