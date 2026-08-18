import React from 'react';
import { Eye, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  totalCount?: number;
  filteredCount?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Corporate Header Bar */}
      <div className="bg-white border-b border-gray-100 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#E21A1A] text-white font-extrabold px-3 py-1 text-lg sm:text-xl tracking-tight rounded-xs select-none shadow-xs">
              ТЖД
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-900 block text-xs sm:text-sm tracking-tight">
                Витрина туристских поездов
              </span>
              <span className="text-[10px] text-gray-500 hidden sm:block">
                Оператор туристических железнодорожных круизов
              </span>
            </div>
          </div>

          {/* Right utilities & Helpline */}
          <div className="flex items-center gap-4 text-gray-700">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
              <span>Служба заботы: </span>
              <strong className="text-gray-900 font-semibold">8 (800) 200-50-50</strong>
            </div>

            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 hover:text-[#E21A1A] transition cursor-pointer text-gray-600"
              title="Версия для слабовидящих"
            >
              <Eye className="w-4 h-4" />
              <span>Для слабовидящих</span>
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="flex items-center gap-0.5 text-gray-600 font-semibold cursor-pointer hover:text-[#E21A1A]">
                <span>RUS</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-[#2B303A] text-gray-200 text-xs font-medium hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold bg-[#E21A1A] px-3 py-1 rounded-xs">
              Каталог маршрутов
            </span>
            <span className="hover:text-white transition cursor-pointer">Отели на колёсах</span>
            <span className="hover:text-white transition cursor-pointer">Экскурсионные программы</span>
            <span className="hover:text-white transition cursor-pointer">Календарь поездок</span>
            <span className="hover:text-white transition cursor-pointer">Правила и багаж</span>
            <span className="hover:text-white transition cursor-pointer">Частые вопросы</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Сезон 2026–2027</span>
          </div>
        </div>
      </div>

      {/* Clean & Compact Title Section */}
      <div className="bg-white border-b border-gray-200/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-block bg-red-50 text-[#E21A1A] border border-red-200 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-xs">
                Железнодорожные круизы по России
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Туристические железнодорожные маршруты
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-2xl">
                Выберите путешествие на комфортабельном поезде-отеле с насыщенной экскурсионной программой
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
