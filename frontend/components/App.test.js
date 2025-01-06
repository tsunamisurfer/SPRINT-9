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

test('renders message heading correctly after form submission', async () => {
  // Mock the fetch to simulate an error response
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('API is down')) // Simulate an error from the API
  );

  render(<AppFunctional />);

  const input = screen.getByRole('textbox'); // Find the input field
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ }); // Find the submit button

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com');

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for the message to appear (the message content)
  const messageHeading = await screen.findByText(/An unexpected error occurred/i); // Match the text

  // Assert that the message is rendered
  expect(messageHeading).toBeInTheDocument();
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
  // Mock the fetch to simulate an error response
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('API is down')) // Simulate an error from the API
  );

  render(<AppFunctional />);

  const input = screen.getByRole('textbox'); // Find the input field
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ }); // Find the submit button

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com');

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for the message to appear after form submission (error message due to fetch failure)
  const messageHeading = await screen.findByText(/An unexpected error occurred/i); // Match the text
  
  // Assert the message is rendered
  expect(messageHeading).toBeInTheDocument();

  // Assert the input field is cleared after submission
  expect(input.value).toBe('');
});


