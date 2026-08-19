import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Train } from '../types/train';

export type Language = 'ru' | 'en';

export interface Translations {
  brandName: string;
  brandSubtitle: string;
  supportPhoneLabel: string;
  a11yLabel: string;
  a11yActive: string;
  seasonLabel: string;
  navCatalog: string;
  navHotels: string;
  navExcursions: string;
  navCalendar: string;
  navRules: string;
  navFaq: string;
  searchPlaceholder: string;
  clearSearch: string;
  sortDefault: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortDepartureNearest: string;
  sortDurationAsc: string;
  sortDurationDesc: string;
  filterRegionLabel: string;
  filterAllRegions: string;
  filterMonthLabel: string;
  filterAllMonths: string;
  routesFound: string;
  resetAllFilters: string;
  routeLabel: string;
  stationsCount: string;
  nearestDepartureLabel: string;
  onRequest: string;
  priceFrom: string;
  detailsBtn: string;
  modalAboutTitle: string;
  modalRouteStopsTitle: string;
  modalExcursionsTitle: string;
  modalDeparturesTitle: string;
  modalTagsTitle: string;
  modalPriceLabel: string;
  modalCloseBtn: string;
  buyTicketBtn: string;
  seatsAvailable: string;
  emptyTitle: string;
  emptySubtitle: string;
  emptyResetBtn: string;
  footerAbout: string;
  footerPassengers: string;
  footerRules: string;
  footerLoyalty: string;
  footerFamily: string;
  footerFeatures: string;
  footerFeature1: string;
  footerFeature2: string;
  footerFeature3: string;
  footerContacts: string;
  footerCallFree: string;
  footerCopyright: string;
  footerDemoNote: string;
  // New Best Practice Keys
  circularTourBadge: string;
  linearTourBadge: string;
  circularViaLabel: string;
  viewCalendarTab: string;
  viewListTab: string;
  excursionsIncludedBadge: string;
  weekDays: string[];
  selectDatePrompt: string;
}

