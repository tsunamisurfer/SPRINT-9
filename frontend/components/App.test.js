import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom';


test('renders coordinates heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/Coordinates \(\d, \d\)/);
  expect(heading).toBeInTheDocument(); // Assert the heading is rendered correctly
});

test('renders steps heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/You moved \d+ time/);
  expect(heading).toBeInTheDocument(); // Assert the heading is rendered correctly
});

test('renders message heading correctly', () => {
  const { container } = render(<AppFunctional />);

  // Query the h3 element using its id
  const messageHeading = container.querySelector('#message');
  
  expect(messageHeading).toBeTruthy(); // Assert that the message heading exists
});

test('renders button text correctly', () => {
  render(<AppFunctional />);
  expect(screen.getByRole('button', { name: /LEFT/ })).toBeTruthy();
  expect(screen.getByRole('button', { name: /UP/ })).toBeTruthy();
  expect(screen.getByRole('button', { name: /RIGHT/ })).toBeTruthy();
  expect(screen.getByRole('button', { name: /DOWN/ })).toBeTruthy();
  expect(screen.getByRole('button', { name: /RESET/ })).toBeTruthy();
});

test('form submission clears input field', async () => {
  render(<AppFunctional />);

  const input = screen.getByRole('textbox'); // Assuming this is the email input field
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ });

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com'); // Assert the input value is correct

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for the message heading to update (indicating form was submitted)
  await waitFor(() => screen.getByRole('heading', { name: /test win/i }));
  
  // Assert the input field is cleared after submission
  expect(input.value).toBe('');
});



