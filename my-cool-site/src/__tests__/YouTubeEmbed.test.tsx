import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YouTubeEmbed from '../components/YouTubeEmbed/YouTubeEmbed';

describe('YouTubeEmbed', () => {
  const mockProps = {
    videoId: 'dQw4w9WgXcQ',
    title: 'Test Video',
    datePublished: '18-05-2026',
    description: 'This is a test video description',
  };

  it('renders the iframe with correct video ID', () => {
    render(<YouTubeEmbed {...mockProps} />);
    const iframe = screen.getByTitle(mockProps.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockProps.videoId}`);
  });

  it('displays the correct title', () => {
    render(<YouTubeEmbed {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
  });

  it('displays the correct date published', () => {
    render(<YouTubeEmbed {...mockProps} />);
    expect(screen.getByText(`Date Published: ${mockProps.datePublished}`)).toBeInTheDocument();
  });

  it('displays the description when provided', () => {
    render(<YouTubeEmbed {...mockProps} />);
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('does not display description when not provided', () => {
    const { description, ...propsWithoutDescription } = mockProps;
    render(<YouTubeEmbed {...propsWithoutDescription} />);
    expect(screen.queryByText(description as string)).not.toBeInTheDocument();
  });

  it('does not render video metadata when displayVideoOnly is true', () => {
    render(<YouTubeEmbed {...mockProps} displayVideoOnly />);
    expect(screen.queryByText(mockProps.title)).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Date Published: ${mockProps.datePublished}`)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();
  });

  it('renders video metadata when displayVideoOnly is false', () => {
    render(<YouTubeEmbed {...mockProps} displayVideoOnly={false} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(`Date Published: ${mockProps.datePublished}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('has the correct accessibility attributes', () => {
    render(<YouTubeEmbed {...mockProps} />);
    const iframe = screen.getByTitle(mockProps.title);
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('accelerometer'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('autoplay'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('encrypted-media'));
    expect(iframe).toHaveAttribute('allowFullScreen');
  });
});
