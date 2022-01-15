import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  const usernameInput = getByText(/Username:/i);
  const passwordInput = getByText(/Password:/i);
  const submit = getByText(/Submit/i);

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submit).toBeInTheDocument();

});
