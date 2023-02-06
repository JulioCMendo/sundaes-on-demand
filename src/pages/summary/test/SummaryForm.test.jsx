import { render, screen, fireEvent } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

test('verify initial conditions', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: /confirm order/i });
  expect(button).toBeDisabled();

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });
  expect(checkbox).not.toBeChecked();
});

test('verify enabling/disabling button when clicking checkbox', () => {
  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
});
