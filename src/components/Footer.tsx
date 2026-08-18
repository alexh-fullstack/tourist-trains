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
                РЖД
              </div>
              <span>АО «ФПК»</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              АО «Федеральная пассажирская компания» — национальный пассажирский железнодорожный перевозчик дальнего следования.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Пассажирам
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="hover:text-white transition cursor-pointer">Туристические поезда</li>
              <li className="hover:text-white transition cursor-pointer">Правила перевозки пассажиров</li>
              <li className="hover:text-white transition cursor-pointer">Программа «РЖД Бонус»</li>
              <li className="hover:text-white transition cursor-pointer">Маломобильным пассажирам</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Особенности витрины
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Данные 5 актуальных маршрутов</span>
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
                <span className="font-semibold text-gray-200">8 (800) 775-00-00</span>
              </div>
              <div className="text-[11px] text-gray-500">Звонок по России бесплатный</div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span>ticket@rzd.ru</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} АО «Федеральная пассажирская компания». Тестовое задание.</div>
          <div>Официальный сайт ОАО «РЖД»: rzd.ru</div>
        </div>
      </div>
    </footer>
  );
};
