import React from 'react';
import { Eye, Phone, CalendarCheck, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useA11y } from '../context/A11yContext';

interface HeaderProps {
  totalCount?: number;
  filteredCount?: number;
}

export const Header: React.FC<HeaderProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { isA11y, toggleA11y } = useA11y();

  return (
    <header className="w-full bg-white dark:bg-[#18181B] border-b border-gray-200 dark:border-zinc-800 transition-colors duration-200">
      {/* Top Corporate Header Bar */}
      <div className="bg-white dark:bg-[#18181B] border-b border-gray-200 dark:border-zinc-800 text-xs text-gray-700 dark:text-zinc-300 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="bg-[#E21A1A] text-white font-extrabold px-3 py-1 text-lg sm:text-xl tracking-tight rounded-xs select-none shadow-xs">
              ТЖД
            </div>
            <div className="leading-tight">
              <span className="font-bold text-gray-900 dark:text-white block text-xs sm:text-sm tracking-tight">
                {t.brandName}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-zinc-400 hidden sm:block">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {/* Right Utilities Bar */}
          <div className="flex items-center gap-3 sm:gap-4 text-gray-700 dark:text-zinc-300">
            {/* Left of delimiter: Support phone */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-600 dark:text-zinc-400 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#E21A1A]" />
              <span>{t.supportPhoneLabel} </span>
              <strong className="text-gray-900 dark:text-white font-semibold">8 (800) 200-50-50</strong>
            </div>

            {/* Delimiter & Right controls toolbar */}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-zinc-700">
              {/* 1. Visually Impaired / Accessibility Mode Button */}
              <button
                type="button"
                onClick={toggleA11y}
                aria-pressed={isA11y}
                title={isA11y ? t.a11yActive : t.a11yLabel}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer border ${
                  isA11y
                    ? 'bg-amber-500 text-black border-amber-600 shadow-xs'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 border-gray-200 dark:border-zinc-700'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isA11y ? t.a11yActive : t.a11yLabel}</span>
              </button>

              {/* 2. Language Switcher (RUS / ENG) */}
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Переключить язык на ${language === 'ru' ? 'English' : 'Русский'}`}
                title={`Switch language to ${language === 'ru' ? 'English' : 'Русский'}`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-700 font-bold text-xs transition cursor-pointer border border-gray-200 dark:border-zinc-700"
              >
                <Globe className="w-3.5 h-3.5 text-[#E21A1A]" />
                <span>{language === 'ru' ? 'RUS' : 'ENG'}</span>
              </button>

              {/* 3. Theme Toggle Button (Light / Dark) */}
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
      <div className="bg-gray-50 dark:bg-[#141416] text-gray-700 dark:text-zinc-300 text-xs font-medium hidden sm:block border-b border-gray-200/80 dark:border-zinc-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold bg-[#E21A1A] px-3 py-1 rounded-xs shadow-2xs">
              {t.navCatalog}
            </span>
            <span className="text-gray-600 dark:text-zinc-400 hover:text-[#E21A1A] dark:hover:text-white transition cursor-pointer">
              {t.navHotels}
            </span>
            <span className="text-gray-600 dark:text-zinc-400 hover:text-[#E21A1A] dark:hover:text-white transition cursor-pointer">
              {t.navExcursions}
            </span>
            <span className="text-gray-600 dark:text-zinc-400 hover:text-[#E21A1A] dark:hover:text-white transition cursor-pointer">
              {t.navCalendar}
            </span>
            <span className="text-gray-600 dark:text-zinc-400 hover:text-[#E21A1A] dark:hover:text-white transition cursor-pointer">
              {t.navRules}
            </span>
            <span className="text-gray-600 dark:text-zinc-400 hover:text-[#E21A1A] dark:hover:text-white transition cursor-pointer">
              {t.navFaq}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 dark:text-zinc-400 text-[11px]">
            <CalendarCheck className="w-3.5 h-3.5 text-[#E21A1A] dark:text-amber-400" />
            <span>{t.seasonLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
