import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  const renderFooter = () =>
    render(
      <HashRouter>
        <Footer />
      </HashRouter>
    );

  it('renders the footer and its social links', () => {
    renderFooter();

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('aria-hidden', 'false');

    expect(screen.getByText('Find me on:')).toBeInTheDocument();

    expect(screen.getByLabelText('GitHub profile (opens in new tab)')).toHaveAttribute(
      'href',
      'https://github.com/wintonml'
    );
    expect(screen.getByLabelText('LinkedIn profile (opens in new tab)')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/wintonml/'
    );
  });
});
