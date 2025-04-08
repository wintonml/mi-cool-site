import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogList from './BlogList';
import { BlogListProps } from './BlogList.types';

describe('BlogList Component', () => {
  const createMockPost = (id: string): BlogListProps['posts'][number] => ({
    title: `Post ${id}`,
    content: `Content of post ${id}`,
    date: `Date ${id}`,
    author: `Author ${id}`,
    tags: [`react ${id}`, `test ${id}`],
  });

  it('renders the blog list container with correct role', () => {
    const posts = [createMockPost('1')];
    render(<BlogList posts={posts} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders a single blog post correctly', () => {
    const post = createMockPost('1');
    render(<BlogList posts={[post]} />);

    expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
    expect(screen.getByText(post.content)).toBeInTheDocument();
    expect(screen.getByText(post.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${post.author}`)).toBeInTheDocument();
    post.tags?.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });

  it('renders multiple blog posts correctly', () => {
    const posts = [createMockPost('1'), createMockPost('2')];
    render(<BlogList posts={posts} />);

    posts.forEach((post) => {
      expect(screen.getByRole('heading', { name: post.title })).toBeInTheDocument();
      expect(screen.getByText(post.content)).toBeInTheDocument();
      expect(screen.getByText(post.date)).toBeInTheDocument();
      expect(screen.getByText(`By ${post.author}`)).toBeInTheDocument();
      post.tags?.forEach((tag) => {
        expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
      });
    });
  });

  it('renders post without tags correctly', () => {
    const postWithoutTags = {
      id: '1',
      title: 'Post without tags',
      content: 'Content',
      date: '2024-04-06',
      author: 'Author',
    };
    render(<BlogList posts={[postWithoutTags]} />);

    expect(screen.getByRole('heading', { name: postWithoutTags.title })).toBeInTheDocument();
    expect(screen.getByText(postWithoutTags.content)).toBeInTheDocument();
    expect(screen.getByText(postWithoutTags.date)).toBeInTheDocument();
    expect(screen.getByText(`By ${postWithoutTags.author}`)).toBeInTheDocument();
  });

  it('renders empty list when no posts are provided', () => {
    render(<BlogList posts={[]} />);
    const blogList = screen.getByRole('list');
    expect(blogList).toBeEmptyDOMElement();
  });
});
