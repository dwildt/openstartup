import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('applies correct variant class', () => {
    render(<Button variant="secondary">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--secondary');
  });

  test('applies correct size class', () => {
    render(<Button size="small">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button--small');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('button--disabled');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});