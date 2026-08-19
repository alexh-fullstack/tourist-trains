import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { Train } from '../types/train';
import { getRouteDisplayInfo } from '../utils/formatters';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ExternalLink,
  Tag,
  Route,
  Ticket,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  Sparkles,
  List,
  ArrowRight,
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
  const { t, language, formatPriceLocal, formatDateLocal, formatDurationLocal, formatMonthLabel } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Tab for departures: 'calendar' | 'list'
  const [departureView, setDepartureView] = useState<'calendar' | 'list'>('calendar');

  // Selected date for interactive calendar highlighting
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Active month in calendar (YYYY-MM)
  const availableMonths = useMemo(() => {
    if (!train?.departures || train.departures.length === 0) return [];
    const months = Array.from(new Set(train.departures.map((d) => d.slice(0, 7)))).sort();
    return months;
  }, [train]);

  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  // Reset or initialize state when train changes
  useEffect(() => {
    if (train?.departures && train.departures.length > 0) {
      setSelectedDate(train.departures[0]);
      setCurrentMonthIndex(0);
    }
  }, [train]);

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
  const routeInfo = getRouteDisplayInfo(train.route);
  const activeMonthKey = availableMonths[currentMonthIndex] || train.departures[0]?.slice(0, 7) || '2026-09';

  // Build calendar matrix for activeMonthKey
  const [year, month] = activeMonthKey.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = (new Date(year, month - 1, 1).getDay() + 6) % 7; // 0 = Monday, 6 = Sunday

  const monthDepartures = train.departures.filter((d) => d.startsWith(activeMonthKey));
  const monthDepartureDays = new Set(monthDepartures.map((d) => Number(d.slice(8, 10))));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
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
        className="relative bg-white dark:bg-[#18181B] w-full max-w-3xl rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all text-gray-900 dark:text-zinc-100"
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
            aria-label={t.modalCloseBtn}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top badges & Title (clean: region + duration) */}
          <div className="relative z-10 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-[#E21A1A] text-white">
                <MapPin className="w-3.5 h-3.5" />
                {train.region}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold bg-black/60 text-gray-200 border border-white/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatDurationLocal(train.duration_days)}
              </span>
            </div>

            <h2 id="train-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {train.name}
            </h2>

            {/* Route line: refresh icon beside label, arrow between cities */}
            <div className="text-xs sm:text-sm text-gray-200 font-medium flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5">
                {routeInfo.isCircular && <RotateCw className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />}
                <span>{t.routeLabel}</span>
              </span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>{routeInfo.startCity}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white flex-shrink-0" />
                <span>{routeInfo.endCity}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-gray-800 dark:text-zinc-200">
          {/* Full Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-2">
              {t.modalAboutTitle}
            </h4>
            <p className="text-sm sm:text-base text-gray-700 dark:text-zinc-300 leading-relaxed bg-gray-50 dark:bg-[#202024] p-4 rounded-lg border border-gray-200 dark:border-zinc-750">
              {train.description}
            </p>
          </div>

          {/* Full Route Stops (Atomic station + arrow units: 0 broken arrows, 0 ugly scrollbars) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Route className="w-4 h-4 text-[#E21A1A]" />
                <span>{t.modalRouteStopsTitle} ({train.route.length} {t.stationsCount})</span>
              </h4>
            </div>

            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-2 bg-gray-50 dark:bg-[#202024] border border-gray-200 dark:border-zinc-750 p-3.5 sm:p-4 rounded-xl">
              {train.route.map((city, idx) => (
                <div key={idx} className="inline-flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#2A2A30] border border-gray-200 dark:border-zinc-700 rounded-md text-xs sm:text-sm font-semibold text-gray-900 dark:text-white shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-[#E21A1A] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="whitespace-nowrap">{city}</span>
                  </div>
                  {idx < train.route.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-zinc-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Excursions Included */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.modalExcursionsTitle}</span>
              </h4>
              <span className="text-[11px] font-semibold text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded border border-gray-200 dark:border-zinc-700">
                {t.excursionsIncludedBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {train.excursions.map((excursion, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#202024] border border-gray-200 dark:border-zinc-750 hover:border-gray-300 dark:hover:border-zinc-600 transition shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#E21A1A]/10 dark:bg-red-950/50 text-[#E21A1A] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E21A1A]/20">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <span className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-zinc-100 leading-snug">
                    {excursion}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Departure Dates */}
          <div>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-[#E21A1A]" />
                <span>{t.modalDeparturesTitle} ({train.departures.length})</span>
              </h4>

              {/* View Switcher: Calendar / List */}
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-zinc-700 p-0.5 bg-gray-100 dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setDepartureView('calendar')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                    departureView === 'calendar'
                      ? 'bg-white dark:bg-[#202024] text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <CalendarIcon className="w-3 h-3" />
                  <span>{t.viewCalendarTab}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDepartureView('list')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                    departureView === 'list'
                      ? 'bg-white dark:bg-[#202024] text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-3 h-3" />
                  <span>{t.viewListTab}</span>
                </button>
              </div>
            </div>

            {/* Standard Clean Calendar View */}
            {departureView === 'calendar' ? (
              <div className="bg-gray-50 dark:bg-[#202024] border border-gray-200 dark:border-zinc-750 rounded-xl p-3.5 sm:p-4 shadow-2xs">
                {/* Month header & navigation */}
                <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-zinc-700">
                  <button
                    type="button"
                    disabled={currentMonthIndex <= 0}
                    onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
                    aria-label="Предыдущий месяц"
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white block leading-tight">
                      {formatMonthLabel(activeMonthKey)}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                      {monthDepartures.length > 0
                        ? `${monthDepartures.length} ${language === 'en' ? 'departure dates' : 'даты выезда'}`
                        : language === 'en' ? 'No departures this month' : 'В этом месяце нет выездов'}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={currentMonthIndex >= availableMonths.length - 1}
                    onClick={() => setCurrentMonthIndex((prev) => Math.min(availableMonths.length - 1, prev + 1))}
                    aria-label="Следующий месяц"
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 pt-2 pb-1 text-center text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                  {t.weekDays.map((w, idx) => (
                    <div key={idx} className={idx >= 5 ? 'text-amber-600 dark:text-amber-400' : ''}>
                      {w}
                    </div>
                  ))}
                </div>

                {/* Calendar Days Matrix (Circular days centered in each column) */}
                <div className="grid grid-cols-7 gap-y-1.5 gap-x-1">
                  {/* Empty cells before month start */}
                  {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="w-8 h-8 sm:w-9 sm:h-9 mx-auto" />
                  ))}

                  {/* Month days */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateISO = `${activeMonthKey}-${String(dayNum).padStart(2, '0')}`;
                    const isDeparture = monthDepartureDays.has(dayNum);
                    const isSelected = selectedDate === dateISO;

                    if (isDeparture) {
                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => setSelectedDate(dateISO)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full mx-auto flex items-center justify-center font-bold text-xs sm:text-sm transition cursor-pointer relative ${
                            isSelected
                              ? 'bg-red-50 dark:bg-red-950/50 text-[#E21A1A] dark:text-red-300 border-2 border-[#E21A1A] shadow-xs scale-105 z-10'
                              : 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 hover:border-[#E21A1A] hover:bg-gray-50 dark:hover:bg-zinc-750'
                          }`}
                        >
                          <span>{dayNum}</span>
                        </button>
                      );
                    }

                    return (
                      <div
                        key={dayNum}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full mx-auto flex items-center justify-center text-[11px] text-gray-400 dark:text-zinc-600 font-normal"
                      >
                        {dayNum}
                      </div>
                    );
                  })}
                </div>

                {/* Selected Date Summary */}
                {selectedDate && (
                  <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-zinc-700 flex items-center gap-2 text-xs">
                    <CalendarIcon className="w-4 h-4 text-[#E21A1A]" />
                    <span className="text-gray-600 dark:text-zinc-400">
                      {language === 'en' ? 'Selected departure date:' : 'Выбранная дата выезда:'}
                    </span>
                    <strong className="font-bold text-gray-900 dark:text-white">
                      {formatDateLocal(selectedDate)}
                    </strong>
                  </div>
                )}
              </div>
            ) : (
              /* Clean List View */
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {train.departures.map((dateStr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition shadow-2xs cursor-pointer ${
                      selectedDate === dateStr
                        ? 'bg-red-50/70 dark:bg-red-950/40 border-[#E21A1A] ring-1 ring-[#E21A1A]'
                        : 'bg-gray-50 dark:bg-[#202024] border-gray-200 dark:border-zinc-750 hover:border-gray-300'
                    }`}
                  >
                    <CalendarIcon className="w-4 h-4 text-[#E21A1A]" />
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{formatDateLocal(dateStr)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          {train.tags && train.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-2">
                {t.modalTagsTitle}
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
                    className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 dark:bg-[#202024] hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-[#E21A1A] dark:hover:text-red-300 text-gray-700 dark:text-zinc-300 px-3 py-1 rounded transition cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-gray-400" />
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Price & External Buy Link (Identical height for both buttons) */}
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-[#121214] border-t border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-xs text-gray-500 dark:text-zinc-400 font-medium">{t.modalPriceLabel}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-sm font-normal text-gray-500 dark:text-zinc-400">{t.priceFrom}</span>
              <span className="text-[#E21A1A] font-black">{formatPriceLocal(train.price_from)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="h-11 sm:h-12 hidden sm:inline-flex items-center justify-center px-5 sm:px-6 rounded-lg border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-semibold transition cursor-pointer leading-none"
            >
              {t.modalCloseBtn}
            </button>
            <a
              href={train.buy_url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 sm:h-12 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 rounded-lg bg-[#E21A1A] hover:bg-[#C81010] text-white font-bold text-sm sm:text-base shadow-sm transition-all duration-150 transform active:scale-98 leading-none"
            >
              <Ticket className="w-5 h-5" />
              <span>{t.buyTicketBtn}</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
