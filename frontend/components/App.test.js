import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom';


test('renders coordinates heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/Coordinates \(\d, \d\)/); // Use getByText for text-based matching
  expect(heading).toBeInTheDocument(); 
});

test('renders steps heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/You moved \d+ time/); 
  expect(heading).toBeInTheDocument(); 
});

test('renders message heading correctly', () => {
  const { container } = render(<AppFunctional />);
  const messageHeading = container.querySelector('#message'); // Use querySelector for id-based matching
  expect(messageHeading).toBeInTheDocument(); 
});

test('form submission clears input field', async () => {
  render(<AppFunctional />);
  
  const input = screen.getByRole('textbox'); 
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ });

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com'); 

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for some result, for example, message or change in the page
  await screen.findByRole('heading', { name: /test win/i });
  expect(input.value).toBe(''); // Assert input is cleared
});

