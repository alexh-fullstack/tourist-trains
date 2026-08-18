import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown, Compass, Phone, CalendarCheck, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
}

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'images/hero-train-1.jpg',
    badge: 'Туристические поезда',
    title: 'Путешествуйте по России на туристских поездах',
    subtitle: 'Комфортабельные «отели на колёсах»: от Карелии и Золотого кольца до Кавказа и Байкала с готовой экскурсионной программой.',
  },
  {
    id: 2,
    image: 'images/hero-train-2.jpg',
    badge: 'Премиальный комфорт в пути',
    title: 'Скоростные современные круизные экспрессы',
    subtitle: 'Современные вагоны СВ, купе и люкс, ресторан на борту, панорамные окна и первоклассный сервис в пути.',
  },
  {
    id: 3,
    image: 'images/hero-train-3.jpg',
    badge: 'Круизы выходного дня и гранд-туры',
    title: 'Уникальные железнодорожные маршруты',
    subtitle: 'Путешествуйте без забот: ночью поезд плавно везёт вас в новый город, а днём ждут увлекательные экскурсии с гидом.',
  },
  {
    id: 4,
    image: 'images/hero-train-4.jpg',
    badge: 'Живописная природа за окном',
    title: 'Захватывающие панорамы за окном поезда',
    subtitle: 'Увидьте скалы Рускеалы, седые вершины Кавказа, старинные купола Суздаля и хрустальные берега Байкала из окна купе.',
  },
];

export const Header: React.FC<HeaderProps> = ({ totalCount, filteredCount }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Smooth auto-transition between slides every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Header Bar */}
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

      {/* Navigation Sub-Bar (Thematic travel links, non-duplicate of regions) */}
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
            <span>Сезон отправлений: Сентябрь 2026 – Январь 2027</span>
          </div>
        </div>
      </div>

      {/* Dynamic Auto-Animated Hero Banner */}
      <div className="relative bg-gray-950 text-white overflow-hidden select-none min-h-[340px] sm:min-h-[400px] flex items-center">
        {/* Background Images Crossfade with Smooth Ken-Burns */}
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center brightness-50 filter transform scale-105 transition-transform duration-7000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          </div>
        ))}

        {/* Content Box */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Thematic Badge */}
            <div>
              <span className="inline-flex items-center gap-1.5 bg-[#E21A1A] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1 rounded-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {HERO_SLIDES[currentSlide].badge}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight transition-all duration-500">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-sm sm:text-lg text-gray-200 leading-relaxed font-normal min-h-[48px] transition-all duration-500">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            {/* Badges / Stats */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm text-white shadow-xs">
                <Compass className="w-4 h-4 text-[#FF4D4D]" />
                <span>Доступно туров:</span>
                <strong className="font-bold text-white bg-[#E21A1A] px-2 py-0.5 rounded text-xs">
                  {filteredCount} {filteredCount === totalCount ? `(все ${totalCount})` : `из ${totalCount}`}
                </strong>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm text-white shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>4 ключевых региона России</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
