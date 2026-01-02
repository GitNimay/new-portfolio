import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/components/Hero';

describe('Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />);
  });

  it('renders name correctly', () => {
    render(<Hero />);
    expect(screen.getByText('Nimesh Kulkarni')).toBeInTheDocument();
  });

  it('renders job title', () => {
    render(<Hero />);
    expect(screen.getByText('DevOps Engineer')).toBeInTheDocument();
  });

  it('renders all contact links', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cv/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('has proper heading structure', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders profile image', () => {
    render(<Hero />);
    const profileImage = screen.getByAltText('Nimesh Kulkarni Profile');
    expect(profileImage).toBeInTheDocument();
  });
});
