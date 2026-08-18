import React from 'react';
import { ShieldCheck, Zap, Globe, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E2229] text-gray-400 text-sm border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="bg-[#E21A1A] text-white font-black px-2 py-0.5 text-sm rounded-xs select-none">
                ТЖД
              </div>
              <span>Витрина туристских поездов</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Сервис бронирования и информации о туристических железнодорожных путешествиях и круизах по России.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Пассажирам
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="hover:text-white transition cursor-pointer">Туристические поезда</li>
              <li className="hover:text-white transition cursor-pointer">Правила перевозки и багаж</li>
              <li className="hover:text-white transition cursor-pointer">Программа лояльности</li>
              <li className="hover:text-white transition cursor-pointer">Путешествия с детьми</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Особенности сервиса
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Контакты и поддержка
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
                <span className="font-semibold text-gray-200">8 (800) 200-50-50</span>
              </div>
              <div className="text-[11px] text-gray-500">Круглосуточно, звонок бесплатный</div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>support@tour-trains.ru</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Витрина туристских поездов. Тестовое задание.</div>
          <div>Все данные и маршруты предоставлены для демонстрации прототипа.</div>
        </div>
      </div>
    </footer>
  );
};
