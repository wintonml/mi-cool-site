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

  it('shows current page name in logo area when on a specific route', () => {
    renderWithRouter(<NavBar {...mockProps} />, ['/about']);

    // The component should show "About" in the logo area
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('handles empty links array', () => {
    renderWithRouter(<NavBar {...mockProps} links={[]} />);
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();
  });

  it('filters out current page from navigation links', () => {
    renderWithRouter(<NavBar {...mockProps} />, ['/about', '/home']);

    // Should not show "About" in the navigation links since it's the current page. There is is only one "About" in the navigation links.
    const aboutLinks = screen.queryAllByText('About');
    expect(aboutLinks).toHaveLength(1);
  });

  it('shows other navigation links when not on their page', () => {
    renderWithRouter(<NavBar {...mockProps} />, ['/about']);

    // Should show other links like "Home", "Projects", "Contact"
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});