const translations: Record<Language, Translations> = {
  ru: {
    brandName: 'Витрина туристских поездов',
    brandSubtitle: 'Оператор туристических железнодорожных круизов',
    supportPhoneLabel: 'Служба заботы:',
    a11yLabel: 'Для слабовидящих',
    a11yActive: 'Обычная версия',
    seasonLabel: 'Сезон 2026–2027',
    navCatalog: 'Каталог маршрутов',
    navHotels: 'Отели на колёсах',
    navExcursions: 'Экскурсионные программы',
    navCalendar: 'Календарь поездок',
    navRules: 'Правила и багаж',
    navFaq: 'Частые вопросы',
    searchPlaceholder: 'Поиск поезда по названию, городу или тегу...',
    clearSearch: 'Очистить поиск',
    sortDefault: 'Сортировка по умолчанию',
    sortPriceAsc: 'Сначала дешевле',
    sortPriceDesc: 'Сначала дороже',
    sortDepartureNearest: 'По ближайшей дате',
    sortDurationAsc: 'По длительности (короткие)',
    sortDurationDesc: 'По длительности (длинные)',
    filterRegionLabel: 'Регион:',
    filterAllRegions: 'Все регионы',
    filterMonthLabel: 'Месяц отправления:',
    filterAllMonths: 'Все месяцы',
    routesFound: 'Показано маршрутов:',
    resetAllFilters: 'Сбросить все фильтры',
    routeLabel: 'Маршрут тура:',
    stationsCount: 'станций',
    nearestDepartureLabel: 'Ближайший выезд:',
    onRequest: 'По запросу',
    priceFrom: 'от',
    detailsBtn: 'Подробнее',
    modalAboutTitle: 'Описание туристического маршрута',
    modalRouteStopsTitle: 'Остановки по маршруту',
    modalExcursionsTitle: 'Экскурсионная программа',
    modalDeparturesTitle: 'Доступные даты выезда',
    modalTagsTitle: 'Теги',
    modalPriceLabel: 'Стоимость билета за тур',
    modalCloseBtn: 'Закрыть',
    buyTicketBtn: 'Купить билет',
    seatsAvailable: 'Места доступны',
    emptyTitle: 'Поездов по вашему запросу не найдено',
    emptySubtitle: 'Попробуйте изменить параметры поиска, выбрать другой регион или месяц отправления.',
    emptyResetBtn: 'Сбросить все фильтры',
    footerAbout: 'Сервис бронирования и информации о туристических железнодорожных путешествиях и круизах по России.',
    footerPassengers: 'Пассажирам',
    footerRules: 'Правила перевозки и багаж',
    footerLoyalty: 'Программа лояльности',
    footerFamily: 'Путешествия с детьми',
    footerFeatures: 'Особенности сервиса',
    footerFeature1: '5 актуальных маршрутов 2026–2027',
    footerFeature2: 'Мгновенная фильтрация и поиск',
    footerFeature3: 'Прямая синхронизация с URL',
    footerContacts: 'Контакты и поддержка',
    footerCallFree: 'Круглосуточно, звонок бесплатный',
    footerCopyright: '© 2026 Витрина туристских поездов. Тестовое задание.',
    footerDemoNote: 'Все данные и маршруты предоставлены для демонстрации прототипа.',
    // New Keys
    circularTourBadge: 'Кольцевой круиз',
    linearTourBadge: 'Прямой маршрут',
    circularViaLabel: 'через',
    viewCalendarTab: 'Календарь',
    viewListTab: 'Список',
    excursionsIncludedBadge: 'Включено в программу тура',
    weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    selectDatePrompt: 'Выберите удобную дату отправления:',
  },
  en: {
    brandName: 'Tourist Trains Showcase',
    brandSubtitle: 'Operator of Scenic Rail Cruises',
    supportPhoneLabel: 'Support Hotline:',
    a11yLabel: 'Accessibility Mode',
    a11yActive: 'Standard View',
    seasonLabel: 'Season 2026–2027',
    navCatalog: 'Tour Catalog',
    navHotels: 'Hotel Trains',
    navExcursions: 'Excursions',
    navCalendar: 'Schedule',
    navRules: 'Rules & Baggage',
    navFaq: 'FAQ',
    searchPlaceholder: 'Search by train name, destination city, or tag...',
    clearSearch: 'Clear search',
    sortDefault: 'Default Sorting',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortDepartureNearest: 'Earliest Departure',
    sortDurationAsc: 'Duration: Shortest first',
    sortDurationDesc: 'Duration: Longest first',
    filterRegionLabel: 'Region:',
    filterAllRegions: 'All Regions',
    filterMonthLabel: 'Departure Month:',
    filterAllMonths: 'All Months',
    routesFound: 'Tours displayed:',
    resetAllFilters: 'Reset all filters',
    routeLabel: 'Tour Route:',
    stationsCount: 'stops',
    nearestDepartureLabel: 'Next departure:',
    onRequest: 'On request',
    priceFrom: 'from',
    detailsBtn: 'Details',
    modalAboutTitle: 'Tour Itinerary & Details',
    modalRouteStopsTitle: 'Route Stops & Destinations',
    modalExcursionsTitle: 'Included Excursion Program',
    modalDeparturesTitle: 'Available Departure Dates',
    modalTagsTitle: 'Tour Tags',
    modalPriceLabel: 'Ticket Price per Tour',
    modalCloseBtn: 'Close',
    buyTicketBtn: 'Buy Ticket',
    seatsAvailable: 'Seats Available',
    emptyTitle: 'No tourist trains match your query',
    emptySubtitle: 'Try adjusting your search criteria, select a different region, or departure month.',
    emptyResetBtn: 'Reset All Filters',
    footerAbout: 'Booking and discovery platform for curated railway cruises and scenic train journeys.',
    footerPassengers: 'Passenger Guide',
    footerRules: 'Terms & Luggage Allowance',
    footerLoyalty: 'Loyalty Club',
    footerFamily: 'Family & Children Travel',
    footerFeatures: 'Service Highlights',
    footerFeature1: '5 Signature Routes 2026–2027',
    footerFeature2: 'Instant Realtime Filtering & Search',
    footerFeature3: 'Direct URL State Synchronization',
    footerContacts: 'Contacts & 24/7 Support',
    footerCallFree: 'Toll-free round-the-clock hotline',
    footerCopyright: '© 2026 Tourist Trains Showcase. Test Assignment.',
    footerDemoNote: 'All route data and prices are presented for prototype demonstration.',
    // New Keys
    circularTourBadge: 'Round-trip Cruise',
    linearTourBadge: 'One-way Journey',
    circularViaLabel: 'via',
    viewCalendarTab: 'Calendar',
    viewListTab: 'List',
    excursionsIncludedBadge: 'Included in Tour Package',
    weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    selectDatePrompt: 'Choose your preferred departure date:',
  },
};

