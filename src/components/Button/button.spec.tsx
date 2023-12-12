import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';
describe('Button', () => {
  it('should render the component', () => {
    render(<Button />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
});
