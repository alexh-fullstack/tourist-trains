import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('Language and Accessibility Features', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('a11y-mode');
    window.history.replaceState(null, '', '/');
  });

  it('switches interface and train data to English when clicking language toggle', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially in Russian
    expect(screen.getByRole('heading', { name: 'В Карелию' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Все регионы' })).toBeInTheDocument();

    // Click Language toggle (RUS -> ENG)
    const langBtn = screen.getByTitle(/switch language to english/i);
    await user.click(langBtn);

    // Should now be translated to English
    expect(screen.getByRole('heading', { name: 'To Karelia' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pearl of the Caucasus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All Regions' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by train name/i)).toBeInTheDocument();
  });

  it('toggles accessibility mode for visually impaired users', async () => {
    const user = userEvent.setup();
    render(<App />);

    const a11yBtn = screen.getByTitle(/для слабовидящих/i);
    expect(a11yBtn).toBeInTheDocument();
    expect(document.documentElement.classList.contains('a11y-mode')).toBe(false);

    // Click to enable
    await user.click(a11yBtn);
    expect(document.documentElement.classList.contains('a11y-mode')).toBe(true);
    expect(localStorage.getItem('a11y_mode')).toBe('true');

    // Click to disable
    await user.click(a11yBtn);
    expect(document.documentElement.classList.contains('a11y-mode')).toBe(false);
    expect(localStorage.getItem('a11y_mode')).toBe('false');
  });
});
