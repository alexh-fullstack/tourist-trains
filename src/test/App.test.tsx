import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('App Integration', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('renders all 5 tourist trains initially', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'В Карелию' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Жемчужина Кавказа' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Байкальская сказка' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Зимняя сказка' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'По Золотому кольцу' })).toBeInTheDocument();
  });

  it('filters trains by region', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click "Юг"
    const southButton = screen.getByRole('button', { name: 'Юг' });
    await user.click(southButton);

    // Only "Жемчужина Кавказа" should be visible
    expect(screen.getByRole('heading', { name: 'Жемчужина Кавказа' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'В Карелию' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Байкальская сказка' })).not.toBeInTheDocument();
  });

  it('filters trains by search query in train name or cities', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'Байкал');

    expect(screen.getByRole('heading', { name: 'Байкальская сказка' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'В Карелию' })).not.toBeInTheDocument();
  });

  it('filters trains by departure month', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click month button "Декабрь 2026"
    const decButton = screen.getByRole('button', { name: /декабрь 2026/i });
    await user.click(decButton);

    // "Зимняя сказка" has departure in December
    expect(screen.getByRole('heading', { name: 'Зимняя сказка' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'В Карелию' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Байкальская сказка' })).not.toBeInTheDocument();
  });

  it('opens and closes train modal with detailed info and buy link', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click on "В Карелию" card
    const cardTitle = screen.getByRole('heading', { name: 'В Карелию' });
    await user.click(cardTitle);

    // Modal dialog opens
    const modalDialog = screen.getByRole('dialog');
    expect(modalDialog).toBeInTheDocument();
    expect(screen.getByText(/Горный парк Рускеала/)).toBeInTheDocument();

    // Check external buy link
    const buyLink = screen.getByRole('link', { name: /купить билет/i });
    expect(buyLink).toHaveAttribute('href', 'https://www.rzd.ru/ru/9264');
    expect(buyLink).toHaveAttribute('target', '_blank');

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /закрыть окно/i });
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows empty state when no trains match and allows resetting filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByRole('searchbox');
    await user.type(searchInput, 'НесуществующийМаршрутXYZ');

    expect(screen.getByText('Поездов по вашему запросу не найдено')).toBeInTheDocument();

    const resetButtons = screen.getAllByRole('button', { name: /сбросить все фильтры/i });
    expect(resetButtons.length).toBeGreaterThan(0);
    await user.click(resetButtons[0]);

    // All trains should appear again
    expect(screen.getByRole('heading', { name: 'В Карелию' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Жемчужина Кавказа' })).toBeInTheDocument();
  });
});
