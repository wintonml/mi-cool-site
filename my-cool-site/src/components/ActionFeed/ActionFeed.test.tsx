import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ActionFeed from './ActionFeed';
import { FeedItem } from './ActionFeed.types';

// Mock the feedUtils
jest.mock('../../utils/feedUtils', () => ({
  getAllFeedItems: jest.fn(),
}));

const { getAllFeedItems } = require('../../utils/feedUtils');

describe('ActionFeed Component', () => {
  const mockFeedItems: FeedItem[] = [
    {
      id: 'blog-1',
      title: 'Test Blog Post',
      date: '2024-01-20',
      type: 'blog',
      link: '/blog#test-blog-post',
    },
    {
      id: 'video-1',
      title: 'Test Video',
      date: '2024-01-15',
      type: 'video',
      link: '/videos',
    },
    {
      id: 'project-1',
      title: 'Test Project',
      date: '2024-01-10',
      type: 'project',
      link: '/projects',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  it('renders latest activity title', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    expect(screen.getByText('Latest Activity')).toBeInTheDocument();
  });

  it('renders feed items when data is available', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    // Check that all feed items are rendered
    mockFeedItems.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(new Date(item.date).toLocaleDateString())).toBeInTheDocument();
      expect(screen.getByText(item.type)).toBeInTheDocument();
    });
  });

  it('sorts items by date (newest first)', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    const items = screen.getAllByRole('link');
    
    // First item should be the newest (2024-01-20)
    expect(items[0]).toHaveTextContent('Test Blog Post');
    expect(items[0]).toHaveTextContent(new Date('2024-01-20').toLocaleDateString());
    
    // Last item should be the oldest (2024-01-10)
    expect(items[2]).toHaveTextContent('Test Project');
    expect(items[2]).toHaveTextContent(new Date('2024-01-10').toLocaleDateString());
  });

  it('respects maxItems prop', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed maxItems={2} />);
    
    // Should only render 2 items
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders no content message when no items available', () => {
    getAllFeedItems.mockReturnValue([]);
    renderWithRouter(<ActionFeed />);
    
    expect(screen.getByText('No content available')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders correct links for each item type', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    const links = screen.getAllByRole('link');
    
    expect(links[0]).toHaveAttribute('href', '/blog#test-blog-post');
    expect(links[1]).toHaveAttribute('href', '/videos');
    expect(links[2]).toHaveAttribute('href', '/projects');
  });

  it('calls getAllFeedItems on render', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    expect(getAllFeedItems).toHaveBeenCalledTimes(1);
  });

  it('renders without maxItems prop (shows all items)', () => {
    getAllFeedItems.mockReturnValue(mockFeedItems);
    renderWithRouter(<ActionFeed />);
    
    // Should render all items when no maxItems specified
    expect(screen.getAllByRole('link')).toHaveLength(mockFeedItems.length);
  });
});
