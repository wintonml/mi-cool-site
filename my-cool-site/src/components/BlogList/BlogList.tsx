import React from 'react';
import PropTypes from 'prop-types';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.css';
import { BlogListProps } from './BlogList.types';

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="blog-list" role="list">
      {posts.map((post, index) => (
        <BlogPost
          key={index}
          title={post.title}
          content={post.content}
          date={post.date}
          author={post.author}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default BlogList;
