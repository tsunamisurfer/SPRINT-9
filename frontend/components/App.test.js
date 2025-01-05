import server from './backend/mock-server';
import React from 'react';
import AppFunctional from './frontend/components/AppFunctional';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.setTimeout(1000);

let up, down, left, right, reset, submit;
let coordinates, steps, message, email;

// Utility function to update selectors
const updateSelectors = document => {
  up = document.querySelector('#up');
  down = document.querySelector('#down');
  left = document.querySelector('#left');
  right = document.querySelector('#right');
  reset = document.querySelector('#reset');
  submit = document.querySelector('#submit');
  coordinates = document.querySelector('#coordinates');
  steps = document.querySelector('#steps');
  message = document.querySelector('#message');
  email = document.querySelector('#email');
};

describe('Basic Tests for AppFunctional', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    render(<AppFunctional />);
    updateSelectors(document);
  });
  afterEach(() => {
    server.resetHandlers();
    document.body.innerHTML = '';
  });

  test('Renders without crashing', () => {
    expect(screen.getByText('You moved 0 times')).toBeInTheDocument();
  });

  test('Initial coordinates are (2,2)', () => {
    expect(coordinates.textContent).toMatch(/\(2.*2\)$/);
  });

  test('Moving up updates coordinates to (2,1)', () => {
    fireEvent.click(up);
    expect(coordinates.textContent).toMatch(/\(2.*1\)$/);
  });

  test('Reset button resets coordinates to (2,2)', () => {
    fireEvent.click(up);
    fireEvent.click(reset);
    expect(coordinates.textContent).toMatch(/\(2.*2\)$/);
  });

  test('Submit button requires valid email', async () => {
    fireEvent.change(email, { target: { value: 'invalid-email' } });
    fireEvent.click(submit);
    expect(await screen.findByText(/email must be a valid email/i)).toBeInTheDocument();
  });
});

