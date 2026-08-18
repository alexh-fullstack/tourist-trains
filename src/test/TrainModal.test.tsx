import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrainModal } from '../components/TrainModal';
import { LanguageProvider } from '../context/LanguageContext';
import type { Train } from '../types/train';

const mockTrain: Train = {
  id: 'zhemchuzhina-kavkaza',
  name: 'Жемчужина Кавказа',
  region: 'Юг',
  route: ['Москва', 'Майкоп', 'Нальчик', 'Грозный', 'Дербент', 'Кисловодск', 'Москва'],
  duration_days: 8,
  departures: ['2026-09-12', '2026-10-03', '2026-10-24'],
  price_from: 89000,
  tags: ['горы', 'гастрономия', 'премиум', 'круиз'],
  description: 'Круиз по Северному Кавказу с ночлегом в поезде-отеле: Адыгея, Кабардино-Балкария, Чечня, Дагестан и Кавказские Минеральные Воды. Вагоны класса люкс и премиум.',
  excursions: ['Хаджохская теснина', 'Чегемские водопады', 'Дербентская крепость Нарын-Кала', 'Терренкуры Кисловодска'],
  buy_url: 'https://www.rzd.ru/ru/9264',
};

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe('TrainModal Component', () => {
  it('renders complete modal details correctly', () => {
    const handleClose = vi.fn();
    renderWithProvider(<TrainModal train={mockTrain} isOpen={true} onClose={handleClose} />);

    // Name & Title
    expect(screen.getByRole('heading', { name: 'Жемчужина Кавказа' })).toBeInTheDocument();
    // Description
    expect(screen.getByText(mockTrain.description)).toBeInTheDocument();

    // All excursions
    mockTrain.excursions.forEach((exc) => {
      expect(screen.getByText(exc)).toBeInTheDocument();
    });

    // All departure dates
    expect(screen.getByText(/12 сентября 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/3 октября 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/24 октября 2026/i)).toBeInTheDocument();

    // Buy ticket button with external link and target="_blank"
    const buyLink = screen.getByRole('link', { name: /купить билет/i });
    expect(buyLink).toBeInTheDocument();
    expect(buyLink).toHaveAttribute('href', mockTrain.buy_url);
    expect(buyLink).toHaveAttribute('target', '_blank');
    expect(buyLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('closes when clicking the close button', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    renderWithProvider(<TrainModal train={mockTrain} isOpen={true} onClose={handleClose} />);

    const closeButtons = screen.getAllByRole('button', { name: /закрыть/i });
    expect(closeButtons.length).toBeGreaterThan(0);
    await user.click(closeButtons[0]);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    const handleClose = vi.fn();
    renderWithProvider(<TrainModal train={mockTrain} isOpen={false} onClose={handleClose} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
