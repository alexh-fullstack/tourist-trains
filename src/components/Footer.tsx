import React from 'react';
import { ShieldCheck, Zap, Globe, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181B] dark:bg-[#121214] text-zinc-400 text-sm border-t border-zinc-800 mt-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="bg-[#E21A1A] text-white font-extrabold px-2.5 py-1 text-base tracking-tight rounded-xs select-none shadow-xs leading-none">
                ТЖД
              </div>
              <div className="leading-tight">
                <span className="font-bold text-white text-sm sm:text-base block tracking-tight">
                  Витрина туристских поездов
                </span>
                <span className="text-[11px] text-zinc-400 block font-normal">
                  Оператор железнодорожных круизов
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              Сервис бронирования и информации о туристических железнодорожных путешествиях и круизах по России.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Пассажирам
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="hover:text-white transition cursor-pointer">Туристические поезда</li>
              <li className="hover:text-white transition cursor-pointer">Правила перевозки и багаж</li>
              <li className="hover:text-white transition cursor-pointer">Программа лояльности</li>
              <li className="hover:text-white transition cursor-pointer">Путешествия с детьми</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Особенности сервиса
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>5 актуальных маршрутов 2026–2027</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Мгновенная фильтрация и поиск</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#E21A1A]" />
                <span>Прямая синхронизация с URL</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-3">
              Контакты и поддержка
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
                <span className="font-semibold text-zinc-200">8 (800) 200-50-50</span>
              </div>
              <div className="text-[11px] text-zinc-500">Круглосуточно, звонок бесплатный</div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>support@tour-trains.ru</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>© {new Date().getFullYear()} Витрина туристских поездов. Тестовое задание.</div>
          <div>Все данные и маршруты предоставлены для демонстрации прототипа.</div>
        </div>
      </div>
    </footer>
  );
};
