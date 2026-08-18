import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatDate,
  formatDuration,
  formatRouteShort,
  getNearestDeparture,
  getAvailableMonths,
  getAvailableRegions,
} from '../utils/formatters';
import type { Train } from '../types/train';

describe('formatters utility', () => {
  it('formats price in Russian currency format', () => {
    const formatted = formatPrice(24900);
    // Should contain 24, 900 and ruble symbol
    expect(formatted).toMatch(/24[\s\u00A0\u202F]?900/);
    expect(formatted).toContain('₽');
  });

  it('formats dates properly in Russian', () => {
    const dateFormatted = formatDate('2026-09-04');
    expect(dateFormatted).toContain('4');
    expect(dateFormatted).toContain('сентября');
    expect(dateFormatted).toContain('2026');
  });

  it('formats short month dates properly', () => {
    const shortFormatted = formatDate('2026-09-04', true);
    expect(shortFormatted).toContain('4');
    expect(shortFormatted).toContain('2026');
  });

  it('handles pluralization of duration days correctly', () => {
    expect(formatDuration(1)).toBe('1 день');
    expect(formatDuration(2)).toBe('2 дня');
    expect(formatDuration(3)).toBe('3 дня');
    expect(formatDuration(4)).toBe('4 дня');
    expect(formatDuration(5)).toBe('5 дней');
    expect(formatDuration(8)).toBe('8 дней');
    expect(formatDuration(21)).toBe('21 день');
    expect(formatDuration(22)).toBe('22 дня');
  });

  it('formats route short (first -> last)', () => {
    const route = ['Москва', 'Петрозаводск', 'Сортавала', 'Выборг', 'Москва'];
    expect(formatRouteShort(route)).toBe('Москва → Москва');

    const oneWay = ['Иркутск', 'Слюдянка', 'Порт Байкал', 'Иркутск'];
    expect(formatRouteShort(oneWay)).toBe('Иркутск → Иркутск');

    expect(formatRouteShort([])).toBe('');
    expect(formatRouteShort(['Москва'])).toBe('Москва');
  });

  it('computes nearest departure date correctly', () => {
    const departures = ['2026-10-16', '2026-09-04', '2026-09-18', '2026-10-02'];
    expect(getNearestDeparture(departures)).toBe('2026-09-04');

    // Given reference date
    const refDate = new Date(2026, 8, 10); // 2026-09-10
    expect(getNearestDeparture(departures, refDate)).toBe('2026-09-18');
  });

  it('extracts available months and regions from trains', () => {
    const mockTrains: Train[] = [
      {
        id: 't1',
        name: 'Поезд 1',
        region: 'Северо-Запад',
        route: ['Москва', 'СПб'],
        duration_days: 2,
        departures: ['2026-09-04', '2026-10-02'],
        price_from: 10000,
        tags: ['природа'],
        description: 'Описание',
        excursions: ['Экскурсия 1'],
        buy_url: 'https://example.com',
      },
      {
        id: 't2',
        name: 'Поезд 2',
        region: 'Юг',
        route: ['Москва', 'Сочи'],
        duration_days: 5,
        departures: ['2026-10-15', '2026-12-01'],
        price_from: 20000,
        tags: ['горы'],
        description: 'Описание',
        excursions: ['Экскурсия 2'],
        buy_url: 'https://example.com',
      },
    ];

    const regions = getAvailableRegions(mockTrains);
    expect(regions).toEqual(['Северо-Запад', 'Юг']);

    const months = getAvailableMonths(mockTrains);
    expect(months.map((m) => m.key)).toEqual(['2026-09', '2026-10', '2026-12']);
  });
});
