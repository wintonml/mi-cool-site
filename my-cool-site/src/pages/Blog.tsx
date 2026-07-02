import React from 'react';
import BlogPost from '../components/BlogPost/BlogPost';
import { BlogProps } from './interfaces/Blog.types';

const Blog: React.FC<BlogProps> = ({ posts }) => {
  return (
    <div className="blog-page">
      <h1>Blog</h1>
      {posts.length > 0 ? (
        <div className="all-posts">
          {posts.map((post) => (
            <BlogPost
              key={post.slug}
              title={post.title}
              content={post.content}
              date={post.date}
              author={post.author}
              tags={post.tags}
            />
          ))}
        </div>
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default Blog;
