import React from 'react';
import { TrainTrack, Heart, ShieldCheck, Zap, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <TrainTrack className="w-5 h-5" />
              </div>
              <span>Витрина туристских поездов</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Веб-прототип каталога туристических железнодорожных круизов по России с подробным описанием маршрутов, дат и экскурсий.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Особенности прототипа
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Данные из trains.json (5 маршрутов)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Мгновенная фильтрация и поиск без перезагрузок</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>Синхронизация фильтров с URL-параметрами</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Стек технологий
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">React 19</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">TypeScript</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">Tailwind CSS v4</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">Vite</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">Vitest</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">Lucide Icons</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Витрина туристских поездов. Тестовое задание.</div>
          <div className="flex items-center gap-1">
            <span>Сделано с</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>для путешествий по железным дорогам</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
