import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const mockLinks = ['Home', 'About', 'Projects', 'Contact'];
  const mockProps = {
    header: 'Mi-cool',
    navBar: 'Your Logo',
    links: mockLinks,
  };

  it('renders the header and navigation links', () => {
    render(<NavBar {...mockProps} />);

    // Check header content
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();

    // Check navigation links
    mockLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders the logo', () => {
    render(<NavBar {...mockProps} />);
    expect(screen.getByText(mockProps.navBar)).toBeInTheDocument();
  });

  it('has correct href attributes for links', () => {
    render(<NavBar {...mockProps} />);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByText(link);
      expect(linkElement.closest('a')).toHaveAttribute('href', `/${link.toLowerCase()}`);
    });
  });

  it('handles empty links array', () => {
    render(<NavBar {...mockProps} links={[]} />);
    expect(screen.getByText(mockProps.header)).toBeInTheDocument();
    expect(screen.getByText(mockProps.navBar)).toBeInTheDocument();
  });
});
