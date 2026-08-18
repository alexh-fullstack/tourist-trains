import React from 'react';
import { MapPin, Eye, LogIn, ChevronDown, Compass } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({ totalCount, filteredCount }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Corporate Nav (RZD / FPC Style) */}
      <div className="bg-white border-b border-gray-100 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#E21A1A] text-white font-extrabold px-3 py-1 text-lg sm:text-xl tracking-tight rounded-sm select-none shadow-xs">
              РЖД
            </div>
            <div className="leading-tight">
              <span className="font-bold text-[#E21A1A] block text-xs sm:text-sm tracking-tight">
                Федеральная пассажирская компания
              </span>
              <span className="text-[10px] text-gray-500 hidden sm:block">
                Пассажирские перевозки дальнего следования
              </span>
            </div>
          </div>

          {/* Top corporate links */}
          <div className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
            <span className="hover:text-[#E21A1A] transition cursor-pointer">Компания</span>
            <span className="hover:text-[#E21A1A] transition cursor-pointer">Акционерам и инвесторам</span>
            <span className="hover:text-[#E21A1A] transition cursor-pointer">Корпоративным клиентам</span>
            <span className="hover:text-[#E21A1A] transition cursor-pointer">ОАО «РЖД»</span>
          </div>

          {/* Right utilities */}
          <div className="flex items-center gap-4 text-gray-700">
            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 hover:text-[#E21A1A] transition cursor-pointer"
              title="Версия для слабовидящих"
            >
              <Eye className="w-4 h-4 text-gray-600" />
              <span>Версия для слабовидящих</span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-[#E21A1A] font-medium transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Вход</span>
              </button>

              <div className="flex items-center gap-0.5 text-gray-600 font-semibold cursor-pointer">
                <span>RUS</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-[#2B303A] text-gray-200 text-xs font-medium hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 h-10">
          <span className="hover:text-white transition cursor-pointer">Приемная генерального директора</span>
          <span className="hover:text-white transition cursor-pointer">Работа в ФПК</span>
          <span className="hover:text-white transition cursor-pointer">Карта сайта</span>
          <span className="text-white font-bold bg-[#E21A1A] px-3 py-1 rounded-sm">Туристические поезда</span>
        </div>
      </div>

      {/* Hero Banner with Scenic Train & FPC Branding */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="images/hero-train.jpg"
            alt="Туристический поезд в пути"
            className="w-full h-full object-cover object-center brightness-60 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Red Badge */}
            <div className="inline-block bg-[#E21A1A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-xs shadow-md">
              Федеральная пассажирская компания
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Витрина туристских поездов
            </h1>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
              Путешествуйте по всей России в комфортабельных отелях на колёсах: живописные маршруты, насыщенная экскурсионная программа и незабываемые впечатления.
            </p>

            {/* Badges / Stats */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm text-white">
                <Compass className="w-4 h-4 text-[#FF4D4D]" />
                <span>Найдено туров:</span>
                <strong className="font-bold text-white bg-[#E21A1A] px-2 py-0.5 rounded text-xs">
                  {filteredCount} {filteredCount === totalCount ? `(все ${totalCount})` : `из ${totalCount}`}
                </strong>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm text-white">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Сезон путешествий 2026–2027</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
