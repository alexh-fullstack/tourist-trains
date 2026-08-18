import React from 'react';
import { Eye, ChevronDown, Phone, CalendarCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  totalCount?: number;
  filteredCount?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-white dark:bg-[#18181B] border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Top Corporate Header Bar */}
      <div className="bg-white dark:bg-[#18181B] border-b border-gray-100 dark:border-zinc-800 text-xs text-gray-700 dark:text-zinc-300 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#E21A1A] text-white font-extrabold px-3 py-1 text-lg sm:text-xl tracking-tight rounded-xs select-none shadow-xs">
              ТЖД
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-900 dark:text-white block text-xs sm:text-sm tracking-tight">
                Витрина туристских поездов
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 hidden sm:block">
                Оператор туристических железнодорожных круизов
              </span>
            </div>
          </div>

          {/* Right utilities, Theme Toggle & Helpline */}
          <div className="flex items-center gap-3 sm:gap-4 text-gray-700 dark:text-zinc-300">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-600 dark:text-zinc-400 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
              <span>Служба заботы: </span>
              <strong className="text-gray-900 dark:text-white font-semibold">8 (800) 200-50-50</strong>
            </div>

            <button
              type="button"
              className="hidden lg:flex items-center gap-1.5 hover:text-[#E21A1A] dark:hover:text-[#FF4D4D] transition cursor-pointer text-gray-600 dark:text-zinc-400"
              title="Версия для слабовидящих"
            >
              <Eye className="w-4 h-4" />
              <span>Для слабовидящих</span>
            </button>

            {/* Language and Theme Switcher Section */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-zinc-700">
              {/* Language Selector */}
              <div className="flex items-center gap-0.5 text-gray-600 dark:text-zinc-300 font-semibold cursor-pointer hover:text-[#E21A1A] dark:hover:text-[#FF4D4D] text-xs px-1 py-1 rounded">
                <span>RUS</span>
                <ChevronDown className="w-3 h-3" />
              </div>

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
                title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
                className="flex items-center justify-center p-1.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-zinc-700 transition cursor-pointer border border-gray-200 dark:border-zinc-700"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600 hover:text-gray-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-[#2B303A] dark:bg-[#121214] text-gray-200 text-xs font-medium hidden sm:block border-b border-transparent dark:border-zinc-800 transition-colors duration-200">
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
    </header>
  );
};
