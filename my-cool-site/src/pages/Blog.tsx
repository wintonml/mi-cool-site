import React, { useEffect, useState } from 'react';
import BlogList from '../components/BlogList/BlogList';

// Define the blog post type
type BlogPost = {
  title: string;
  content: string;
  date: string;
  author: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
};

// Extend window to include our blog posts
declare global {
  interface Window {
    __BLOG_POSTS__?: Record<string, string>;
  }
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = () => {
      try {
        // Check if the posts are already loaded
        if (window.__BLOG_POSTS__) {
          processPosts(window.__BLOG_POSTS__);
        } else {
          // If not, set up a small delay and try again
          const checkInterval = setInterval(() => {
            if (window.__BLOG_POSTS__) {
              clearInterval(checkInterval);
              processPosts(window.__BLOG_POSTS__);
            }
          }, 100);

          // Timeout after 3 seconds
          setTimeout(() => {
            clearInterval(checkInterval);
            if (!window.__BLOG_POSTS__) {
              throw new Error('Timed out waiting for blog posts to load');
            }
          }, 3000);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    const processPosts = (blogPosts: Record<string, string>) => {
      try {
        // Convert the posts to the format expected by BlogList
        const parsedPosts = Object.entries(blogPosts)
          .map(([filename, content]) => {
            // Extract frontmatter and content
            const contentMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
            if (!contentMatch) {
              console.warn(`Could not parse frontmatter for ${filename}`);
              return null;
            }

            const [, frontmatterStr, markdownContent] = contentMatch;
            const frontmatter = frontmatterStr.split('\n').reduce(
              (acc, line) => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                  const value = valueParts
                    .join(':')
                    .trim()
                    .replace(/^['"](.*)['"]$/, '$1');
                  acc[key.trim()] = value;
                }
                return acc;
              },
              {} as Record<string, string>
            );

            return {
              slug: filename.replace(/\.md$/, ''),
              title: frontmatter.title || 'Untitled',
              content: markdownContent.trim(),
              date: frontmatter.date || new Date().toISOString(),
              author: frontmatter.author || 'Unknown Author',
              excerpt: frontmatter.excerpt || markdownContent.slice(0, 200) + '...',
              tags: frontmatter.tags ? JSON.parse(frontmatter.tags.replace(/'/g, '"')) : [],
            };
          })
          .filter(Boolean) as BlogPost[];

        setPosts(parsedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error processing blog posts:', err);
        setError('Failed to process blog posts.');
        setLoading(false);
      }
    };

    // Load the posts
    loadPosts();
  }, []);

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="blog-page">
      <h1>Blog</h1>
      {posts.length > 0 ? <BlogList posts={posts} /> : <p>No blog posts found.</p>}
    </div>
  );
};

export default Blog;
