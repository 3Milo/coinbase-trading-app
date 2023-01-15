import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main bar with select fields', () => {
  render(<App />);
  const coinField = screen.getByText('BTC');
  const currencyField = screen.getByText('USD');
  expect(coinField).toBeInTheDocument();
  expect(currencyField).toBeInTheDocument();
});
