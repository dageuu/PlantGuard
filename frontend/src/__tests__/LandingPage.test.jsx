// @vitest-environment jsdom
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPage from 'src/pages/LandingPage';

test('renders welcome text', () => {
  render(<LandingPage />);
  expect(screen.getByText(/Welcome to PlantGuard/i)).toBeInTheDocument();
});