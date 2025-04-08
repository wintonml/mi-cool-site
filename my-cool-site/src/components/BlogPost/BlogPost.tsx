import React from 'react';
import PropTypes from 'prop-types';
import './BlogPost.css';

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
  author: string;
  tags?: string[];
}

const BlogPost = ({ title, content, date, author, tags }: BlogPostProps) => {
  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h2 className="blog-post-title">{title}</h2>
        <div className="blog-post-meta">
          <span className="blog-post-date">{date}</span>
          <span className="blog-post-author">By {author}</span>
        </div>
      </header>
      <div className="blog-post-content">{content}</div>
      {tags && tags.length > 0 && (
        <div className="blog-post-tags">
          {tags.map((tag, index) => (
            <span key={index} className="blog-post-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default BlogPost;
