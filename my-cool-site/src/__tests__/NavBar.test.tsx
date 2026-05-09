import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

describe('NavBar Component', () => {
  const mockLinks = ['Home', 'Blog', 'Projects', 'Videos'];
  const mockProps = {
    header: 'Mi-cool',
    links: mockLinks,
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<HashRouter>{component}</HashRouter>);
  };

  it('renders the header correctly', () => {
    renderWithRouter(<NavBar {...mockProps} />);
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();
  });

  it('renders the header with correct link to home', () => {
    renderWithRouter(<NavBar {...mockProps} />);

    const headerLink = screen.getByText(mockProps.header).closest('a');
    expect(headerLink).toHaveAttribute('href', '#/home');
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
