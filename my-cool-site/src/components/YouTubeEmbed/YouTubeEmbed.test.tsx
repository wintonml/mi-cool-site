import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YouTubeEmbed from './YouTubeEmbed';

describe('YouTubeEmbed', () => {
  const mockProps = {
    videoId: 'dQw4w9WgXcQ',
    title: 'Test Video',
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

  it('displays the description when provided', () => {
    render(<YouTubeEmbed {...mockProps} />);
    expect(screen.getByText(mockProps.description!)).toBeInTheDocument();
  });

  it('does not display description when not provided', () => {
    const { description, ...propsWithoutDescription } = mockProps;
    render(<YouTubeEmbed {...propsWithoutDescription} />);
    expect(screen.queryByText(mockProps.description!)).not.toBeInTheDocument();
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
