import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPost from './BlogPost';
import { BlogPostProps } from './BlogPost.types';

describe('BlogPost Component', () => {
  const tagValues: string[] = ['test', 'blog', 'react'];
  const mockPost: BlogPostProps = {
    title: 'Test Blog Post',
    content: 'This is a test blog post content.',
    date: '2024-04-06',
    author: 'Test Author',
    tags: tagValues,
  };

  it('renders blog post with all required props', () => {
    render(<BlogPost {...mockPost} />);

    // Verify required content is present
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${mockPost.author}`)).toBeInTheDocument();
    
    // Verify tags are present
    tagValues.forEach(element => {
      expect(screen.getByText(`#${element}`)).toBeInTheDocument();
    });
  });

  it('renders blog post without tags when tags prop is not provided', () => {
    const { tags, ...postWithoutTags } = mockPost;
    render(<BlogPost {...postWithoutTags} />);

    // Verify required content is present
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${mockPost.author}`)).toBeInTheDocument();
    
    // Verify no tags are visible
    tagValues.forEach(tag => {
      expect(screen.queryByText(`#${tag}`)).not.toBeInTheDocument();
    });
  });
});
