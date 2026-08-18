import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filters } from '../components/Filters';
import { LanguageProvider } from '../context/LanguageContext';
import type { FilterState } from '../types/train';

const defaultFilters: FilterState = {
  searchQuery: '',
  selectedRegion: '',
  selectedMonth: '',
  sortBy: 'default',
};

const mockRegions = ['Северо-Запад', 'Юг', 'Сибирь', 'Центр'];
const mockMonths = [
  { key: '2026-09', label: 'Сентябрь 2026' },
  { key: '2026-10', label: 'Октябрь 2026' },
];

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('Filters Component', () => {
  it('renders search input, region buttons, month buttons and sort options', () => {
    const handleFilterChange = vi.fn();
    const handleReset = vi.fn();

    renderWithProvider(
      <Filters
        filters={defaultFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        availableRegions={mockRegions}
        availableMonths={mockMonths}
        totalResults={5}
      />
    );

    // Search
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    // Regions
    expect(screen.getByRole('button', { name: 'Все регионы' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Северо-Запад' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Юг' })).toBeInTheDocument();
    // Months
    expect(screen.getByRole('button', { name: 'Все месяцы' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Сентябрь 2026' })).toBeInTheDocument();
    // Count
    expect(screen.getByText('Показано маршрутов:')).toBeInTheDocument();
  });

  it('triggers onFilterChange when typing in search input', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    const handleReset = vi.fn();

    renderWithProvider(
      <Filters
        filters={defaultFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        availableRegions={mockRegions}
        availableMonths={mockMonths}
        totalResults={5}
      />
    );

    const input = screen.getByRole('searchbox');
    await user.type(input, 'Карелия');
    expect(handleFilterChange).toHaveBeenCalled();
  });

  it('triggers onFilterChange when selecting a region', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    const handleReset = vi.fn();

    renderWithProvider(
      <Filters
        filters={defaultFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        availableRegions={mockRegions}
        availableMonths={mockMonths}
        totalResults={5}
      />
    );

    const regionBtn = screen.getByRole('button', { name: 'Сибирь' });
    await user.click(regionBtn);
    expect(handleFilterChange).toHaveBeenCalledWith({ selectedRegion: 'Сибирь' });
  });

  it('shows reset button when filters are active and triggers onReset', async () => {
    const user = userEvent.setup();
    const handleFilterChange = vi.fn();
    const handleReset = vi.fn();

    const activeFilters: FilterState = {
      ...defaultFilters,
      selectedRegion: 'Юг',
    };

    renderWithProvider(
      <Filters
        filters={activeFilters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        availableRegions={mockRegions}
        availableMonths={mockMonths}
        totalResults={1}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /сбросить все фильтры/i });
    expect(resetBtn).toBeInTheDocument();
    await user.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
