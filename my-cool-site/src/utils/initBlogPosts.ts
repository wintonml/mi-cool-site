// This file initializes the blog posts in the browser
import { initializeBlogPosts, BlogPost, getAllPosts } from './markdownUtils';

declare global {
  interface Window {
    __BLOG_POSTS__?: Record<string, string>;
  }
}

export function initBlogPosts() {
  // Always use the same posts data regardless of environment
  const postsToUse = window.__BLOG_POSTS__;

  console.log(`Initializing blog posts in ${process.env.NODE_ENV} mode`);
  console.log('Available posts:', Object.keys(postsToUse || {}));

  initializeBlogPosts(postsToUse || {});

  // Log the posts after initialization for debugging
  console.log('After initialization - getAllPosts() result:', getAllPosts());
}

// Initialize immediately when this module is imported
initBlogPosts();

export type { BlogPost };
