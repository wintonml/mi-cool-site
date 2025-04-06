import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogList from './BlogList';

describe('BlogList Component', () => {
  const mockPosts = [
    {
      title: 'First Post',
      content: 'Content of first post',
      date: '2024-04-06',
      author: 'Author One',
      tags: ['react', 'test'],
    },
    {
      title: 'Second Post',
      content: 'Content of second post',
      date: '2024-04-07',
      author: 'Author Two',
      tags: ['javascript', 'web'],
    },
  ];

  it('renders multiple blog posts', () => {
    render(<BlogList posts={mockPosts} />);

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.content)).toBeInTheDocument();
      expect(screen.getByText(post.date)).toBeInTheDocument();
      expect(screen.getByText(`By ${post.author}`)).toBeInTheDocument();

      post.tags.forEach((tag) => {
        expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
      });
    });
  });

  it('renders empty list when no posts are provided', () => {
    render(<BlogList posts={[]} />);
    const blogList = screen.getByRole('list');
    expect(blogList.children.length).toBe(0);
  });
});
