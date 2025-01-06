import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom';


test('form submission clears input field', async () => {
  render(<AppFunctional />);
  
  const input = screen.getByRole('textbox'); 
  const submitButton = screen.getByRole('button', { name: /SUBMIT/ });

  // Simulate typing in the input field
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com'); 

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for any heading change, such as a message being displayed
  const successMessage = await screen.findByText(/test win/i); // Check for success message or other indicator
  expect(successMessage).toBeInTheDocument();

  // Assert that the input is cleared after submission
  expect(input.value).toBe('');
});
