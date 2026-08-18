import React from 'react';
import { TrainTrack, Sparkles, MapPin, Compass } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalCount, filteredCount }) => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border-b border-indigo-900/50">
      {/* Subtle decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Туристические железнодорожные маршруты по России</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-lg shadow-indigo-500/30 text-white">
                <TrainTrack className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
                  Витрина туристских поездов
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-normal mt-0.5">
                  Путешествуйте с комфортом: отели на колёсах, уникальные маршруты и экскурсии
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-200 shadow-sm backdrop-blur-sm">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Найдено туров:</span>
              <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                {filteredCount} {filteredCount === totalCount ? `(все ${totalCount})` : `из ${totalCount}`}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-200 shadow-sm backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Сезон: 2026–2027</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
