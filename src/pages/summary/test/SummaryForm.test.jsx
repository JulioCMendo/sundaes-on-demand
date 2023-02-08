import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

test('verify enabling/disabling button when clicking checkbox', async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const button = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i
  });

  await user.click(checkbox);
  expect(button).toBeEnabled();

  await user.click(checkbox);
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on moueover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