const trainTranslationsEn: Record<string, Partial<Train>> = {
  karelia: {
    name: 'To Karelia',
    region: 'Northwest',
    route: ['Moscow', 'Petrozavodsk', 'Sortavala', 'Vyborg', 'Moscow'],
    tags: ['nature', 'Kizhi', 'Ruskeala', 'weekend'],
    description: 'Weekend getaway to Karelia: Kizhi Island, Kivach Waterfall, Ruskeala Mountain Park, and medieval Vyborg. Restful nights in comfortable carriages, rich daytime excursions.',
    excursions: ['Petrozavodsk City Tour', 'Kizhi via Hydrofoil', 'Ruskeala Mountain Park', 'Vyborg Castle'],
  },
  'zhemchuzhina-kavkaza': {
    name: 'Pearl of the Caucasus',
    region: 'South',
    route: ['Moscow', 'Maykop', 'Nalchik', 'Grozny', 'Derbent', 'Kislovodsk', 'Moscow'],
    tags: ['mountains', 'gastronomy', 'premium', 'cruise'],
    description: 'Grand North Caucasus cruise with overnight stays in a train-hotel: Adygea, Kabardino-Balkaria, Chechnya, Dagestan, and Caucasian Mineral Waters. Luxury and premium carriages.',
    excursions: ['Khadzhokh Gorge', 'Chegem Waterfalls', 'Naryn-Kala Ancient Citadel', 'Kislovodsk Health Trails'],
  },
  'baikalskaya-skazka': {
    name: 'Baikal Fairy Tale',
    region: 'Siberia',
    route: ['Irkutsk', 'Slyudyanka', 'Port Baikal', 'Irkutsk'],
    tags: ['Baikal', 'nature', 'Circum-Baikal', 'retro'],
    description: 'Scenic journey along the Circum-Baikal Railway — the most breathtaking section of the Trans-Siberian Railroad, with picturesque stops on Lake Baikal and historic tunnels.',
    excursions: ['Circum-Baikal Railway Tour', 'CBR Museum in Port Baikal', 'Baikal Omul Tasting'],
  },
  'zimnyaya-skazka': {
    name: 'Winter Fairy Tale',
    region: 'Northwest',
    route: ['Moscow', 'Veliky Ustyug', 'Kostroma', 'Moscow'],
    tags: ['family', 'New Year', 'children', 'Father Frost'],
    description: 'Magical New Year family tour: Father Frost residence in Veliky Ustyug and Snow Maiden wooden tower in Kostroma. Onboard animation, kids menu, and gifts.',
    excursions: ['Father Frost Homeland Tour', 'Snow Maiden Wooden Tower', 'Kostroma Artisan Cheese Fair'],
  },
  'po-zolotomu-koltsu': {
    name: 'Along the Golden Ring',
    region: 'Center',
    route: ['Moscow', 'Yaroslavl', 'Kostroma', 'Ivanovo', 'Suzdal', 'Vladimir', 'Moscow'],
    tags: ['history', 'temples', 'Golden Ring', 'weekend'],
    description: 'Classic journey through ancient cities of the Russian Golden Ring with hotel-train comfort: white-stone cathedrals of Vladimir and Suzdal, Volga promenade in Yaroslavl, and textile craft of Ivanovo.',
    excursions: ['Yaroslavl City Excursion', 'Suzdal Historic Kremlin', 'Dormition Cathedral of Vladimir', 'Linen Museum in Ivanovo'],
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  localizeTrain: (train: Train) => Train;
  formatPriceLocal: (price: number) => string;
  formatDateLocal: (dateStr: string, shortMonth?: boolean) => string;
  formatDurationLocal: (days: number) => string;
  formatMonthLabel: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved === 'ru' || saved === 'en') return saved;
    }
    return 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const t = translations[language];

  const localizeTrain = (train: Train): Train => {
    if (language === 'ru') return train;
    const localized = trainTranslationsEn[train.id];
    if (!localized) return train;
    return {
      ...train,
      ...localized,
      route: localized.route || train.route,
      tags: localized.tags || train.tags,
      excursions: localized.excursions || train.excursions,
    };
  };

  const formatPriceLocal = (price: number): string => {
    if (language === 'en') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }).format(price);
    }
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDateLocal = (dateString: string, shortMonth = false): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return dateString;

    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: shortMonth ? 'short' : 'long',
      year: 'numeric',
    }).format(date);
  };

  const formatDurationLocal = (days: number): string => {
    if (language === 'en') {
      return days === 1 ? '1 day' : `${days} days`;
    }
    const abs = Math.abs(days);
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod100 >= 11 && mod100 <= 19) return `${days} дней`;
    if (mod10 === 1) return `${days} день`;
    if (mod10 >= 2 && mod10 <= 4) return `${days} дня`;
    return `${days} дней`;
  };

  const formatMonthLabel = (key: string): string => {
    const [year, month] = key.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const rawLabel = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
      month: 'long',
      year: 'numeric',
    }).format(date);
    const cleaned = rawLabel.replace(/\s*г\.?$/, '');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        localizeTrain,
        formatPriceLocal,
        formatDateLocal,
        formatDurationLocal,
        formatMonthLabel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
