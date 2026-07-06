import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import YouTubeVideo from '../components/YouTubeVideo/YouTubeVideo';

describe('YouTubeVideo', () => {
  const mockProps = {
    videoId: 'dQw4w9WgXcQ',
    title: 'Test Video',
  };

  it('renders the iframe with the provided title', () => {
    render(<YouTubeVideo {...mockProps} />);
    const iframe = screen.getByTitle(mockProps.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('title', mockProps.title);
  });
  it('renders the iframe with correct video ID', () => {
    render(<YouTubeVideo {...mockProps} />);
    const iframe = screen.getByTitle(mockProps.title);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockProps.videoId}`);
  });
  it('has the correct accessibility attributes', () => {
    render(<YouTubeVideo {...mockProps} />);
    const iframe = screen.getByTitle(mockProps.title);
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('accelerometer'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('autoplay'));
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('encrypted-media'));
    expect(iframe).toHaveAttribute('allowFullScreen');
  });
});
