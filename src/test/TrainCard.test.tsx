import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrainCard } from '../components/TrainCard';
import { LanguageProvider } from '../context/LanguageContext';
import type { Train } from '../types/train';

const mockTrain: Train = {
  id: 'karelia',
  name: 'В Карелию',
  region: 'Северо-Запад',
  route: ['Москва', 'Петрозаводск', 'Сортавала', 'Выборг', 'Москва'],
  duration_days: 3,
  departures: ['2026-09-04', '2026-09-18', '2026-10-02', '2026-10-16'],
  price_from: 24900,
  tags: ['природа', 'Кижи', 'Рускеала', 'выходные'],
  description: 'Тур выходного дня по Карелии: остров Кижи, водопад Кивач, горный парк Рускеала и старинный Выборг.',
  excursions: ['Обзорная по Петрозаводску', 'Кижи на «Комете»', 'Горный парк Рускеала', 'Выборгский замок'],
  buy_url: 'https://www.rzd.ru/ru/9264',
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('TrainCard Component', () => {
  it('renders all required train card information', () => {
    const handleSelect = vi.fn();
    renderWithProvider(<TrainCard train={mockTrain} onSelect={handleSelect} />);

    // Name
    expect(screen.getByRole('heading', { name: 'В Карелию' })).toBeInTheDocument();
    // Region
    expect(screen.getByText('Северо-Запад')).toBeInTheDocument();
    // Duration
    expect(screen.getByText('3 дня')).toBeInTheDocument();
    // Route
    expect(screen.getByLabelText(/Маршрут тура/i)).toBeInTheDocument();
    // Price "от"
    expect(screen.getByText(/24[\s\u00A0\u202F]?900/)).toBeInTheDocument();
    // Nearest departure date
    expect(screen.getByText(/4 сент/i)).toBeInTheDocument();
    // Tags
    expect(screen.getByText('#природа')).toBeInTheDocument();
    expect(screen.getByText('#Кижи')).toBeInTheDocument();
  });

  it('triggers onSelect callback when clicking the card or details button', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderWithProvider(<TrainCard train={mockTrain} onSelect={handleSelect} />);

    const button = screen.getByRole('button', { name: /подробнее/i });
    await user.click(button);
    expect(handleSelect).toHaveBeenCalledWith(mockTrain);
  });

  it('triggers onTagClick callback when clicking a tag', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const handleTagClick = vi.fn();

    renderWithProvider(
      <TrainCard
        train={mockTrain}
        onSelect={handleSelect}
        onTagClick={handleTagClick}
      />
    );

    const tagButton = screen.getByText('#природа');
    await user.click(tagButton);
    expect(handleTagClick).toHaveBeenCalledWith('природа');
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
