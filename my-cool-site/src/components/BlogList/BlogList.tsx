import React, { useMemo } from 'react';
//import PropTypes from 'prop-types';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.css';
import { BlogListProps } from './BlogList.types';

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  // Process posts to ensure they have the correct format
  const processedPosts = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      date: formatDate(post.date),
      // Ensure tags is always an array
      tags: Array.isArray(post.tags) ? post.tags : [],
    }));
  }, [posts]);

  if (posts.length === 0) {
    return <div className="no-posts">No blog posts found.</div>;
  }

  return (
    <div className="blog-list">
      {processedPosts.map((post, index) => (
        <BlogPost
          key={post.slug || index}
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

// BlogList.propTypes = {
//   posts: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       content: PropTypes.string.isRequired,
//       date: PropTypes.string.isRequired,
//       author: PropTypes.string.isRequired,
//       tags: PropTypes.arrayOf(PropTypes.string),
//       slug: PropTypes.string,
//     })
//   ).isRequired,
// };

export default BlogList;
