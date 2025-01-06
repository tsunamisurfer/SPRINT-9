import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('renders coordinates heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/Coordinates \(\d, \d\)/); 
});

test('renders steps heading correctly', () => {
  render(<AppFunctional />);
  const heading = screen.getByText(/You moved \d+ time/); 
});

test('renders message heading correctly', () => {
  const { container } = render(<AppFunctional />);

  // Query the h3 element using its id
  const messageHeading = container.querySelector('#message');
  
  expect(messageHeading).toBeTruthy(); 
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
  
  const input = screen.getByRole('textbox'); 
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ });

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com'); 

  // Simulate form submission
  fireEvent.click(submitButton);


  await screen.findByRole('heading', { name: /test win/i });
  expect(input.value).toBe(''); // Assert input is cleared
});


