import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';

describe('BlogPost Component', () => {
  const mockPost = {
    title: 'Test Blog Post',
    content: 'This is a test blog post content.',
    date: '2024-04-06',
    author: 'Test Author',
    tags: ['test', 'blog', 'react'],
  };

  it('renders blog post with all required props', () => {
    render(<BlogPost {...mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${mockPost.author}`)).toBeInTheDocument();

    mockPost.tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });

  it('renders blog post without tags when tags prop is not provided', () => {
    const postWithoutTags = { ...mockPost };
    delete postWithoutTags.tags;

    render(<BlogPost {...postWithoutTags} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${mockPost.author}`)).toBeInTheDocument();
  });
});
