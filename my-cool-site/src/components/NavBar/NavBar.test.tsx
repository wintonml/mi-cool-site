import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const mockLinks = ['Home', 'About', 'Projects', 'Contact'];
  const mockProps = {
    header: 'Mi-cool',
    links: mockLinks,
  };

  const renderWithRouter = (component: React.ReactElement, initialEntries: string[] = ['/']) => {
    return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
  };

  it('renders the header correctly', () => {
    renderWithRouter(<NavBar {...mockProps} />);
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();
  });

  it('renders the header with correct link to home', () => {
    renderWithRouter(<NavBar {...mockProps} />);

    const headerLink = screen.getByText(mockProps.header).closest('a');
    expect(headerLink).toHaveAttribute('href', '/home');
  });

  it('handles empty links array', () => {
    renderWithRouter(<NavBar {...mockProps} links={[]} />);
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();
  });

  it('renders all navigation links on page', () => {
    renderWithRouter(<NavBar {...mockProps} />);

    // Should show all navigation links from mockLinks
    mockLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
