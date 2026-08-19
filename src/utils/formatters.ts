import type { Train } from '../types/train';

/**
 * Formats a number to Russian Ruble currency string (e.g. 24 900 ₽)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats ISO date string (YYYY-MM-DD) into readable Russian date.
 * Example: '2026-09-04' -> '4 сентября 2026'
 */
export function formatDate(dateString: string, shortMonth = false): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return dateString;

  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: shortMonth ? 'short' : 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats duration in days with proper Russian pluralization.
 * 1 день, 2-4 дня, 5+ дней
 */
export function formatDuration(days: number): string {
  const abs = Math.abs(days);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return `${days} дней`;
  }
  if (mod10 === 1) {
    return `${days} день`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `${days} дня`;
  }
  return `${days} дней`;
}

/**
 * Returns formatted start to end route representation
 * Example: ["Москва", "Петрозаводск", "Сортавала", "Выборг", "Москва"] -> "Москва → Москва"
 */
export function formatRouteShort(route: string[]): string {
  if (!route || route.length === 0) return '';
  if (route.length === 1) return route[0];
  return `${route[0]} → ${route[route.length - 1]}`;
}

export interface RouteDisplayInfo {
  isCircular: boolean;
  startCity: string;
  endCity: string;
  intermediateStops: string[];
}

export function getRouteDisplayInfo(route: string[]): RouteDisplayInfo {
  if (!route || route.length === 0) {
    return { isCircular: false, startCity: '', endCity: '', intermediateStops: [] };
  }
  const isCircular = route.length > 1 && route[0] === route[route.length - 1];
  const startCity = route[0];
  const endCity = route[route.length - 1];
  const intermediateStops = route.slice(1, isCircular ? -1 : undefined);

  return {
    isCircular,
    startCity,
    endCity,
    intermediateStops,
  };
}

/**
 * Gets nearest departure date for a train.
 * If referenceDate is provided, returns earliest date >= referenceDate.
 * Otherwise returns the earliest date in the departures list.
 */
export function getNearestDeparture(departures: string[], referenceDate?: Date): string | null {
  if (!departures || departures.length === 0) return null;

  const sortedDepartures = [...departures].sort();
  if (!referenceDate) {
    return sortedDepartures[0];
  }

  const refISO = referenceDate.toISOString().slice(0, 10);
  const upcoming = sortedDepartures.find((d) => d >= refISO);
  return upcoming || sortedDepartures[0];
}

/**
 * Extracts unique Year-Month keys from all trains' departure dates,
 * sorted chronologically.
 * Returns array of { key: '2026-09', label: 'Сентябрь 2026' }
 */
export function getAvailableMonths(trains: Train[]): { key: string; label: string }[] {
  const monthSet = new Set<string>();

  trains.forEach((train) => {
    train.departures.forEach((dep) => {
      if (dep && dep.length >= 7) {
        monthSet.add(dep.slice(0, 7)); // 'YYYY-MM'
      }
    });
  });

  const sortedKeys = Array.from(monthSet).sort();

  return sortedKeys.map((key) => {
    const [year, month] = key.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const rawLabel = new Intl.DateTimeFormat('ru-RU', {
      month: 'long',
      year: 'numeric',
    }).format(date);

    // Capitalize first letter (e.g. 'сентябрь 2026 г.' -> 'Сентябрь 2026')
    const cleaned = rawLabel.replace(/\s*г\.?$/, '');
    const capitalized = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

    return {
      key,
      label: capitalized,
    };
  });
}

/**
 * Extracts unique regions from trains list
 */
export function getAvailableRegions(trains: Train[]): string[] {
  const regions = new Set<string>();
  trains.forEach((t) => {
    if (t.region) regions.add(t.region);
  });
  return Array.from(regions).sort();
}
